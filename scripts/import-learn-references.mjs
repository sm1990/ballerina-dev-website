import fs from 'node:fs';
import path from 'node:path';

const sourceSpecPage = '/Users/sarani/Downloads/codebase/ballerina-dev-website/spec/spec.md';
const sourcePublicSpecDir = '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/spec';
const targetLearnDocsDir = path.resolve('learn-tools-docs');
const targetSpecStaticDir = path.resolve('static/spec');

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return {data: {}, content: fileContent};
  }

  const [, rawFrontmatter, content] = match;
  const data = {};
  let activeArrayKey = null;

  for (const rawLine of rawFrontmatter.split('\n')) {
    const line = rawLine.trimEnd();
    const arrayItemMatch = line.match(/^\s*-\s+(.*)$/);

    if (activeArrayKey && arrayItemMatch) {
      data[activeArrayKey].push(arrayItemMatch[1].trim());
      continue;
    }

    activeArrayKey = null;

    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (!value) {
      data[key] = [];
      activeArrayKey = key;
      continue;
    }

    value = value.replace(/^['"]/, '').replace(/['"]$/, '');
    data[key] = value;
  }

  return {data, content};
}

function normalizeKeywords(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function yamlArray(name, values) {
  if (values.length === 0) {
    return '';
  }

  return `${name}:\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}\n`;
}

function buildFrontmatter({title, description, slug, keywords}) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description || '')}\nslug: ${JSON.stringify(
    slug,
  )}\n${yamlArray('keywords', keywords)}---\n`;
}

function copyDirectory(sourceDir, targetDir) {
  fs.rmSync(targetDir, {recursive: true, force: true});
  fs.mkdirSync(path.dirname(targetDir), {recursive: true});
  fs.cpSync(sourceDir, targetDir, {recursive: true});
}

const raw = fs.readFileSync(sourceSpecPage, 'utf8');
const {data, content} = parseFrontmatter(raw);

const frontmatter = buildFrontmatter({
  title: data.title || 'Ballerina specifications',
  description: data.description || data.intro || '',
  slug: '/references/ballerina-specifications',
  keywords: normalizeKeywords(data.keywords),
});

const docBody = `${frontmatter}\n${content.trim()}\n`;

fs.mkdirSync(targetLearnDocsDir, {recursive: true});
const targetDocPath = path.join(targetLearnDocsDir, 'references/ballerina-specifications.md');
fs.mkdirSync(path.dirname(targetDocPath), {recursive: true});
fs.rmSync(path.join(targetLearnDocsDir, 'ballerina-specifications.md'), {force: true});
fs.rmSync(path.join(targetLearnDocsDir, 'ballerina-specifications.mdx'), {force: true});
fs.writeFileSync(targetDocPath, docBody);
fs.rmSync(targetDocPath.replace(/\.md$/, '.mdx'), {force: true});
copyDirectory(sourcePublicSpecDir, targetSpecStaticDir);

console.log(
  `Imported ${path.basename(sourceSpecPage)} -> ${path.relative(
    process.cwd(),
    targetDocPath,
  )}`,
);
console.log(`Copied spec assets -> ${path.relative(process.cwd(), targetSpecStaticDir)}`);
