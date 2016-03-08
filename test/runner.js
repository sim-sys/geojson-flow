'use strict';

const assert = require('assert');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

function runFlow(dir) {
  const r = cp.spawnSync('flow',  ['check', '--json', dir], { cwd: __dirname });
  const result = r.stdout.toString('utf8');
  return JSON.parse(result);
}

// all good cases should typecheck
const goodResult = runFlow('./good');

assert.equal(goodResult.passed, true);

console.log('Good cases pass');

// all bad cases should not typecheck

const badResult = runFlow('./bad');
assert.equal(badResult.passed, false);

const failedFiles = {};

badResult.errors.forEach(error => {
  const operation = error.operation;

  if (operation && operation.path) {
    failedFiles[operation.path] = true;
  }
});

let failed = false;

fs.readdirSync(__dirname + '/bad')
  .filter(f => f !== '.flowconfig')
  .forEach(filePath => {
    const absolutePath = path.resolve(__dirname, 'bad', filePath);

    if (!failedFiles[absolutePath]) {
      console.log(`bad/${filePath} shouldn't typecheck`);
      failed = true;
    }
  });


if (failed) {
  process.exit(1);
}

console.log('Bad cases pass');
