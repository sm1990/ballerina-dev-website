import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const sourcePath =
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/community/proposals/active-proposals.md';
const targetPath = path.resolve('src/pages/community/active-proposals/index.tsx');

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
});

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    return {data: {}, content: fileContent};
  }

  const [, rawFrontmatter, content] = match;
  const data = {};

  for (const line of rawFrontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    value = value.replace(/^['"]/, '').replace(/['"]$/, '');
    data[key] = value;
  }

  return {data, content};
}

function normalizeHtml(html) {
  return html
    .replace(/<a /g, '<a target="_blank" rel="noreferrer" ')
    .replace(/<table>/g, '<table class="active-proposals-table">');
}

const raw = fs.readFileSync(sourcePath, 'utf8');
const {data, content} = parseFrontmatter(raw);
const rendered = normalizeHtml(markdown.render(content.trim()));

const output = `import ActiveProposalsPage from '@site/src/components/ActiveProposalsPage';

export default function Page() {
  return (
    <ActiveProposalsPage
      title=${JSON.stringify(data.title || 'Active proposals')}
      description=${JSON.stringify(data.description || '')}
      intro=${JSON.stringify(data.intro || '')}
      html={${JSON.stringify(rendered)}}
    />
  );
}
`;

fs.mkdirSync(path.dirname(targetPath), {recursive: true});
fs.writeFileSync(targetPath, output);
console.log(`Imported active proposals -> ${path.relative(process.cwd(), targetPath)}`);
