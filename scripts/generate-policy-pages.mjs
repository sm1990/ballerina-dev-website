import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const sourceDir = '/Users/sarani/Downloads/codebase/ballerina-dev-website/policy';
const generatedDataDir = path.resolve('src/generated/policies');
const generatedPagesDir = path.resolve('src/pages');

const toc = [];

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&[#A-Za-z0-9]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const defaultHeadingOpen =
  md.renderer.rules.heading_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
const defaultHeadingClose =
  md.renderer.rules.heading_close ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const inlineToken = tokens[idx + 1];
  const title = inlineToken?.content ?? '';
  const id = slugify(title);
  const level = Number(token.tag.replace('h', ''));

  token.attrSet('id', id);
  if (level === 2 || level === 3) {
    env.toc.push({
      id,
      value: title,
      level,
    });
  }

  return defaultHeadingOpen(tokens, idx, options, env, self);
};

md.renderer.rules.heading_close = (tokens, idx, options, env, self) =>
  defaultHeadingClose(tokens, idx, options, env, self);

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

function fileNameToTitle(fileName) {
  return fileName
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugToPagePath(slug) {
  const normalized = slug.replace(/^\/+/, '').replace(/\/+$/, '');
  return normalized === '' ? 'index' : normalized;
}

function cleanupMarkdown(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/div><\/td>/g, '</td>')
    .trim();
}

function pageModule(relativeJsonPath) {
  return `import React from 'react';
import PolicyPage from '@site/src/components/PolicyPage';
import data from '${relativeJsonPath}';

export default function GeneratedPolicyPage() {
  return <PolicyPage data={data} />;
}
`;
}

const files = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith('.md'))
  .sort();

fs.mkdirSync(generatedDataDir, {recursive: true});
fs.mkdirSync(generatedPagesDir, {recursive: true});

for (const fileName of files) {
  const sourcePath = path.join(sourceDir, fileName);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const slug = ((data.permalink || `/${fileName.replace(/\.md$/, '')}`) || '/')
    .replace(/\/$/, '') || '/';
  const title = data.title || fileNameToTitle(fileName);
  const description = data.description || data.intro || '';
  const keywords = normalizeKeywords(data.keywords);
  const intro = data.intro ? `${data.intro}\n\n` : '';
  const markdownBody = cleanupMarkdown(`${intro}${content}`);
  const env = {toc: []};
  const html = md.render(markdownBody, env);

  const dataFileName = `${fileName.replace(/\.md$/, '')}.json`;
  const dataPath = path.join(generatedDataDir, dataFileName);
  fs.writeFileSync(
    dataPath,
    JSON.stringify(
      {
        title,
        description,
        slug,
        keywords,
        html,
        toc: env.toc,
      },
      null,
      2,
    ),
  );

  const pagePath = path.join(generatedPagesDir, `${slugToPagePath(slug)}.tsx`);
  fs.mkdirSync(path.dirname(pagePath), {recursive: true});
  const relativeJsonPath = path
    .relative(path.dirname(pagePath), dataPath)
    .replace(/\\/g, '/')
    .replace(/\.json$/, '.json');
  fs.writeFileSync(pagePath, pageModule(relativeJsonPath.startsWith('.') ? relativeJsonPath : `./${relativeJsonPath}`));
  console.log(`Generated policy page for ${slug}`);
}
