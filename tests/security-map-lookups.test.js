'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');
const scriptPath = path.join(projectRoot, 'script.js');

function jsonResponse(data, options) {
    options = options || {};

    return {
        ok: true,
        status: 200,
        headers: {
            get: function (name) {
                return String(name).toLowerCase() === 'content-type'
                    ? options.contentType === undefined
                        ? 'application/json; charset=utf-8'
                        : options.contentType
                    : null;
            },
        },
        json: async function () {
            return data;
        },
    };
}

function createMockButton() {
    var clickHandler;

    return {
        addEventListener: function (eventName, handler) {
            if (eventName === 'click') {
                clickHandler = handler;
            }
        },
        click: function () {
            assert.strictEqual(typeof clickHandler, 'function', 'Email button must register a click handler');
            clickHandler({ type: 'click', currentTarget: this });
        },
    };
}

function loadScript(fetchImpl, options) {
    options = options || {};

    const source = fs.readFileSync(scriptPath, 'utf8');
    const script = source.replace(
        /\n\}\)\(\);\s*$/,
        '\nglobalThis.__testApi = { getLanguageColor, normalizeGitHubRepo, normalizeOpenVsxExtension, fetchJson, fetchOpenVsxExtensions, initEmailContact };\n})();'
    );

    assert.notStrictEqual(script, source, 'Unable to expose script internals for tests');

    const sandbox = {
        console: {
            log: function () {},
            warn: function () {},
            error: function () {},
        },
        fetch: fetchImpl,
        requestAnimationFrame: function () {
            return 1;
        },
        setTimeout: function () {},
        document: {
            readyState: 'loading',
            addEventListener: function () {},
            getElementById: function (id) {
                if (id === 'contact-email') {
                    return options.emailButton || null;
                }

                return null;
            },
            querySelector: function () {
                return null;
            },
            querySelectorAll: function () {
                return [];
            },
        },
        window: {
            addEventListener: function () {},
            innerWidth: 1024,
            innerHeight: 768,
            location: options.location || { href: '' },
            localStorage: {
                getItem: function () {
                    return null;
                },
                setItem: function () {},
            },
        },
    };

    vm.runInNewContext(script, sandbox, { filename: scriptPath });
    return sandbox.__testApi;
}

async function assertFetchJsonRejectsNonJson(contentType) {
    var jsonWasCalled = false;
    var api = loadScript(async function () {
        return {
            ok: true,
            status: 200,
            headers: {
                get: function (name) {
                    return String(name).toLowerCase() === 'content-type' ? contentType : null;
                },
            },
            json: async function () {
                jsonWasCalled = true;
                return {};
            },
        };
    });

    await assert.rejects(
        api.fetchJson('https://example.test/non-json'),
        function (err) {
            return /json|content-type/i.test(String(err && err.message));
        },
        'fetchJson must reject a response without a JSON content type'
    );
    assert.strictEqual(jsonWasCalled, false, 'fetchJson must not parse a non-JSON response');
}

async function testFetchJsonContentTypes() {
    var payload = { result: 'valid-json' };
    var api = loadScript(async function () {
        return jsonResponse(payload);
    });

    assert.strictEqual(
        await api.fetchJson('https://example.test/valid-json'),
        payload,
        'fetchJson must parse responses whose Content-Type is JSON'
    );

    await assertFetchJsonRejectsNonJson('text/html; charset=utf-8');
    await assertFetchJsonRejectsNonJson('');
}

function testEmailContactActivation() {
    var emailButton = createMockButton();
    var location = { href: '' };
    var api = loadScript(
        async function () {
            return jsonResponse({});
        },
        { emailButton: emailButton, location: location }
    );

    api.initEmailContact();
    assert.strictEqual(location.href, '', 'Email destination must not be set before activation');

    emailButton.click();

    var localPart = ['adm', 'in'].join('');
    var domain = ['ai', 'bersemi', '.my', '.id'].join('');
    var mailtoPrefix = ['mail', 'to:'].join('');
    assert.strictEqual(location.href, mailtoPrefix + localPart + '@' + domain);
}

async function main() {
    await testFetchJsonContentTypes();
    testEmailContactActivation();

    const requestedUrls = [];
    const api = loadScript(async function (url) {
        requestedUrls.push(url);

        if (url === 'https://open-vsx.org/api/aibersemi') {
            const extensions = Object.create({
                inherited: 'https://example.test/inherited-extension',
            });
            extensions.good = 'https://example.test/good-extension';
            extensions.constructor = 'https://example.test/constructor-extension';
            extensions.invalid = { url: 'https://example.test/not-a-string' };

            return jsonResponse({ extensions });
        }

        return jsonResponse({
            name: url.endsWith('/constructor-extension') ? 'constructor' : 'good-extension',
            displayName: 'Fetched Extension',
            description: 'Fetched extension description',
            namespace: 'aibersemi',
            version: '1.0.0',
            timestamp: '2026-01-01T00:00:00.000Z',
        });
    });

    assert.strictEqual(api.getLanguageColor('JavaScript'), '#f1e05a');
    assert.strictEqual(api.getLanguageColor('constructor'), '#64748b');
    assert.strictEqual(api.getLanguageColor('__proto__'), '#64748b');

    const unsafeRepo = api.normalizeGitHubRepo({
        name: 'constructor',
        description: 'Repository controlled description',
        language: 'constructor',
        html_url: 'https://example.test/repo',
    });

    assert.strictEqual(unsafeRepo.name, 'constructor');
    assert.strictEqual(unsafeRepo.description, 'Repository controlled description');
    assert.strictEqual(unsafeRepo.languageColor, '#64748b');

    const overrideRepo = api.normalizeGitHubRepo({
        name: 'aibersemi.my.id',
        description: 'Original description',
        language: 'HTML',
        html_url: 'https://example.test/aibersemi.my.id',
    });

    assert.strictEqual(overrideRepo.name, 'AiBersemi Portfolio Website');
    assert.strictEqual(overrideRepo.languageColor, '#e34c26');

    const unsafeExtension = api.normalizeOpenVsxExtension({
        name: 'constructor',
        displayName: 'Extension controlled name',
        description: 'Extension controlled description',
        namespace: 'aibersemi',
        version: '1.0.0',
    });

    assert.strictEqual(unsafeExtension.name, 'Extension controlled name');
    assert.strictEqual(unsafeExtension.description, 'Extension controlled description');

    const overrideExtension = api.normalizeOpenVsxExtension({
        name: 'open-quota-antigravity',
        displayName: 'Original extension name',
        description: 'Original extension description',
        namespace: 'aibersemi',
        version: '1.1.5',
    });

    assert.strictEqual(overrideExtension.name, 'Quota Monitoring Extension');

    await api.fetchOpenVsxExtensions();

    assert.deepStrictEqual(requestedUrls, [
        'https://open-vsx.org/api/aibersemi',
        'https://example.test/good-extension',
        'https://example.test/constructor-extension',
    ]);
}

main()
    .then(function () {
        console.log('security-map-lookups: ok');
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
