import fs from 'fs';
import path from 'path';

const sourceRoot = process.cwd();
const migrationRoot = process.cwd();

const sourcePagesDir = path.join(sourceRoot, 'pages/learn/integration/pre-built-integrations');
const sourceDataPath = path.join(sourceRoot, 'components/learn/pre-built-integrations/data.js');
const sourceAssetsDir = path.join(sourceRoot, 'public/images/pre-built');

const generatedDir = path.join(migrationRoot, 'src/generated');
const generatedDataPath = path.join(generatedDir, 'prebuiltIntegrationsData.ts');
const targetPagesDir = path.join(migrationRoot, 'src/pages/learn/pre-built-integrations');
const targetAssetsDir = path.join(migrationRoot, 'static/images/pre-built');

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function decodeEntities(value) {
  return value
    .replaceAll('&apos;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function extractBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start === -1) {
    return null;
  }
  const contentStart = start + startMarker.length;
  const end = source.indexOf(endMarker, contentStart);
  if (end === -1) {
    return null;
  }
  return source.slice(contentStart, end);
}

function extractParagraphs(block) {
  const matches = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
  return matches.map((match) => normalizeWhitespace(decodeEntities(match[1].replace(/<[^>]+>/g, '')))).filter(Boolean);
}

function parseLandingItems() {
  const source = fs.readFileSync(sourceDataPath, 'utf8');
  const itemMatches = [...source.matchAll(/\{\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*tags:\s*\[([\s\S]*?)\]\s*,?\s*\}/g)];

  return itemMatches.map((match) => {
    const name = decodeEntities(match[1].trim());
    const description = decodeEntities(match[2].trim());
    const tags = [...match[3].matchAll(/"([^"]+)"/g)].map((tagMatch) => decodeEntities(tagMatch[1].trim()));
    const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
    return {name, description, tags, slug};
  });
}

function parseDetailPage(fileName) {
  const slug = fileName.replace(/\.js$/, '');
  const filePath = path.join(sourcePagesDir, fileName);
  const source = fs.readFileSync(filePath, 'utf8');

  const titleMatch = source.match(/<h1>([^<]+)<\/h1>/);
  const title = decodeEntities(titleMatch?.[1]?.trim() || slugToTitle(slug));

  const metaDescriptionMatch = source.match(/name="description"\s+content="([^"]+)"/);
  const metaDescription = decodeEntities(metaDescriptionMatch?.[1]?.trim() || '');

  const introColumnMatch = source.match(/<Col xs=\{12\} lg=\{6\} style=\{\{ fontSize: "18px" \}\}>([\s\S]*?)<\/Col>/);
  const paragraphs = introColumnMatch ? extractParagraphs(introColumnMatch[1]) : [];

  const flowImageMatch = source.match(/flow_diagrams\/([^"]+)\.png/);
  const flowDiagram = flowImageMatch ? `/images/pre-built/flow_diagrams/${flowImageMatch[1]}.png` : null;

  const sequenceImageMatch = source.match(/sequence-diagrams\/([^"]+)\.png/);
  const sequenceDiagram = sequenceImageMatch ? `/images/pre-built/sequence-diagrams/${sequenceImageMatch[1]}.png` : null;

  const githubMatch = source.match(/https:\/\/github\.com\/ballerina-guides\/integration-samples\/tree\/main\/[^"]+/);
  const githubUrl = githubMatch ? githubMatch[0] : null;

  const contentBlock = extractBetween(source, 'const content = `', '  `;\n  var samples');
  const code = contentBlock ? contentBlock.replace(/\r\n/g, '\n').trim() : '';

  return {
    slug,
    title,
    metaDescription,
    paragraphs,
    flowDiagram,
    sequenceDiagram,
    githubUrl,
    code,
  };
}

function writeGeneratedDataFile(landingItems, detailItems) {
  const content = `export type PrebuiltIntegrationSummary = {
  name: string;
  description: string;
  tags: string[];
  slug: string;
};

export type PrebuiltIntegrationDetail = {
  slug: string;
  title: string;
  metaDescription: string;
  paragraphs: string[];
  flowDiagram: string | null;
  sequenceDiagram: string | null;
  githubUrl: string | null;
  code: string;
};

export const prebuiltIntegrationItems: PrebuiltIntegrationSummary[] = ${JSON.stringify(landingItems, null, 2)} as const;

export const prebuiltIntegrationDetails: Record<string, PrebuiltIntegrationDetail> = ${JSON.stringify(
    Object.fromEntries(detailItems.map((item) => [item.slug, item])),
    null,
    2,
  )} as const;
`;

  ensureDir(generatedDir);
  fs.writeFileSync(generatedDataPath, content);
}

function writeLandingPage() {
  const content = `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {prebuiltIntegrationItems} from '../../../generated/prebuiltIntegrationsData';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import styles from './index.module.css';

const allTags = Array.from(new Set(prebuiltIntegrationItems.flatMap((item) => item.tags))).sort();

export default function PrebuiltIntegrationsIndex(): JSX.Element {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const visibleItems = React.useMemo(() => {
    if (!selectedTags.length) {
      return prebuiltIntegrationItems;
    }
    return prebuiltIntegrationItems.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)));
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <Layout title="Pre-built integrations" description="These pre-built integration samples are built using Ballerina connectors and can be used as a starting point for your integration use cases.">
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Learn', href: '/learn/'}, {label: 'Pre-built integrations'}]} />
          <Heading as="h1" className={styles.title}>Pre-built integrations</Heading>
          <p className={styles.description}>
            These pre-built integration samples are built using Ballerina connectors and can be used as a starting point for your integration use cases.
          </p>
          <div className={styles.tagRow}>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button key={tag} type="button" className={isSelected ? styles.activeTag : styles.tag} onClick={() => toggleTag(tag)}>
                  {tag}
                </button>
              );
            })}
          </div>
          <div className={styles.grid}>
            {visibleItems.map((item) => (
              <Link key={item.slug} to={\`/learn/pre-built-integrations/\${item.slug}/\`} className={styles.card}>
                <div className={styles.cardBody}>
                  <Heading as="h2" className={styles.cardTitle}>{item.name}</Heading>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <div className={styles.cardTags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
`;

  const styles = `.page {
  padding: 2rem 0 4rem;
}

.title {
  margin: 0 0 1rem;
}

.description {
  max-width: 62rem;
  margin: 0 0 1.75rem;
  font-size: 1.05rem;
  line-height: 1.75;
}

.tagRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tag,
.activeTag {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  background: var(--ifm-background-surface-color);
  color: var(--ifm-font-color-base);
  padding: 0.45rem 0.9rem;
  font: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.tag:hover,
.activeTag {
  border-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}

.activeTag {
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, var(--ifm-background-surface-color));
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.card:hover {
  text-decoration: none;
}

.cardBody {
  height: 100%;
  padding: 1.25rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  background: var(--ifm-background-surface-color);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.cardTitle {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.cardDescription {
  margin: 0 0 1rem;
  color: var(--ifm-color-emphasis-700);
  line-height: 1.65;
}

.cardTags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cardTag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, var(--ifm-background-surface-color));
  color: var(--ifm-color-primary);
  font-size: 0.875rem;
  font-weight: 500;
}
`;

  ensureDir(targetPagesDir);
  fs.writeFileSync(path.join(targetPagesDir, 'index.tsx'), content);
  fs.writeFileSync(path.join(targetPagesDir, 'index.module.css'), styles);
}

function writeDetailPage(item) {
  const content = `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {prebuiltIntegrationDetails} from '../../../generated/prebuiltIntegrationsData';
import styles from './detail.module.css';

const item = prebuiltIntegrationDetails[${JSON.stringify(item.slug)}];

export default function PrebuiltIntegrationPage(): JSX.Element {
  return (
    <Layout title={item.title} description={item.metaDescription}>
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Pre-built integrations', href: '/learn/pre-built-integrations/'},
              {label: item.title},
            ]}
          />
          <Link to="/learn/pre-built-integrations/" className={styles.backLink}>Back to pre-built integrations</Link>
          <Heading as="h1" className={styles.title}>{item.title}</Heading>
          <section className={styles.hero}>
            <div className={styles.copy}>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>
            {item.flowDiagram && (
              <div className={styles.diagramPanel}>
                <img src={item.flowDiagram} alt={\`\${item.title} flow diagram\`} className={styles.diagramImage} />
              </div>
            )}
          </section>
          <Tabs className={styles.tabs}>
            <TabItem value="code" label="Code" default>
              <div className={styles.codePanel}>
                {item.githubUrl && (
                  <div className={styles.codeActions}>
                    <a href={item.githubUrl} target="_blank" rel="noreferrer" className={styles.githubLink}>
                      View source on GitHub
                    </a>
                  </div>
                )}
                <CodeBlock language="ballerina">{item.code}</CodeBlock>
              </div>
            </TabItem>
            {item.sequenceDiagram && (
              <TabItem value="diagram" label="Diagram">
                <div className={styles.sequencePanel}>
                  <img src={item.sequenceDiagram} alt={\`\${item.title} sequence diagram\`} className={styles.diagramImage} />
                </div>
              </TabItem>
            )}
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
`;

  const detailStyles = `.page {
  padding: 2rem 0 4rem;
}

.backLink {
  display: inline-flex;
  margin-bottom: 1rem;
  font-weight: 600;
}

.title {
  margin: 0 0 1.5rem;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

.copy {
  min-width: 0;
}

.paragraph {
  margin: 0 0 1rem;
  line-height: 1.75;
  font-size: 1.02rem;
}

.diagramPanel,
.sequencePanel {
  padding: 1rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  background: var(--ifm-background-surface-color);
}

.diagramImage {
  display: block;
  width: 100%;
  height: auto;
}

.tabs :global(.tabs) {
  margin-bottom: 1rem;
}

.codePanel {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  background: var(--ifm-background-surface-color);
  padding: 1rem;
}

.codeActions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}

.githubLink {
  font-weight: 600;
}

@media (max-width: 996px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
`;

  fs.writeFileSync(path.join(targetPagesDir, `${item.slug}.tsx`), content);
  fs.writeFileSync(path.join(targetPagesDir, 'detail.module.css'), detailStyles);
}

function cleanupStalePages(validSlugs) {
  if (!fs.existsSync(targetPagesDir)) {
    return;
  }

  for (const entry of fs.readdirSync(targetPagesDir)) {
    if (!entry.endsWith('.tsx')) {
      continue;
    }
    if (entry === 'index.tsx') {
      continue;
    }
    const slug = entry.replace(/\.tsx$/, '');
    if (!validSlugs.has(slug)) {
      fs.rmSync(path.join(targetPagesDir, entry), {force: true});
    }
  }
}

function copyAssets() {
  fs.rmSync(targetAssetsDir, {recursive: true, force: true});
  ensureDir(path.dirname(targetAssetsDir));
  fs.cpSync(sourceAssetsDir, targetAssetsDir, {recursive: true});
}

function main() {
  const landingItems = parseLandingItems();
  const detailFiles = fs
    .readdirSync(sourcePagesDir)
    .filter((file) => file.endsWith('.js') && file !== 'index.js')
    .sort();
  const detailItems = detailFiles.map(parseDetailPage);

  writeGeneratedDataFile(landingItems, detailItems);
  ensureDir(targetPagesDir);
  writeLandingPage();
  cleanupStalePages(new Set(detailItems.map((item) => item.slug)));
  for (const item of detailItems) {
    writeDetailPage(item);
  }
  copyAssets();
}

main();
