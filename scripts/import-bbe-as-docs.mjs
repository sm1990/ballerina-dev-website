import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve('generated/bbe/examples');
const sourceIndexPath = path.join(sourceRoot, 'all-bbes.json');
const transformedRoot = path.resolve('src/generated/bbe/examples');
const docsRoot = path.resolve('bbe-docs');
const sidebarPath = path.resolve('sidebarsBbe.ts');
const indexDataPath = path.resolve('src/generated/bbe/indexData.ts');

function ensureExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} not found: ${targetPath}`);
  }
}

function normalizeSample(sample) {
  return {
    title: sample.name,
    slug: sample.url,
  };
}

function normalizeSections(indexData) {
  const grouped = new Map();

  for (const section of indexData) {
    const samples = (section.samples ?? []).map(normalizeSample);

    if (samples.length === 0) {
      continue;
    }

    const groupTitle = section.category || 'Ballerina by Example';
    if (!grouped.has(groupTitle)) {
      grouped.set(groupTitle, []);
    }

    grouped.get(groupTitle).push({
      title: section.title,
      samples,
    });
  }

  return Array.from(grouped.entries()).map(([title, sections]) => ({
    title,
    sections,
  }));
}

function transformContent(source) {
  return source
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(
      'import { Container, Row, Col } from "react-bootstrap";',
      'import { Container, Row, Col, sanitizeHtml } from "@site/src/components/BbeRuntime";',
    )
    .replace('import DOMPurify from "dompurify";\n', '')
    .replace(
      'import {\n  copyToClipboard,\n  extractOutput,\n} from "../../../utils/bbe";',
      'import {copyToClipboard, extractOutput} from "@site/src/utils/bbe";',
    )
    .replace('import Link from "next/link";', 'import Link from "@docusaurus/Link";')
    .replace(/DOMPurify\.sanitize\(/g, 'sanitizeHtml(')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/href="(\/learn\/by-example\/[^"/?#]+)"/g, 'href="$1/"')
    .replace(/href="(\/learn\/by-example\/[^"]+?)\/+"/g, 'href="$1/"')
    .replace(/href=\{?"(\/learn\/by-example\/[^"/?#]+)"\}?/g, 'href="$1/"')
    .replace(/export function ([A-Za-z0-9_]+)\s*\(/, 'export default function $1(');
}

function writeFile(targetPath, content) {
  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, content);
}

function writeExampleArtifacts({slug, title, description, keywords}) {
  const sampleRoot = path.join(sourceRoot, slug);
  const contentPath = path.join(sampleRoot, 'content.jsx');
  const liquidPath = path.join(sampleRoot, 'liquid.json');

  if (!fs.existsSync(contentPath) || !fs.existsSync(liquidPath)) {
    return false;
  }

  const liquid = JSON.parse(fs.readFileSync(liquidPath, 'utf8'));
  const source = fs.readFileSync(contentPath, 'utf8');
  const transformed = transformContent(source);
  const targetContentPath = path.join(transformedRoot, slug, 'content.jsx');

  writeFile(targetContentPath, transformed);

  const docContent = `${buildDocFrontmatter({
    title: title ?? liquid.title,
    description: description ?? liquid.description,
    slug: `/${slug}/`,
    keywords: keywords ?? liquid.keywords ?? [],
  })}
import ExampleComponent, {codeSnippetData} from '@site/src/generated/bbe/examples/${slug}/content';

<ExampleComponent codeSnippets={codeSnippetData} />
`;

  writeFile(path.join(docsRoot, `${slug}.mdx`), docContent);
  return liquid;
}

function buildDocFrontmatter({title, description, slug, keywords, hideToc = true, hideTitle = true}) {
  const normalizedKeywords = keywords.map((keyword) => keyword.trim()).filter(Boolean);
  const keywordBlock =
    normalizedKeywords.length === 0
      ? ''
      : `keywords:\n${normalizedKeywords
          .map((keyword) => `  - ${JSON.stringify(keyword)}`)
          .join('\n')}\n`;

  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(
    description || '',
  )}\nslug: ${JSON.stringify(
    slug,
  )}\n${keywordBlock}hide_title: ${hideTitle}\nhide_table_of_contents: ${hideToc}\ncustom_edit_url: null\n---\n`;
}

function buildSidebar(groups) {
  const body = groups
    .map((group) => {
      const sections = group.sections
        .map((section) => {
          const items = section.samples.map((sample) => `'${sample.slug}'`).join(',\n            ');
          return `        {
          type: 'category',
          label: ${JSON.stringify(section.title)},
          collapsible: true,
          collapsed: true,
          items: [
            ${items}
          ],
        }`;
        })
        .join(',\n');

      return `    {
      type: 'category',
      label: ${JSON.stringify(group.title)},
      collapsible: true,
      collapsed: false,
      items: [
${sections}
      ],
    }`;
    })
    .join(',\n');

  return `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bbeSidebar: [
    'intro',
${body}
  ],
};

export default sidebars;
`;
}

ensureExists(sourceIndexPath, 'Generated BBE index');

const examplesIndex = JSON.parse(fs.readFileSync(sourceIndexPath, 'utf8'));
const groups = normalizeSections(examplesIndex);

fs.rmSync(transformedRoot, {recursive: true, force: true});
fs.rmSync(docsRoot, {recursive: true, force: true});
fs.mkdirSync(transformedRoot, {recursive: true});
fs.mkdirSync(docsRoot, {recursive: true});
fs.mkdirSync(path.dirname(indexDataPath), {recursive: true});

const flatSamples = [];
const generatedSlugs = new Set();

for (const group of groups) {
  for (const section of group.sections) {
    for (const sample of section.samples) {
      const liquid = writeExampleArtifacts(sample);
      if (!liquid) {
        continue;
      }
      generatedSlugs.add(sample.slug);
      flatSamples.push({
        title: liquid.title,
        slug: sample.slug,
        description: liquid.description,
        group: group.title,
        section: section.title,
      });
    }
  }
}

for (const entry of fs.readdirSync(sourceRoot, {withFileTypes: true})) {
  if (!entry.isDirectory()) {
    continue;
  }

  const slug = entry.name;
  if (generatedSlugs.has(slug)) {
    continue;
  }

  writeExampleArtifacts({slug});
}

const introDoc = `${buildDocFrontmatter({
  title: 'Ballerina by Example',
  description: 'Explore and try out a series of guided Ballerina examples.',
  slug: '/',
  keywords: ['ballerina', 'ballerina by example', 'bbe'],
  hideToc: true,
  hideTitle: false,
})}
import BbeIndex from '@site/src/components/BbeIndex';
import indexData from '@site/src/generated/bbe/indexData';

<BbeIndex groups={indexData} />
`;

writeFile(path.join(docsRoot, 'intro.mdx'), introDoc);
writeFile(sidebarPath, buildSidebar(groups));
writeFile(indexDataPath, `const indexData = ${JSON.stringify(groups, null, 2)};\n\nexport default indexData;\n`);

console.log(`Generated BBE docs in ${path.relative(process.cwd(), docsRoot)}`);
console.log(`Generated BBE sidebar in ${path.relative(process.cwd(), sidebarPath)}`);
console.log(`Generated transformed BBE components in ${path.relative(process.cwd(), transformedRoot)}`);
