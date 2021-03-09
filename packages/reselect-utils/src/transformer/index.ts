const path = require('path');

console.log([path.join(__dirname, './example/index.ts')]);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compile } = require('./compile');
// eslint-disable-next-line @typescript-eslint/no-var-requires

compile([path.join(__dirname, './example/index.ts')]);
