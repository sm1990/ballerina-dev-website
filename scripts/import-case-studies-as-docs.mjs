import fs from 'node:fs';
import path from 'node:path';

const sourceDir = '/Users/sarani/Downloads/codebase/ballerina-dev-website/case-studies';
const externalSourcePath =
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/_data/external-case-studies.json';
const docsTargetDir = path.resolve('case-studies-docs');
const generatedListingTarget = path.resolve('src/generated/caseStudiesIndexData.js');
const sidebarTarget = path.resolve('sidebarsCaseStudies.ts');

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

function yamlArray(name, values) {
  if (values.length === 0) {
    return '';
  }

  return `${name}:\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}\n`;
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

function cleanupContent(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/\sstyle=(?:"[^"]*"|'[^']*')/g, '')
    .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')
    .replace(/<br\s*>/g, '<br />')
    .trim();
}

function buildFrontmatter({title, description, slug, keywords}) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description || '')}\nslug: ${JSON.stringify(slug)}\n${yamlArray('keywords', keywords)}---\n`;
}

function extractListingItem({slug, data, isExternal = false, href = undefined}) {
  return {
    id: data.active || slug,
    title: data.title || slug,
    description: data.description || data.intro || '',
    intro: data.intro || data.description || '',
    logo: data.logo || '',
    href: href ?? `/case-studies/${slug}`,
    isExternal,
  };
}

const files = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith('.md'))
  .sort();

fs.rmSync(docsTargetDir, {recursive: true, force: true});
fs.mkdirSync(docsTargetDir, {recursive: true});

const listingItems = [];
const sidebarDocIds = [];

for (const fileName of files) {
  const sourcePath = path.join(sourceDir, fileName);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const slug = fileName.replace(/\.md$/, '');
  const cleaned = cleanupContent(content);
  const lead = [
    data.logo ? `![${data.title || slug} logo](${data.logo})` : '',
    data.intro || data.description || '',
  ]
    .filter(Boolean)
    .join('\n\n');
  const output = `${buildFrontmatter({
    title: data.title || slug,
    description: data.description || data.intro || '',
    slug: `/${slug}`,
    keywords: normalizeKeywords(data.keywords),
  })}\n${lead}${lead && cleaned ? '\n\n' : ''}${cleaned}\n`;
  const targetPath = path.join(docsTargetDir, `${slug}.md`);
  fs.writeFileSync(targetPath, output);
  fs.rmSync(path.join(docsTargetDir, `${slug}.mdx`), {force: true});
  listingItems.push(extractListingItem({slug, data}));
  sidebarDocIds.push(slug);
  console.log(`Imported ${fileName} -> ${path.relative(process.cwd(), targetPath)}`);
}

const external = JSON.parse(fs.readFileSync(externalSourcePath, 'utf8'));
for (const item of external.caseStudies ?? []) {
  listingItems.push(
    extractListingItem({
      slug: item.id,
      data: item.frontmatter ?? {},
      isExternal: Boolean(item.isExternal),
      href: item.slug,
    }),
  );
}

listingItems.sort((a, b) => a.id.localeCompare(b.id));

const listingOutput = `const caseStudiesIndexData = ${JSON.stringify(listingItems, null, 2)};\n\nexport default caseStudiesIndexData;\n`;
fs.mkdirSync(path.dirname(generatedListingTarget), {recursive: true});
fs.writeFileSync(generatedListingTarget, listingOutput);
console.log(
  `Generated ${path.relative(process.cwd(), generatedListingTarget)} from case study sources`,
);

const sidebarOutput = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';\n\nconst sidebars: SidebarsConfig = {\n  caseStudiesSidebar: [],\n};\n\nexport default sidebars;\n`;
fs.writeFileSync(sidebarTarget, sidebarOutput);
console.log(`Generated ${path.relative(process.cwd(), sidebarTarget)} from case study sources`);
