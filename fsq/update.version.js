import * as fs from 'fs';

const envFile = './.env.production';
const equalRegex = /=/;
const versionRegex = /^([0-9]+).([0-9]+).([0-9]+)$/;
const versionKey = 'VITE_APP_VERSION=';

function getNewVer() {
  const newVer = process.argv
    .filter((l) => l.startsWith('--new-version'))
    .map((l) => {
      const matches = l.match(equalRegex) || [];
      if (matches.length < 1) {
        console.error(`Missing value for param --new-version={}`);
        process.exit(1);
      }
      const ver = l.split(equalRegex)[1];
      if (!ver.match(versionRegex)) {
        console.error(`New version '${ver}' does not match major.minor.patch format '{num}.{num}.{num}'`);
        process.exit(1);
      }
      return ver;
    });

  if (newVer === null || newVer.length < 1) {
    console.error(`Missing mandatory param --new-version={}`);
    process.exit(1);
  }

  return newVer[0];
}

function isDry() {
  return process.argv.indexOf('--dry') >= 0;
}

function readFile(file) {
  return fs.readFileSync(file, 'utf-8');
}

function saveFile(file, content) {
  fs.writeFileSync(file, content, 'utf-8');
}

function processVersion(env, newVer) {
  let newEnv = '';
  let oldVer = '';

  env
    .split(/\r?\n/)
    .filter((l) => l.length > 0)
    .forEach((line) => {
      const verIdx = line.indexOf(versionKey);
      if (verIdx >= 0) {
        oldVer = line.substring(line.indexOf('=') + 1);
        line = `${versionKey}${newVer}`;
      }
      newEnv += line + '\n';
    });

  return {
    newEnv: newEnv,
    newVer: newVer,
    oldVer: oldVer,
  };
}

function validateVersions(oldVer, newVer) {
  const parsedOld = parseVersion(oldVer);
  const parsedNew = parseVersion(newVer);

  for (let i = 0; i < 3; i++) {
    const oldSegment = parsedOld[i];
    const newSegment = parsedNew[i];

    if (newSegment > oldSegment) {
      return;
    } else if (oldSegment > newSegment) {
      const segmentName = getSegmentName(i);
      console.error(`Old ${segmentName} version is greater than new ${segmentName} version.
Old version: ${oldVer}
New version: ${newVer}`);
      process.exit(1);
    }
  }

  console.error(`New version is equal to old version.
Old version: ${oldVer}
New version: ${newVer}`);
  process.exit(1);
}

function getSegmentName(i) {
  switch (i) {
    case 0:
      return 'mayor';
    case 1:
      return 'minor';
    case 2:
      return 'patch';
    default:
      return 'unknown';
  }
}

function parseVersion(ver) {
  return ver.split('.').map((v) => {
    return parseInt(v);
  });
}

const newVer = getNewVer();

const dry = isDry();

const env = readFile(envFile);

const result = processVersion(env, newVer);

validateVersions(result.oldVer, result.newVer);

console.log(`Updating old version '${result.oldVer}' for '${result.newVer}'`);

if (dry) {
  console.log(`New 'environment.prod.ts' would look like:\n\n${result.newEnv}`);
} else {
  saveFile(envFile, result.newEnv);
}
