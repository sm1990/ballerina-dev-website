import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const sourceRoot = process.cwd();
const migrationRoot = process.cwd();

const sourcePatternsRoot = path.join(
  sourceRoot,
  'pages/learn/enterprise-integration-patterns/enterprise-integration-patterns',
);
const sourcePatternIconsDir = path.join(sourceRoot, 'public/images/patterns');

const generatedDir = path.join(migrationRoot, 'src/generated');
const generatedDataPath = path.join(generatedDir, 'enterpriseIntegrationPatternsData.ts');
const targetPagesDir = path.join(migrationRoot, 'src/pages/learn/enterprise-integration-patterns');
const targetAssetsDir = path.join(migrationRoot, 'static/images/patterns');

const md = new MarkdownIt({html: true, linkify: true});

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function toTitle(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function sanitizeHtml(html) {
  return html.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
}

function languageForFile(file) {
  if (file.endsWith('.bal')) return 'ballerina';
  if (file.endsWith('.http')) return 'http';
  if (file.endsWith('.json')) return 'json';
  if (file.endsWith('.xml')) return 'xml';
  if (file.endsWith('.yml') || file.endsWith('.yaml')) return 'yaml';
  if (file.endsWith('.md')) return 'markdown';
  return 'text';
}

function parseSimpleYaml(content) {
  const result = {};
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (!rawValue) {
      result[key] = '';
      continue;
    }

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      const inner = rawValue.slice(1, -1).trim();
      result[key] = inner
        ? inner
            .split(',')
            .map((item) => item.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'))
        : [];
      continue;
    }

    if (/^-?\d+$/.test(rawValue)) {
      result[key] = Number(rawValue);
      continue;
    }

    result[key] = rawValue.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }

  return result;
}

function readPatternFolder(pattern) {
  const folder = path.join(sourcePatternsRoot, pattern);
  const ymlPath = path.join(folder, `${pattern}.yml`);
  const ymlData = fs.existsSync(ymlPath) ? parseSimpleYaml(fs.readFileSync(ymlPath, 'utf8')) : {};
  const files = ymlData.files ?? [`${pattern}.bal`];
  const codeFiles = files
    .filter((file) => fs.existsSync(path.join(folder, file)))
    .map((file) => ({
      name: file,
      language: languageForFile(file),
      content: fs.readFileSync(path.join(folder, file), 'utf8').trimEnd(),
    }));

  const index = ymlData.index ?? -1;
  const category = ymlData.category ?? 'Uncategorized';
  const name = ymlData.name ?? toTitle(pattern);
  const description = ymlData.desc ?? ymlData.tagline ?? '';
  const helps = ymlData.helps ? sanitizeHtml(md.render(ymlData.helps)) : '';
  const link = ymlData.link ?? 'https://www.enterpriseintegrationpatterns.com/';
  const tags = Array.isArray(ymlData.tags) ? ymlData.tags : [];

  return {
    slug: pattern,
    name,
    description,
    helps,
    link,
    tags,
    category,
    index,
    icon: `/images/patterns/${pattern}.svg`,
    codeFiles,
  };
}

function collectPatterns() {
  const entries = fs.readdirSync(sourcePatternsRoot, {withFileTypes: true});
  const patterns = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const folder = path.join(sourcePatternsRoot, entry.name);
    const hasBal = fs.existsSync(path.join(folder, `${entry.name}.bal`));
    const hasYml = fs.existsSync(path.join(folder, `${entry.name}.yml`));
    if (!hasBal && !hasYml) {
      continue;
    }
    patterns.push(readPatternFolder(entry.name));
  }

  patterns.sort((a, b) => {
    if (a.category === b.category) {
      return a.index - b.index || a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const categories = Array.from(
    patterns.reduce((map, pattern) => {
      if (!map.has(pattern.category)) {
        map.set(pattern.category, []);
      }
      map.get(pattern.category).push(pattern);
      return map;
    }, new Map()),
  )
    .map(([category, items]) => ({category, items}))
    .sort((a, b) => {
      const ai = a.items[0]?.index ?? -1;
      const bi = b.items[0]?.index ?? -1;
      return ai - bi || a.category.localeCompare(b.category);
    });

  return {patterns, categories};
}

function writeGeneratedData({patterns, categories}) {
  const content = `export type EnterpriseIntegrationPatternCodeFile = {
  name: string;
  language: string;
  content: string;
};

export type EnterpriseIntegrationPattern = {
  slug: string;
  name: string;
  description: string;
  helps: string;
  link: string;
  tags: string[];
  category: string;
  index: number;
  icon: string;
  codeFiles: EnterpriseIntegrationPatternCodeFile[];
};

export type EnterpriseIntegrationPatternCategory = {
  category: string;
  items: EnterpriseIntegrationPattern[];
};

export const enterpriseIntegrationPatterns: EnterpriseIntegrationPattern[] = ${JSON.stringify(patterns, null, 2)} as const;

export const enterpriseIntegrationPatternCategories: EnterpriseIntegrationPatternCategory[] = ${JSON.stringify(categories, null, 2)} as const;

export const enterpriseIntegrationPatternMap: Record<string, EnterpriseIntegrationPattern> = ${JSON.stringify(
    Object.fromEntries(patterns.map((pattern) => [pattern.slug, pattern])),
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
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {
  enterpriseIntegrationPatternCategories,
  enterpriseIntegrationPatterns,
} from '../../../generated/enterpriseIntegrationPatternsData';
import styles from './index.module.css';

const allTags = Array.from(new Set(enterpriseIntegrationPatterns.flatMap((item) => item.tags))).sort();

export default function EnterpriseIntegrationPatternsIndex(): JSX.Element {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const visibleCategories = React.useMemo(() => {
    return enterpriseIntegrationPatternCategories
      .map((category) => ({
        category: category.category,
        items: category.items.filter((item) => selectedTags.every((tag) => item.tags.includes(tag))),
      }))
      .filter((category) => category.items.length > 0);
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <Layout
      title="Enterprise Integration Patterns"
      description="Ballerina usage patterns and best practices for implementing enterprise integrations.">
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Enterprise Integration Patterns'},
            ]}
          />
          <Heading as="h1" className={styles.title}>Enterprise Integration Patterns</Heading>
          <p className={styles.description}>
            Ballerina usage patterns and best practices for implementing enterprise integrations. These patterns are based on the{' '}
            <a href="https://www.enterpriseintegrationpatterns.com/" target="_blank" rel="noreferrer">Enterprise Integration Patterns</a>{' '}
            book by Gregor Hohpe and Bobby Woolf. Each sample is a simplified version of a real-world integration scenario.
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
          {visibleCategories.map((category) => (
            <section key={category.category} className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>{category.category}</Heading>
              <div className={styles.grid}>
                {category.items.map((item) => (
                  <Link key={item.slug} to={\`/learn/enterprise-integration-patterns/\${item.slug}/\`} className={styles.card}>
                    <div className={styles.cardBody}>
                      <div className={styles.iconWrap}>
                        <img src={item.icon} alt="" className={styles.icon} />
                      </div>
                      <div>
                        <Heading as="h3" className={styles.cardTitle}>{item.name}</Heading>
                        <p className={styles.cardDescription}>{item.description}</p>
                        <div className={styles.cardTags}>
                          {item.tags.map((tag) => (
                            <span key={tag} className={styles.cardTag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
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
  max-width: 70rem;
  margin: 0 0 1.75rem;
  line-height: 1.75;
  font-size: 1.02rem;
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
}

.activeTag,
.tag:hover {
  border-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}

.activeTag {
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, var(--ifm-background-surface-color));
}

.section + .section {
  margin-top: 2rem;
}

.sectionTitle {
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.card {
  color: inherit;
  text-decoration: none;
}

.card:hover {
  text-decoration: none;
}

.cardBody {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 1rem;
  height: 100%;
  padding: 1.25rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  background: var(--ifm-background-surface-color);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.iconWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 72px;
  height: 72px;
}

.cardTitle {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.cardDescription {
  margin: 0 0 0.9rem;
  color: var(--ifm-color-emphasis-700);
  line-height: 1.6;
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

@media (max-width: 640px) {
  .cardBody {
    grid-template-columns: 1fr;
  }
}
`;

  ensureDir(targetPagesDir);
  fs.writeFileSync(path.join(targetPagesDir, 'index.tsx'), content);
  fs.writeFileSync(path.join(targetPagesDir, 'index.module.css'), styles);
}

function writeDetailPage(pattern) {
  const content = `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {enterpriseIntegrationPatternMap} from '../../../generated/enterpriseIntegrationPatternsData';
import styles from './detail.module.css';

const pattern = enterpriseIntegrationPatternMap[${JSON.stringify(pattern.slug)}];

export default function EnterpriseIntegrationPatternPage(): JSX.Element {
  return (
    <Layout title={pattern.name} description={pattern.description}>
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Enterprise Integration Patterns', href: '/learn/enterprise-integration-patterns/'},
              {label: pattern.name},
            ]}
          />
          <Link to="/learn/enterprise-integration-patterns/" className={styles.backLink}>Back to EIP</Link>
          <Heading as="h1" className={styles.title}>{pattern.name}</Heading>
          <div className={styles.summary}>
            <div className={styles.infoTable}>
              <div className={styles.row}>
                <div className={styles.label}>Pattern</div>
                <div className={styles.value}>
                  {pattern.description}{' '}
                  <a href={pattern.link} target="_blank" rel="noreferrer">Reference</a>
                </div>
              </div>
              {pattern.helps && (
                <div className={styles.row}>
                  <div className={styles.label}>How Ballerina helps</div>
                  <div className={styles.value} dangerouslySetInnerHTML={{__html: pattern.helps}} />
                </div>
              )}
            </div>
            <div className={styles.tagRow}>
              {pattern.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <Tabs className={styles.tabs}>
            {pattern.codeFiles.map((file, index) => (
              <TabItem key={file.name} value={file.name} label={file.name} default={index === 0}>
                <CodeBlock language={file.language}>{file.content}</CodeBlock>
              </TabItem>
            ))}
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
`;

  const styles = `.page {
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

.summary {
  margin-bottom: 2rem;
}

.infoTable {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  overflow: hidden;
  background: var(--ifm-background-surface-color);
}

.row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
}

.row + .row {
  border-top: 1px solid var(--ifm-color-emphasis-200);
}

.label,
.value {
  padding: 1rem 1.25rem;
}

.label {
  font-weight: 700;
  background: color-mix(in srgb, var(--ifm-color-emphasis-100) 65%, var(--ifm-background-surface-color));
}

.value :global(p:last-child) {
  margin-bottom: 0;
}

.tagRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, var(--ifm-background-surface-color));
  color: var(--ifm-color-primary);
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
}
`;

  fs.writeFileSync(path.join(targetPagesDir, `${pattern.slug}.tsx`), content);
  fs.writeFileSync(path.join(targetPagesDir, 'detail.module.css'), styles);
}

function cleanupStalePages(validSlugs) {
  if (!fs.existsSync(targetPagesDir)) {
    return;
  }

  for (const entry of fs.readdirSync(targetPagesDir)) {
    if (!entry.endsWith('.tsx') || entry === 'index.tsx') {
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
  fs.cpSync(sourcePatternIconsDir, targetAssetsDir, {recursive: true});
}

function main() {
  const data = collectPatterns();
  writeGeneratedData(data);
  writeLandingPage();
  cleanupStalePages(new Set(data.patterns.map((pattern) => pattern.slug)));
  for (const pattern of data.patterns) {
    writeDetailPage(pattern);
  }
  copyAssets();
}

main();
