'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const htaccess = fs.readFileSync(path.join(projectRoot, '.htaccess'), 'utf8');
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const scriptSource = fs.readFileSync(path.join(projectRoot, 'script.js'), 'utf8');

function getCspHeader() {
    const matches = [
        ...htaccess.matchAll(
            /^\s*Header\s+(?:always\s+)?set\s+Content-Security-Policy\s+"([^"]+)"\s*$/gim
        ),
    ];

    assert.strictEqual(matches.length, 1, 'Expected exactly one Content-Security-Policy header in .htaccess');
    return matches[0][1];
}

function getDirectiveSources(policy, directiveName) {
    const escapedName = directiveName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = policy.match(new RegExp('(?:^|;)\\s*' + escapedName + '\\s+([^;]+)', 'i'));

    assert.ok(match, 'Missing ' + directiveName + ' directive');
    return match[1].trim().split(/\s+/);
}

function assertSource(policy, directiveName, expectedSource) {
    const sources = getDirectiveSources(policy, directiveName);
    assert.ok(
        sources.includes(expectedSource),
        directiveName + ' must include ' + expectedSource + '; found: ' + sources.join(' ')
    );
}

function hasCspMetaTag(html) {
    const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
    return metaTags.some(function (tag) {
        return /\bhttp-equiv\s*=\s*(?:"content-security-policy"|'content-security-policy'|content-security-policy(?=\s|\/?>))/i.test(
            tag
        );
    });
}

function main() {
    const policy = getCspHeader();

    assertSource(policy, 'default-src', "'self'");
    assertSource(policy, 'script-src', "'self'");
    assertSource(policy, 'style-src', 'https://fonts.googleapis.com');
    assertSource(policy, 'font-src', 'https://fonts.gstatic.com');
    assertSource(policy, 'img-src', 'https://avatars.githubusercontent.com');
    assertSource(policy, 'connect-src', 'https://api.github.com');
    assertSource(policy, 'connect-src', 'https://open-vsx.org');
    assert.ok(!/'unsafe-(?:inline|eval)'/i.test(policy), 'CSP must not allow unsafe inline code or eval');

    assert.ok(!hasCspMetaTag(indexHtml), 'index.html must not add a duplicate meta CSP');
    assert.match(
        indexHtml,
        /<button\b(?=[^>]*\bid\s*=\s*["']contact-email["'])(?=[^>]*\btype\s*=\s*["']button["'])[^>]*>/i,
        'The email contact card must be a button'
    );
    assert.ok(indexHtml.includes('Open your email app'), 'The email contact card must keep its CTA text');

    const fullAddress = ['adm', 'in'].join('') + '@' + ['aiber', 'semi'].join('') + '.' + ['my', 'id'].join('.');
    const mailScheme = ['mail', 'to'].join('') + ':';

    assert.ok(!indexHtml.includes(fullAddress), 'index.html must not expose the full email address');
    assert.ok(!indexHtml.toLowerCase().includes(mailScheme), 'index.html must not contain a mailto link');
    assert.ok(!scriptSource.includes(fullAddress), 'script.js must compose, not store, the full email address');
    assert.match(
        scriptSource,
        /getElementById\(\s*["']contact-email["']\s*\)[\s\S]*?addEventListener\(\s*["']click["']/,
        'script.js must attach a click handler to the email button'
    );
    assert.match(scriptSource, /window\.location\.href\s*=/, 'The email handler must open the mail client on click');
}

try {
    main();
    console.log('csp-and-email: ok');
} catch (err) {
    console.error(err);
    process.exit(1);
}
