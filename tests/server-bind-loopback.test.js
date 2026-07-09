'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const serverPath = path.resolve(__dirname, '..', 'server.sh');
const source = fs.readFileSync(serverPath, 'utf8');

assert.match(
    source,
    /python3\s+-m\s+http\.server\s+--bind\s+127\.0\.0\.1\s+"\$PORT"/,
    'The local development server must bind to loopback explicitly.'
);

console.log('server-bind-loopback: ok');
