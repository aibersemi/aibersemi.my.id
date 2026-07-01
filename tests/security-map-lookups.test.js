'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');
const scriptPath = path.join(projectRoot, 'script.js');

function jsonResponse(data) {
    return {
        ok: true,
        status: 200,
        json: async function () {
            return data;
        },
    };
}

function loadScript(fetchImpl) {
    const source = fs.readFileSync(scriptPath, 'utf8');
    const script = source.replace(
        /\n\}\)\(\);\s*$/,
        '\nglobalThis.__testApi = { getLanguageColor, normalizeGitHubRepo, normalizeOpenVsxExtension, fetchOpenVsxExtensions };\n})();'
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
            getElementById: function () {
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

async function main() {
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
