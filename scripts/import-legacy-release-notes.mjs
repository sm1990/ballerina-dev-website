import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const targetRoot = path.resolve('src/pages');
const archivedReleaseNotes = JSON.parse(
  fs.readFileSync(path.resolve('_data/release_notes_versions.json'), 'utf8'),
);

const streams = [
  {
    id: '1.2.x-release-notes',
    routeBase: 'downloads/1.2.x-release-notes',
    sourceDir: '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/1.2.x-release-notes',
    type: 'markdown',
  },
  {
    id: '1.1.x-release-notes',
    routeBase: 'downloads/1.1.x-release-notes',
    sourceDir: '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/1.1.x-release-notes',
    type: 'html',
  },
  {
    id: '1.0.x-release-notes',
    routeBase: 'downloads/1.0.x-release-notes',
    sourceDir: '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/1.0.x-release-notes',
    type: 'html',
  },
  {
    id: '0.9.x-release-notes',
    routeBase: 'downloads/0.9.x-release-notes',
    sourceDir: '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/0.9.x-release-notes',
    type: 'html',
  },
];

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

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'");
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function normalizeMarkdownContent(content) {
  return content
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\]\(\/learn\/update-tool\/\)/g, '](https://ballerina.io/learn/update-tool/)')
    .trim();
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

  return {
    html: md.render(content),
    toc,
  };
}

function normalizeHtmlContent(content) {
  let next = content.trim();

  next = next.replace(/^<div class="release_notes">\s*/i, '');
  next = next.replace(/\s*<\/div>\s*$/i, '');
  next = next.replace(/<<pre/g, '<pre');
  next = next.replace(/<([A-Za-z]+:[^>\s]+)>/g, '&lt;$1&gt;');
  next = next.replace(/href="https:\/\/ballerina\.io\/downloads\/"/g, 'href="/downloads/"');
  next = next.replace(/href="https:\/\/ballerina\.io\/learn\/update-tool\/"/g, 'href="https://ballerina.io/learn/update-tool/"');

  return next.trim();
}

function renderHtmlContent(content) {
  const toc = [];
  const usedIds = new Map();
  let html = normalizeHtmlContent(content);
  let extractedTitle = '';

  html = html.replace(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>\s*/i, (_match, titleHtml) => {
    extractedTitle = stripTags(titleHtml);
    return '';
  });

  html = html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelRaw, attrs = '', innerHtml) => {
    const level = Number(levelRaw);
    const text = stripTags(innerHtml);

    if (!text) {
      return match;
    }

    let id = slugify(text);
    const current = usedIds.get(id) ?? 0;
    usedIds.set(id, current + 1);
    if (current > 0) {
      id = `${id}-${current + 1}`;
    }

    if (level <= 2) {
      toc.push({id, value: text, level});
    }

    const nextAttrs = attrs.includes(' id=')
      ? attrs.replace(/\sid="[^"]*"/i, ` id="${id}"`)
      : `${attrs} id="${id}"`;

    return `<h${level}${nextAttrs}>${innerHtml}</h${level}>`;
  });

  return {
    title: extractedTitle,
    html,
    toc,
  };
}

function getMarkdownFiles(sourceDir) {
  return fs
    .readdirSync(sourceDir, {withFileTypes: true})
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.includes('template'))
    .map((entry) => path.join(sourceDir, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

function getHtmlFiles(sourceDir) {
  return fs
    .readdirSync(sourceDir, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(sourceDir, entry.name, 'RELEASE_NOTE.html'))
    .filter((filePath) => fs.existsSync(filePath))
    .sort((left, right) => left.localeCompare(right));
}

function sortVersionsByDateDesc(versions) {
  return [...versions].sort((left, right) => {
    const leftDate =
      archivedReleaseNotes.find((entry) => entry.version === left)?.['release-date'] ?? '';
    const rightDate =
      archivedReleaseNotes.find((entry) => entry.version === right)?.['release-date'] ?? '';

    if (leftDate && rightDate && leftDate !== rightDate) {
      return rightDate.localeCompare(leftDate);
    }

    return right.localeCompare(left, undefined, {numeric: true});
  });
}

function buildLegacySidebar(stream, sortedVersions, currentVersion) {
  return sortedVersions.map((item) => ({
    type: 'link',
    label: item,
    href: `/downloads/${stream.id}/${item}/`,
    docId: item,
    unlisted: false,
  }));
}

for (const stream of streams) {
  const files = stream.type === 'markdown' ? getMarkdownFiles(stream.sourceDir) : getHtmlFiles(stream.sourceDir);
  const versions = files.map((filePath) =>
    stream.type === 'markdown' ? path.basename(filePath, '.md') : path.basename(path.dirname(filePath)),
  );
  const sortedVersions = sortVersionsByDateDesc(versions);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const version =
      stream.type === 'markdown' ? path.basename(filePath, '.md') : path.basename(path.dirname(filePath));
    const targetPath = path.join(targetRoot, stream.routeBase, version, 'index.tsx');
    const breadcrumbs = [
      {label: 'Home', href: '/'},
      {label: 'Downloads', href: '/downloads/'},
      {label: version},
    ];
    let title = version;
    let description = `${version} release notes`;
    let html = '';
    let toc = [];

    if (stream.type === 'markdown') {
      const {data, content} = parseFrontmatter(raw);
      title = (data.title || version).trim();
      description = `${title} release notes`;
      ({html, toc} = renderMarkdown(normalizeMarkdownContent(content)));
    } else {
      const rendered = renderHtmlContent(raw);
      title = rendered.title || version;
      description = `${title} release notes`;
      html = rendered.html;
      toc = rendered.toc;
    }

    fs.mkdirSync(path.dirname(targetPath), {recursive: true});
    fs.writeFileSync(
      targetPath,
      `import ContentArticlePage from '@site/src/components/ContentArticlePage';

export default function Page() {
  return (
    <ContentArticlePage
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
      breadcrumbs={${JSON.stringify(breadcrumbs)}}
      toc={${JSON.stringify(toc)}}
      sidebar={${JSON.stringify(buildLegacySidebar(stream, sortedVersions, version))}}
      html={${JSON.stringify(html)}}
    />
  );
}
`,
    );

    console.log(`Imported ${path.relative(stream.sourceDir, filePath)} -> ${path.relative(process.cwd(), targetPath)}`);
  }
}
