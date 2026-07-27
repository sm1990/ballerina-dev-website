import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const sourceRepo = '/Users/sarani/Downloads/codebase/ballerina-dev-website';
const examplesDir = path.join(sourceRepo, 'examples');
const generatorDir = path.join(sourceRepo, '.github/scripts/bbe');
const convertScript = path.join(generatorDir, 'convertMarkdown.js');
const navScript = path.join(generatorDir, 'generateNav.js');

const targetRoot = path.resolve('generated/bbe');
const targetExamplesDir = path.join(targetRoot, 'examples');
const targetNavDir = path.resolve('_data');
const patchedToolsDir = path.join(generatorDir, '.codex-temp');

function ensureExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} not found: ${targetPath}`);
  }
}

function runNodeScript(scriptPath, args) {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: sourceRepo,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`Failed to execute ${path.basename(scriptPath)}`);
  }
}

function createPatchedConvertScript() {
  const source = fs.readFileSync(convertScript, 'utf8');
  const patched = source
    .replace(
      `    // metadata extract regex
    const metaReg =
      platform.indexOf("win") !== -1
        ? /description:\\s*(?<description>.+)\\r\\nkeywords:\\s*(?<keywords>.+)/
        : /description:\\s*(?<description>.+)\\nkeywords:\\s*(?<keywords>.+)/;
`,
      `    const parseMetatags = (content) => {
      const values = {};
      for (const line of content.split(/\\r?\\n/)) {
        const separator = line.indexOf(":");
        if (separator === -1) {
          continue;
        }
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim();
        values[key] = value;
      }
      return values;
    };
`,
    )
    .replace(
      `              const match = metaReg.exec(
                fs.readFileSync(fileRelPath, "utf-8").trim()
              );
              description = match.groups.description;
              keywords = match.groups.keywords;
`,
      `              const metatags = parseMetatags(
                fs.readFileSync(fileRelPath, "utf-8").trim()
              );
              description = metatags.description;
              keywords = metatags.keywords;
`,
    );

  fs.mkdirSync(patchedToolsDir, {recursive: true});
  const patchedPath = path.join(patchedToolsDir, 'convertMarkdown.patched.js');
  fs.writeFileSync(patchedPath, patched);
  return patchedPath;
}

ensureExists(examplesDir, 'Examples directory');
ensureExists(convertScript, 'BBE convert script');
ensureExists(navScript, 'BBE nav script');

fs.rmSync(targetRoot, {recursive: true, force: true});
fs.mkdirSync(targetExamplesDir, {recursive: true});
fs.mkdirSync(targetNavDir, {recursive: true});

fs.copyFileSync(
  path.join(examplesDir, 'index.json'),
  path.join(targetExamplesDir, 'all-bbes.json'),
);

try {
  const patchedConvertScript = createPatchedConvertScript();
  runNodeScript(patchedConvertScript, [examplesDir, targetExamplesDir]);
  runNodeScript(navScript, [examplesDir, targetNavDir]);
} finally {
  fs.rmSync(patchedToolsDir, {recursive: true, force: true});
}

console.log(`Generated BBE source content in ${path.relative(process.cwd(), targetRoot)}`);
console.log(
  `Generated BBE navigation in ${path.relative(
    process.cwd(),
    path.join(targetNavDir, 'ballerina-by-example-nav.yml'),
  )}`,
);
