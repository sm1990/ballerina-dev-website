import fs from 'node:fs';
import path from 'node:path';

const sourceDir =
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tools';
const targetDir = path.resolve('learn-tools-docs');
const sidebarPath = path.resolve('sidebarsLearnTools.ts');

const toolCards = [
  {
    id: 'openapi-tool',
    targetPath: 'integration-tools/openapi-tool.md',
    title: 'OpenAPI tool',
    description:
      'Generate a Ballerina service and client skeletons for an OpenAPI contract.',
    href: '/learn/openapi-tool/',
  },
  {
    id: 'graphql-tool',
    targetPath: 'integration-tools/graphql-tool.md',
    title: 'GraphQL tool',
    description:
      'Generate a GraphQL service skeleton for a given schema and generate a schema for a Ballerina GraphQL service.',
    href: '/learn/graphql-tool/',
  },
  {
    id: 'asyncapi-tool',
    targetPath: 'integration-tools/asyncapi-tool.md',
    title: 'AsyncAPI tool',
    description:
      'Generate a Ballerina service and listener skeletons for an AsyncAPI contract.',
    href: '/learn/asyncapi-tool/',
  },
  {
    id: 'grpc-tool',
    targetPath: 'integration-tools/grpc-tool.md',
    title: 'gRPC tool',
    description:
      'Develop a service documented in Protocol Buffers by generating Ballerina service and client stubs.',
    href: '/learn/grpc-tool/',
  },
  {
    id: 'health-tool',
    targetPath: 'integration-tools/health-tool.md',
    title: 'Health tool (FHIR/HL7)',
    description: 'FHIR/HL7 profile-to-client and stub generation tooling for Ballerina.',
    href: '/learn/health-tool/',
  },
  {
    id: 'edi-tool',
    targetPath: 'integration-tools/edi-tool.md',
    title: 'EDI tool',
    description: 'Work with EDI files in Ballerina using the provided command-line tools.',
    href: '/learn/edi-tool/',
  },
  {
    id: 'wsdl-tool',
    targetPath: 'integration-tools/wsdl-tool.md',
    title: 'WSDL tool',
    description: 'Generate Ballerina clients and records for a WSDL specification.',
    href: '/learn/wsdl-tool/',
  },
  {
    id: 'xsd-tool',
    targetPath: 'integration-tools/xsd-tool.md',
    title: 'XSD tool',
    description: 'Generate Ballerina records for an XSD specification.',
    href: '/learn/xsd-tool/',
  },
];

const slugOverrides = Object.fromEntries(
  toolCards.map((tool) => [
    tool.id,
    tool.href.replace(/^\/learn/, '').replace(/\/$/, '') || '/',
  ]),
);
const staleFlatFiles = ['intro.md', 'intro.mdx', ...toolCards.flatMap((tool) => [
  `${tool.id}.md`,
  `${tool.id}.mdx`,
])];

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

function normalizeKeywords(value) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function yamlArray(name, values) {
  if (values.length === 0) {
    return '';
  }

  return `${name}:\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}\n`;
}

function buildFrontmatter({title, description, slug, keywords}) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description || '')}\nslug: ${JSON.stringify(slug)}\n${yamlArray('keywords', keywords)}---\n`;
}

function cleanupContent(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')
    .replace(/<br\s*>/g, '<br />')
    .replace(/\]\(\/learn\/([^)\s]+)\//g, '](/learn/$1/')
    .trim();
}

function buildIntroDoc() {
  const body = [
    'The Ballerina integration toolchain helps you generate clients, services, records, and other schema-driven artifacts for common integration workflows.',
    '',
    '## Available tools',
    '',
    ...toolCards.flatMap((tool) => [
      `### [${tool.title}](${tool.href})`,
      '',
      tool.description,
      '',
    ]),
  ].join('\n');

  const content = `${buildFrontmatter({
    title: 'Integration tools',
    description:
      'Generate clients, stubs, and schema-driven artifacts that speed up common integration workflows.',
    slug: '/integration-tools',
    keywords: ['ballerina', 'learn', 'integration tools'],
  })}\n${body}\n`;

  const introPath = path.join(targetDir, 'integration-tools/intro.md');
  fs.mkdirSync(path.dirname(introPath), {recursive: true});
  fs.writeFileSync(introPath, content);
  fs.rmSync(introPath.replace(/\.md$/, '.mdx'), {force: true});
}

function buildSidebar() {
  const items = [
    {
      type: 'category',
      label: 'Integration tools',
      link: {type: 'doc', id: 'intro'},
      collapsed: false,
      collapsible: true,
      items: toolCards.map((tool) => tool.id),
    },
  ];

  const content = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';\n\nconst sidebars: SidebarsConfig = {\n  learnToolsSidebar: ${JSON.stringify(items, null, 2)},\n};\n\nexport default sidebars;\n`;
  fs.writeFileSync(sidebarPath, content);
}

fs.rmSync(path.join(targetDir, 'integration-tools'), {recursive: true, force: true});
fs.mkdirSync(targetDir, {recursive: true});

for (const staleFile of staleFlatFiles) {
  fs.rmSync(path.join(targetDir, staleFile), {force: true});
}

buildIntroDoc();

for (const fileName of fs.readdirSync(sourceDir).filter((file) => file.endsWith('.md')).sort()) {
  const raw = fs.readFileSync(path.join(sourceDir, fileName), 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const title = data.title || fileName.replace(/\.md$/, '');
  const description = data.description || data.intro || '';
  const slug =
    slugOverrides[fileName.replace(/\.md$/, '')] ||
    (data.permalink || `/learn/${fileName.replace(/\.md$/, '')}/`).replace(/\/$/, '');
  const keywords = normalizeKeywords(data.keywords);
  const intro = data.intro ? `${data.intro}\n\n` : '';
  const body = cleanupContent(`${intro}${content}`);
  const output = `${buildFrontmatter({title, description, slug, keywords})}\n${body}\n`;
  const tool = toolCards.find((item) => item.id === fileName.replace(/\.md$/, ''));
  const targetPath = path.join(targetDir, tool?.targetPath || fileName);
  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, output);
  fs.rmSync(targetPath.replace(/\.md$/, '.mdx'), {force: true});
}

console.log('Imported learn integration tools as Markdown docs');
