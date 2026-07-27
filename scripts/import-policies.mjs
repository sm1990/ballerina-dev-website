import fs from 'node:fs';
import path from 'node:path';

const sourceDir = '/Users/sarani/Downloads/codebase/ballerina-dev-website/policy';
const targetDir = path.resolve('docs/policies');

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return {
      data: {},
      content: fileContent,
    };
  }

  const [, rawFrontmatter, content] = match;
  const data = {};

  for (const line of rawFrontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value;
  }

  return {data, content};
}

function normalizeKeywords(value) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toYamlArray(values) {
  if (values.length === 0) {
    return '';
  }

  return `keywords:\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}\n`;
}

function buildFrontmatter({title, description, keywords, slug}) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description || '')}\nslug: ${JSON.stringify(slug)}\nclassName: legal-doc\n${toYamlArray(keywords)}---\n`;
}

function fileNameToTitle(fileName) {
  return fileName
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const files = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith('.md'))
  .sort();

fs.mkdirSync(targetDir, {recursive: true});

for (const fileName of files) {
  const sourcePath = path.join(sourceDir, fileName);
  const targetPath = path.join(targetDir, fileName);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);

  const defaultSlug = `/${fileName.replace(/\.md$/, '')}`;
  const slug = (data.permalink || defaultSlug).replace(/\/$/, '') || '/';
  const title = data.title || fileNameToTitle(fileName);
  const description = data.description || data.intro || '';
  const keywords = normalizeKeywords(data.keywords);
  const intro = data.intro ? `${data.intro}\n\n` : '';

  const output = `${buildFrontmatter({title, description, keywords, slug})}\n${intro}${content.trim()}\n`;
  fs.writeFileSync(targetPath, output);
  console.log(`Imported ${fileName}`);
}
