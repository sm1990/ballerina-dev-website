import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = '/Users/sarani/Downloads/codebase/ballerina-dev-website';
const pagesDir = path.join(sourceRoot, 'pages');
const nextConfigPath = path.join(sourceRoot, 'next.config.js');
const rearrangePath = path.join(sourceRoot, 'utils', 'rearrangeFiles.sh');

const outputDir = path.resolve('migration-data');
const outputJsonPath = path.join(outputDir, 'route-inventory.json');
const outputMdPath = path.join(outputDir, 'route-inventory.md');

function walk(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function normalizeRoute(route) {
  if (route === '') {
    return '/';
  }

  return route.endsWith('/') ? route : `${route}/`;
}

function pageFileToRoute(filePath) {
  const rel = path.relative(pagesDir, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.js$/, '');
  const withoutIndex =
    withoutExt === 'index' ? '' : withoutExt.replace(/\/index$/, '');
  const transformed = withoutIndex
    .replace(/\[\.\.\.(.+?)\]/g, ':$1*')
    .replace(/\[(.+?)\]/g, ':$1');

  return normalizeRoute(`/${transformed}`.replace(/\/+/g, '/'));
}

function extractRewritePairs(source) {
  const pairs = [];
  const objectRegex =
    /\{\s*source:\s*([`'"])(.*?)\1,\s*destination:\s*([`'"])(.*?)\3,\s*\}/gs;
  let match;

  while ((match = objectRegex.exec(source)) !== null) {
    pairs.push({
      source: match[2],
      destination: match[4],
    });
  }

  return pairs;
}

function extractCopyRules(source) {
  const rules = [];
  const lineRegex = /^cp -r\s+(\.\/out\/[^\s]+)\s+(\.\/out\/[^\s]+)$/gm;
  let match;

  while ((match = lineRegex.exec(source)) !== null) {
    rules.push({
      source: match[1],
      destination: match[2],
    });
  }

  return rules;
}

function toBulletList(items, formatter) {
  return items.map((item) => `- ${formatter(item)}`).join('\n');
}

const pageFiles = walk(pagesDir)
  .filter((filePath) => filePath.endsWith('.js'))
  .filter((filePath) => !filePath.endsWith('/_app.js'))
  .filter((filePath) => !filePath.endsWith('/_document.js'));

const pageRoutes = pageFiles.map((filePath) => ({
  file: path.relative(sourceRoot, filePath).replace(/\\/g, '/'),
  route: pageFileToRoute(filePath),
}));

const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
const rewritePairs = extractRewritePairs(nextConfig);

const rearrangeScript = fs.readFileSync(rearrangePath, 'utf8');
const copyRules = extractCopyRules(rearrangeScript);

const inventory = {
  generatedAt: new Date().toISOString(),
  sourceRoot,
  counts: {
    pages: pageRoutes.length,
    rewrites: rewritePairs.length,
    postBuildCopyRules: copyRules.length,
  },
  pageRoutes,
  rewrites: rewritePairs,
  postBuildCopyRules: copyRules,
};

const markdown = `# Route Inventory

Generated from:

- \`${nextConfigPath}\`
- \`${rearrangePath}\`
- \`${pagesDir}\`

## Counts

- Pages: ${inventory.counts.pages}
- Rewrites: ${inventory.counts.rewrites}
- Post-build copy rules: ${inventory.counts.postBuildCopyRules}

## Page routes

${toBulletList(pageRoutes, (item) => `\`${item.route}\` <- \`${item.file}\``)}

## Rewrites

${toBulletList(rewritePairs, (item) => `\`${item.source}\` -> \`${item.destination}\``)}

## Post-build copy rules

${toBulletList(copyRules, (item) => `\`${item.source}\` -> \`${item.destination}\``)}
`;

fs.mkdirSync(outputDir, {recursive: true});
fs.writeFileSync(outputJsonPath, JSON.stringify(inventory, null, 2));
fs.writeFileSync(outputMdPath, markdown);

console.log(`Wrote ${outputJsonPath}`);
console.log(`Wrote ${outputMdPath}`);
