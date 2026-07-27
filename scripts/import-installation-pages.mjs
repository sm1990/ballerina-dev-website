import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const pages = [
  {
    id: 'get-started',
    collection: 'learn',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration/get-started.md',
    titleFallback: 'Get started',
    descriptionFallback:
      'Let’s set up a Ballerina development environment and write a simple Ballerina program.',
    slug: '/get-started',
    targetPath: 'integration/get-started.md',
  },
  {
    id: 'installation-options',
    collection: 'learn',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/installation-options/installation-options.md',
    titleFallback: 'Installation options',
    descriptionFallback:
      'Get started with the Ballerina programming language by following these instructions on installing and setting up Ballerina.',
    slug: '/install-ballerina/installation-options',
    targetPath: 'install-ballerina/installation-options.md',
  },
  {
    id: 'build-ballerina-from-source',
    collection: 'downloads',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/installation-options/build-ballerina-from-source.md',
    titleFallback: 'Build Ballerina from source',
    descriptionFallback:
      'Follow this guide to build Ballerina from source and contribute to the project.',
    slug: '/installation-options/build-ballerina-from-source',
  },
  {
    id: 'verify-ballerina-artifacts',
    collection: 'downloads',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/downloads/verify-ballerina-artifacts.md',
    titleFallback: 'Verify Ballerina artifacts',
    descriptionFallback:
      'The sections below include information about verifying Ballerina artifacts.',
    slug: '/verify-ballerina-artifacts',
  },
];

const targetDirs = {
  learn: path.resolve('learn-tools-docs'),
  downloads: path.resolve('src/pages/downloads'),
};
const sidebarPaths = {
  learn: path.resolve('sidebarsLearnTools.ts'),
};
const metadataPath = path.resolve('_data/swanlake-latest/metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const distServer = 'https://dist.ballerina.io';
const oldGeneratedPages = [
  path.resolve('src/pages/learn/get-started'),
  path.resolve('src/pages/learn/install-ballerina/installation-options'),
  path.resolve('src/pages/downloads/installation-options/build-ballerina-from-source.tsx'),
  path.resolve('src/pages/downloads/verify-ballerina-artifacts.tsx'),
  path.resolve('learn-foundations-docs'),
];
const staleLearnDocs = [
  'get-started.md',
  'get-started.mdx',
  'installation-options.md',
  'installation-options.mdx',
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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=\[\]{};:'",.<>/?\\|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
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

function replaceLiquid(content) {
  const otherArtifact = metadata['other-artefacts']?.[0] ?? '';
  const branch = metadata.version.replace(/^(\d+\.\d+\.)\d+$/, '$1x');

  return content
    .replace(/\{\{\s*dist_server\s*\}\}/g, distServer)
    .replace(/\{\{\s*version\s*\}\}/g, metadata.version)
    .replace(/\{\{\s*branch\s*\}\}/g, branch)
    .replace(/\{\{\s*other-artefacts\s*\|\s*first\s*\}\}/g, otherArtifact)
    .replace(/\{\{\s*zip-installer\s*\}\}/g, otherArtifact)
    .replace(/\{\{\s*windows-installer-size\s*\}\}/g, metadata['windows-installer-size'] ?? '')
    .replace(/\{\{\s*windows-installer\s*\}\}/g, metadata['windows-installer'] ?? '')
    .replace(/\{\{\s*linux-installer-size\s*\}\}/g, metadata['linux-installer-size'] ?? '')
    .replace(/\{\{\s*linux-installer\s*\}\}/g, metadata['linux-installer'] ?? '')
    .replace(/\{\{\s*rpm-installer-size\s*\}\}/g, metadata['rpm-installer-size'] ?? '')
    .replace(/\{\{\s*rpm-installer\s*\}\}/g, metadata['rpm-installer'] ?? '')
    .replace(/\{\{\s*macos-installer-size\s*\}\}/g, metadata['macos-installer-size'] ?? '')
    .replace(/\{\{\s*macos-installer\s*\}\}/g, metadata['macos-installer'] ?? '')
    .replace(/\{\{\s*macos-arm-installer-size\s*\}\}/g, metadata['macos-arm-installer-size'] ?? '')
    .replace(/\{\{\s*macos-arm-installer\s*\}\}/g, metadata['macos-arm-installer'] ?? '');
}

function cleanupContent(content, id) {
  let cleaned = replaceLiquid(content)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\]\(\/downloads\/installation-options\/\)/g, '](/learn/install-ballerina/installation-options/)')
    .replace(/\]\(\/downloads\/installation-options\/build-ballerina-from-source\/\)/g, '](/downloads/installation-options/build-ballerina-from-source/)')
    .replace(/\]\(\/downloads\/verify-ballerina-artifacts\/\)/g, '](/downloads/verify-ballerina-artifacts/)')
    .replace(/\]\(\/learn\/update-tool\/\)/g, '](https://ballerina.io/learn/update-tool/)')
    .trim();

  if (id === 'get-started') {
    cleaned = cleaned.replace(/\]\(\/downloads\/\)/g, '](/downloads/)');
    cleaned = cleaned.replace(
      /\]\(\/downloads\/installation-options\/\)/g,
      '](/learn/install-ballerina/installation-options/)',
    );
  }

  if (id === 'build-ballerina-from-source') {
    cleaned = cleaned.replace(/JBallerina Java \(Java Introp\) API/g, 'JBallerina Java (Java Interop) API');
  }

  return cleaned;
}

function buildLearnSidebar() {
  const content = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  learnToolsSidebar: [
    {
      type: 'category',
      label: 'Why Ballerina',
      collapsed: false,
      collapsible: true,
      items: [
        {type: 'link', label: 'Cloud native', href: 'https://ballerina.io/why-ballerina/cloud-native/'},
        {type: 'link', label: 'Flexibly typed', href: 'https://ballerina.io/why-ballerina/flexibly-typed/'},
        {type: 'link', label: 'Data oriented', href: 'https://ballerina.io/why-ballerina/data-oriented/'},
        {type: 'link', label: 'Graphical', href: 'https://ballerina.io/why-ballerina/graphical/'},
        {type: 'link', label: 'Concurrent', href: 'https://ballerina.io/why-ballerina/concurrent/'},
        {type: 'link', label: 'Reliable, maintainable', href: 'https://ballerina.io/why-ballerina/reliable-maintainable/'},
      ],
    },
    {
      type: 'category',
      label: 'Get started with integration',
      collapsed: false,
      collapsible: true,
      items: [
        'get-started',
        'installation-options',
        {type: 'link', label: 'Pre-built integrations', href: 'https://ballerina.io/learn/integration/pre-built-integrations/'},
        {type: 'link', label: 'Enterprise Integration Patterns (EIP)', href: 'https://ballerina.io/learn/enterprise-integration-patterns/'},
        {type: 'link', label: 'Integration tutorials', href: 'https://ballerina.io/learn/integration/integration-tutorials/'},
        {type: 'link', label: 'Supported data formats', href: 'https://ballerina.io/learn/integration/supported-data-formats/'},
        {type: 'link', label: 'Supported network integration protocols', href: 'https://ballerina.io/learn/integration/supported-network-protocols/'},
      ],
    },
    {
      type: 'category',
      label: 'Integration tools',
      link: {type: 'doc', id: 'intro'},
      collapsed: false,
      collapsible: true,
      items: [
        'openapi-tool',
        'graphql-tool',
        'asyncapi-tool',
        'grpc-tool',
        'health-tool',
        'edi-tool',
        'wsdl-tool',
        'xsd-tool',
      ],
    },
    {
      type: 'category',
      label: 'References',
      collapsed: false,
      collapsible: true,
      items: [
        {type: 'link', label: 'Ballerina by Example', href: '/learn/by-example/'},
        {type: 'link', label: 'Ballerina API Docs', href: 'https://lib.ballerina.io/'},
        {type: 'link', label: 'Ballerina specifications', href: 'https://ballerina.io/learn/references/ballerina-specifications/'},
        {type: 'link', label: 'Visual Studio Code extension', href: 'https://ballerina.io/learn/vs-code-extension/'},
      ],
    },
    {
      type: 'category',
      label: 'Development tutorials',
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Build and run',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'CLI commands', href: 'https://ballerina.io/learn/cli-commands/'},
            {type: 'link', label: 'Update tool', href: 'https://ballerina.io/learn/update-tool/'},
            {type: 'link', label: 'Ballerina Shell', href: 'https://ballerina.io/learn/ballerina-shell/'},
            {type: 'link', label: 'Configure CI/CD for Ballerina projects', href: 'https://ballerina.io/learn/configure-cicd/'},
          ],
        },
        {
          type: 'category',
          label: 'Source code & dependencies',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Organize Ballerina code', href: 'https://ballerina.io/learn/organize-ballerina-code/'},
            {type: 'link', label: 'Package references', href: 'https://ballerina.io/learn/package-references/'},
            {type: 'link', label: 'Manage dependencies', href: 'https://ballerina.io/learn/manage-dependencies/'},
            {type: 'link', label: 'Workspaces', href: 'https://ballerina.io/learn/workspaces/'},
          ],
        },
        {
          type: 'category',
          label: 'Style guide',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Coding conventions', href: 'https://ballerina.io/learn/coding-conventions/'},
            {type: 'link', label: 'Top-level definitions', href: 'https://ballerina.io/learn/top-level-definitions/'},
            {type: 'link', label: 'Operators, keywords, and types', href: 'https://ballerina.io/learn/operators-keywords-and-types/'},
            {type: 'link', label: 'Statements', href: 'https://ballerina.io/learn/statements/'},
            {type: 'link', label: 'Expressions', href: 'https://ballerina.io/learn/expressions/'},
            {type: 'link', label: 'Annotations, documentation and comments', href: 'https://ballerina.io/learn/annotations-documentation-comments/'},
            {type: 'link', label: 'Customize formatting', href: 'https://ballerina.io/learn/customize-formatting/'},
          ],
        },
        {
          type: 'category',
          label: 'Test, debug & document the code',
          collapsed: false,
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Test Ballerina code',
              collapsed: false,
              collapsible: true,
              items: [
                {type: 'link', label: 'Test a simple function', href: 'https://ballerina.io/learn/test-a-simple-function/'},
                {type: 'link', label: 'Write tests', href: 'https://ballerina.io/learn/write-tests/'},
                {type: 'link', label: 'Structure tests', href: 'https://ballerina.io/learn/structure-tests/'},
                {type: 'link', label: 'Configure tests', href: 'https://ballerina.io/learn/configure-tests/'},
                {type: 'link', label: 'Code coverage and reporting', href: 'https://ballerina.io/learn/code-coverage-and-reporting/'},
                {type: 'link', label: 'Define data-driven tests', href: 'https://ballerina.io/learn/define-data-driven-tests/'},
                {type: 'link', label: 'Define test groups', href: 'https://ballerina.io/learn/define-test-groups/'},
                {type: 'link', label: 'Test services and clients', href: 'https://ballerina.io/learn/test-services-and-clients/'},
                {type: 'link', label: 'Mocking', href: 'https://ballerina.io/learn/mocking/'},
                {type: 'link', label: 'Execute tests', href: 'https://ballerina.io/learn/execute-tests/'},
                {type: 'link', label: 'Execute tests in parallel', href: 'https://ballerina.io/learn/execute-tests-in-parallel/'},
              ],
            },
            {type: 'link', label: 'Debug Ballerina programs', href: 'https://ballerina.io/learn/debug-ballerina-programs/'},
            {type: 'link', label: 'Generate code documentation', href: 'https://ballerina.io/learn/generate-code-documentation/'},
          ],
        },
        {
          type: 'category',
          label: 'Configurability',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Configure a sample Ballerina service', href: 'https://ballerina.io/learn/configure-a-sample-ballerina-service/'},
            {type: 'link', label: 'Provide values to configurable variables', href: 'https://ballerina.io/learn/provide-values-to-configurable-variables/'},
            {type: 'link', label: 'Configure values', href: 'https://ballerina.io/learn/configure-values/'},
          ],
        },
        {
          type: 'category',
          label: 'Deployment guidelines',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Deployment guidelines overview', href: 'https://ballerina.io/learn/deployment-guidelines/'},
            {type: 'link', label: 'Monolithic deployment', href: 'https://ballerina.io/learn/monolithic-deployment/'},
            {type: 'link', label: 'Containerized deployment', href: 'https://ballerina.io/learn/containerized-deployment/'},
            {type: 'link', label: 'Serverless deployment', href: 'https://ballerina.io/learn/serverless-deployment/'},
          ],
        },
        {
          type: 'category',
          label: 'Bal persist',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Bal persist overview', href: 'https://ballerina.io/learn/bal-persist-overview/'},
            {type: 'link', label: 'Data model', href: 'https://ballerina.io/learn/bal-persist-data-model/'},
            {type: 'link', label: 'CLI tool', href: 'https://ballerina.io/learn/bal-persist-cli-tool/'},
            {type: 'link', label: 'Type-safe client API', href: 'https://ballerina.io/learn/bal-persist-client-api/'},
            {type: 'link', label: 'Introspection', href: 'https://ballerina.io/learn/bal-persist-introspection/'},
            {type: 'link', label: 'Supported data stores', href: 'https://ballerina.io/learn/bal-persist-supported-data-stores/'},
          ],
        },
        {
          type: 'category',
          label: 'Observability',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Overview of Ballerina observability', href: 'https://ballerina.io/learn/ballerina-observability/'},
            {
              type: 'category',
              label: 'Supported observability tools and platforms',
              collapsed: false,
              collapsible: true,
              items: [
                {type: 'link', label: 'Prometheus', href: 'https://ballerina.io/learn/observability-with-prometheus/'},
                {type: 'link', label: 'Jaeger', href: 'https://ballerina.io/learn/observability-with-jaeger/'},
                {type: 'link', label: 'Zipkin', href: 'https://ballerina.io/learn/observability-with-zipkin/'},
                {type: 'link', label: 'Datadog', href: 'https://ballerina.io/learn/observability-with-datadog/'},
                {type: 'link', label: 'New Relic', href: 'https://ballerina.io/learn/observability-with-new-relic/'},
                {type: 'link', label: 'Elastic Stack', href: 'https://ballerina.io/learn/observability-with-elastic-stack/'},
                {type: 'link', label: 'OpenSearch', href: 'https://ballerina.io/learn/observability-with-opensearch/'},
                {type: 'link', label: 'Moesif', href: 'https://ballerina.io/learn/observability-with-moesif/'},
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Java interoperability',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Call Java code from Ballerina', href: 'https://ballerina.io/learn/call-java-code-from-ballerina/'},
            {type: 'link', label: 'Ballerina FFI', href: 'https://ballerina.io/learn/ballerina-ffi/'},
            {type: 'link', label: 'The Bindgen tool', href: 'https://ballerina.io/learn/the-bindgen-tool/'},
          ],
        },
        {
          type: 'category',
          label: 'Build a GraalVM executable',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'GraalVM executable overview', href: 'https://ballerina.io/learn/graalvm-executable-overview/'},
            {type: 'link', label: 'Build the executable in a container', href: 'https://ballerina.io/learn/build-the-executable-in-a-container/'},
            {type: 'link', label: 'Build the executable locally', href: 'https://ballerina.io/learn/build-the-executable-locally/'},
          ],
        },
        {
          type: 'category',
          label: 'Reuse code with Ballerina Central',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Publish packages to Ballerina Central', href: 'https://ballerina.io/learn/publish-packages-to-ballerina-central/'},
            {type: 'link', label: 'Configure a network proxy', href: 'https://ballerina.io/learn/configure-a-network-proxy/'},
          ],
        },
        {
          type: 'category',
          label: 'Troubleshoot the runtime',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Strand dump tool', href: 'https://ballerina.io/learn/strand-dump-tool/'},
            {type: 'link', label: 'Ballerina Profiler', href: 'https://ballerina.io/learn/ballerina-profiler/'},
          ],
        },
        {
          type: 'category',
          label: 'Static code analysis',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Scan tool', href: 'https://ballerina.io/learn/scan-tool/'},
            {type: 'link', label: 'Scan rules', href: 'https://ballerina.io/learn/scan-rules/'},
          ],
        },
        {
          type: 'category',
          label: 'Additional tools',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Consolidate-packages tool', href: 'https://ballerina.io/learn/consolidate-packages-tool/'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Featured scenarios',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Write a RESTful API with Ballerina', href: 'https://ballerina.io/learn/write-a-restful-api-with-ballerina/'},
            {type: 'link', label: 'Write a gRPC service with Ballerina', href: 'https://ballerina.io/learn/write-a-grpc-service-with-ballerina/'},
            {type: 'link', label: 'Write a GraphQL API with Ballerina', href: 'https://ballerina.io/learn/write-a-graphql-api-with-ballerina/'},
            {type: 'link', label: 'Work with data using queries in Ballerina', href: 'https://ballerina.io/learn/work-with-data-using-queries-in-ballerina/'},
            {type: 'link', label: 'Build a data service in Ballerina', href: 'https://ballerina.io/learn/build-a-data-service-in-ballerina/'},
            {type: 'link', label: 'Build a Change Data Capture (CDC) service in Ballerina', href: 'https://ballerina.io/learn/build-a-change-data-capture-cdc-service-in-ballerina/'},
            {type: 'link', label: 'Work with Large Language Models (LLMs) using natural expressions', href: 'https://ballerina.io/learn/work-with-llms-using-natural-expressions/'},
            {type: 'link', label: 'Deploy Ballerina on Kubernetes', href: 'https://ballerina.io/learn/deploy-ballerina-on-kubernetes/'},
            {type: 'link', label: 'Manage data persistence with bal persist', href: 'https://ballerina.io/learn/manage-data-persistence-with-bal-persist/'},
            {type: 'link', label: 'Create your first connector with Ballerina', href: 'https://ballerina.io/learn/create-your-first-connector-with-ballerina/'},
          ],
        },
        {
          type: 'category',
          label: 'Learn the language',
          collapsed: false,
          collapsible: true,
          items: [
            {type: 'link', label: 'Language basics', href: 'https://ballerina.io/learn/language-basics/'},
            {type: 'link', label: 'Network interaction', href: 'https://ballerina.io/learn/network-interaction/'},
            {type: 'link', label: 'Data', href: 'https://ballerina.io/learn/data/'},
            {type: 'link', label: 'Concurrency', href: 'https://ballerina.io/learn/concurrency/'},
            {type: 'link', label: 'Advanced, general-purpose language features', href: 'https://ballerina.io/learn/advanced-general-purpose-language-features/'},
          ],
        },
      ],
    },
  ],
};

export default sidebars;
`;

  fs.writeFileSync(sidebarPaths.learn, content);
}

function buildDownloadsSidebar() {
  return [
    {
      type: 'link',
      label: 'Get started',
      href: '/learn/get-started/',
    },
    {
      type: 'link',
      label: 'Installation options',
      href: '/learn/install-ballerina/installation-options/',
    },
    {
      type: 'link',
      label: 'Build Ballerina from source',
      href: '/downloads/installation-options/build-ballerina-from-source/',
    },
    {
      type: 'link',
      label: 'Verify Ballerina artifacts',
      href: '/downloads/verify-ballerina-artifacts/',
    },
  ];
}

for (const page of oldGeneratedPages) {
  fs.rmSync(page, {recursive: true, force: true});
}

fs.mkdirSync(targetDirs.learn, {recursive: true});
fs.mkdirSync(path.join(targetDirs.downloads, 'installation-options'), {recursive: true});

for (const staleDoc of staleLearnDocs) {
  fs.rmSync(path.join(targetDirs.learn, staleDoc), {force: true});
}

for (const page of pages) {
  const raw = fs.readFileSync(page.sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const title = data.title || page.titleFallback;
  const description = data.description || data.intro || page.descriptionFallback;
  const keywords = normalizeKeywords(data.keywords);
  const body = data.intro ? `${data.intro}\n\n${content}` : content;
  const cleaned = cleanupContent(body, page.id);
  if (page.collection === 'learn') {
    const output = `${buildFrontmatter({
      title,
      description,
      slug: page.slug,
      keywords,
    })}\n${cleaned.trim()}\n`;
    const targetPath = path.join(targetDirs.learn, page.targetPath);
    fs.mkdirSync(path.dirname(targetPath), {recursive: true});
    fs.writeFileSync(targetPath, output);
    fs.rmSync(targetPath.replace(/\.md$/, '.mdx'), {force: true});
    console.log(`Imported ${path.basename(page.sourcePath)} -> ${path.relative(process.cwd(), targetPath)}`);
    continue;
  }

  const {html, toc} = renderMarkdown(cleaned);
  const targetPath =
    page.id === 'build-ballerina-from-source'
      ? path.join(targetDirs.downloads, 'installation-options', 'build-ballerina-from-source.tsx')
      : path.join(targetDirs.downloads, 'verify-ballerina-artifacts.tsx');
  const pageOutput = `import ContentArticlePage from '@site/src/components/ContentArticlePage';

export default function Page() {
  return (
    <ContentArticlePage
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
      breadcrumbs={[{"label":"Home","href":"/"},{"label":"Downloads","href":"/downloads/"},{"label":${JSON.stringify(title)}}]}
      sidebar={${JSON.stringify(buildDownloadsSidebar())}}
      toc={${JSON.stringify(toc)}}
      html={${JSON.stringify(html)}}
    />
  );
}
`;
  fs.writeFileSync(targetPath, pageOutput);
  console.log(`Imported ${path.basename(page.sourcePath)} -> ${path.relative(process.cwd(), targetPath)}`);
}
