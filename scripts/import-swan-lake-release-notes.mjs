import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const sourceRoot =
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/swan-lake-release-notes';
const targetRoot = path.resolve('src/pages');
const swanLakeReleaseNotes = JSON.parse(
  fs.readFileSync(path.resolve('_data/swanlake_release_notes_versions.json'), 'utf8'),
);
const swanLakeLatestMetadata = JSON.parse(
  fs.readFileSync(path.resolve('_data/swanlake-latest/metadata.json'), 'utf8'),
);

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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=\[\]{};:'",.<>/?\\|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeContent(content, routePath) {
  let nextContent = content
    .replace(/\]\(\/learn\/update-tool\/\)/g, '](https://ballerina.io/learn/update-tool/)')
    .replace(/\]\(\/downloads\/#swanlake\)/g, '](/downloads/)')
    .replace(/<VERSION>/g, '&lt;VERSION&gt;')
    .replace(/href="\/downloads\/#swanlake"/g, 'href="/downloads/"');

  if (routePath === 'downloads/swan-lake-release-notes/swan-lake-beta3') {
    nextContent = nextContent.replace(/demonstrates this change<\/li>/g, 'demonstrates this change');
  }

  return nextContent.trim();
}

function normalizeRenderedHtml(html, routePath) {
  let nextHtml = html;

  if (routePath === 'downloads/swan-lake-release-notes/swan-lake-beta3') {
    nextHtml = nextHtml.replace(/<\/li><\/p>/g, '</p></li>');
  }

  return nextHtml;
}

function renderMarkdown(content) {
  const toc = [];
  const usedIds = new Map();
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
    langPrefix: 'language-',
  });

  const originalHeadingOpen =
    md.renderer.rules.heading_open ??
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const level = Number(tokens[idx].tag.slice(1));
    const titleToken = tokens[idx + 1];
    const rawText = titleToken?.content ?? '';
    let id = slugify(rawText);

    if (id) {
      const current = usedIds.get(id) ?? 0;
      usedIds.set(id, current + 1);
      if (current > 0) {
        id = `${id}-${current + 1}`;
      }

      tokens[idx].attrSet('id', id);
      if (level === 2 || level === 3) {
        toc.push({id, value: rawText, level});
      }
    }

    return originalHeadingOpen(tokens, idx, options, env, self);
  };

  return {html: md.render(content), toc};
}

function getSwanLakeRoute(version) {
  return `/downloads/swan-lake-release-notes/${
    version.startsWith('swan-lake-') ? version : version.includes('swan') ? version : `swan-lake-${version}`
  }/`;
}

function buildSwanLakeSidebar(currentVersion) {
  return sortedSwanLakeVersions.map((entry) => ({
    type: 'link',
    label: entry['display-version'] ?? entry.version,
    href: getSwanLakeRoute(entry.version),
    docId: entry.version,
    unlisted: false,
  }));
}

const mergedSwanLakeReleaseNotes = [...swanLakeReleaseNotes];
if (
  swanLakeLatestMetadata?.version &&
  !mergedSwanLakeReleaseNotes.some((entry) => entry.version === swanLakeLatestMetadata.version)
) {
  mergedSwanLakeReleaseNotes.push(swanLakeLatestMetadata);
}

const sortedSwanLakeVersions = [...mergedSwanLakeReleaseNotes].sort((left, right) => {
  const leftDate = left['release-date'] ?? '';
  const rightDate = right['release-date'] ?? '';

  if (leftDate && rightDate && leftDate !== rightDate) {
    return rightDate.localeCompare(leftDate);
  }

  return String(right.version).localeCompare(String(left.version), undefined, {numeric: true});
});
const files = fs
  .readdirSync(sourceRoot, {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && !entry.name.includes('template'))
  .map((entry) => path.join(sourceRoot, entry.name, 'RELEASE_NOTE.md'))
  .filter((filePath) => fs.existsSync(filePath));

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const sourceVersion = path.basename(path.dirname(filePath));
  const routePath = getSwanLakeRoute(sourceVersion).replace(/^\/+|\/+$/g, '');
  const targetPath = path.join(targetRoot, routePath, 'index.tsx');
  const title = data.title || path.basename(path.dirname(filePath));
  const description = `${title} - Release note`;
  const {html, toc} = renderMarkdown(normalizeContent(content, routePath));
  const normalizedHtml = normalizeRenderedHtml(html, routePath);
  const currentVersion = sourceVersion.startsWith('swan-lake-')
    ? sourceVersion.replace(/^swan-lake-/, '')
    : sourceVersion;

  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(
    targetPath,
    `import ContentArticlePage from '@site/src/components/ContentArticlePage';

export default function Page() {
  return (
    <ContentArticlePage
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
      breadcrumbs={${JSON.stringify([
        {label: 'Home', href: '/'},
        {label: 'Downloads', href: '/downloads/'},
        {label: title},
      ])}}
      toc={${JSON.stringify(toc)}}
      sidebar={${JSON.stringify(buildSwanLakeSidebar(currentVersion))}}
      html={${JSON.stringify(normalizedHtml)}}
    />
  );
}
`,
  );

  console.log(`Imported ${path.relative(sourceRoot, filePath)} -> ${path.relative(process.cwd(), targetPath)}`);
}
