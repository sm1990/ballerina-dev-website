import fs from 'node:fs';
import path from 'node:path';

const sourceDir = '/Users/sarani/Downloads/codebase/ballerina-dev-website/community/newsletter';
const pagesTargetDir = path.resolve('src/pages/community/newsletter');
const generatedListingTarget = path.resolve('src/generated/newsletterIndexData.js');

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

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

function cleanupContent(content, slug) {
  let cleaned = content
    .replace(/^# .*\n+/m, '')
    .replace(/<\/body>\s*$/i, '')
    .replace(/^<body>\s*/i, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/href="([^"]+)"color:\s*/g, 'href="$1" style="color: ')
    .replace(/<\/2nd>/gi, '')
    .trim();

  if (slug === '2022-7') {
    cleaned = cleaned.replace(
      /^(<table\b[^>]*>)(\s*)(<table\b)/i,
      '$1<tbody><tr><td>$3',
    );
  }

  if (/^<td\b/i.test(cleaned)) {
    cleaned = `<table><tbody><tr>${cleaned}`;
  } else if (/^<tr\b/i.test(cleaned)) {
    cleaned = `<table><tbody>${cleaned}`;
  } else if (/^<tbody\b/i.test(cleaned)) {
    cleaned = `<table>${cleaned}`;
  }

  const tags = ['td', 'tr', 'tbody', 'table'];
  for (const tag of tags) {
    const openCount = (cleaned.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const closeCount = (cleaned.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (openCount > closeCount) {
      cleaned += `</${tag}>`.repeat(openCount - closeCount);
    }
  }

  if (slug === '2020-1' || slug === '2021-5') {
    cleaned = cleaned.replace(/<\/table>\s*<\/td>\s*$/i, '</table>');
  }

  if (slug === '2022-7') {
    cleaned = cleaned.replace(
      /^<table\b[^>]*>\s*<tbody>\s*<tr>\s*<td>(<table\b[\s\S]*<\/table>)\s*<\/td>\s*<\/tr>\s*<\/tbody>\s*<\/table>\s*$/i,
      '$1',
    );
  }

  return cleaned;
}

function compareIssueSlugsDescending(a, b) {
  const [yearA, issueA] = a.split('-').map(Number);
  const [yearB, issueB] = b.split('-').map(Number);

  if (yearA !== yearB) {
    return yearB - yearA;
  }

  return issueB - issueA;
}

const files = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith('.md'))
  .sort((a, b) => compareIssueSlugsDescending(a.replace(/\.md$/, ''), b.replace(/\.md$/, '')));

fs.rmSync(pagesTargetDir, {recursive: true, force: true});
fs.mkdirSync(pagesTargetDir, {recursive: true});

const listingItems = [];

for (const fileName of files) {
  const sourcePath = path.join(sourceDir, fileName);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const slug = fileName.replace(/\.md$/, '');
  const cleaned = cleanupContent(content, slug);
  const output = `import NewsletterIssuePage from '@site/src/components/NewsletterIssuePage';

export default function Page() {
  return (
    <NewsletterIssuePage
      title=${JSON.stringify(data.title || slug)}
      issue=${JSON.stringify(data.issue || '')}
      description=${JSON.stringify(data.description || '')}
      html={${JSON.stringify(cleaned)}}
    />
  );
}
`;

  const targetPath = path.join(pagesTargetDir, `${slug}.tsx`);
  fs.writeFileSync(targetPath, output);

  listingItems.push({
    slug,
    title: data.title || slug,
    issue: data.issue || '',
    href: `/community/newsletter/${slug}`,
  });

  console.log(`Imported ${fileName} -> ${path.relative(process.cwd(), targetPath)}`);
}

const listingOutput = `const newsletterIndexData = ${JSON.stringify(listingItems, null, 2)};\n\nexport default newsletterIndexData;\n`;
fs.mkdirSync(path.dirname(generatedListingTarget), {recursive: true});
fs.writeFileSync(generatedListingTarget, listingOutput);
console.log(
  `Generated ${path.relative(process.cwd(), generatedListingTarget)} from newsletter sources`,
);
