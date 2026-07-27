import fs from 'node:fs';
import path from 'node:path';

const pages = [
  {
    id: 'vs-code-extension-get-started',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/get-started.md',
    titleFallback: 'Get started',
    descriptionFallback:
      'The sections below walk you through how to get started with the Ballerina VS Code extension by installing it and opening a Ballerina package via it.',
    slug: '/vs-code-extension/get-started',
    targetPath: 'vs-code-extension/get-started.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/get-started',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/get-started'),
  },
  {
    id: 'vs-code-extension-configure-the-extension',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/configure-the-extension.md',
    titleFallback: 'Configure the extension',
    descriptionFallback:
      'Configure the Ballerina VS Code extension using the available user and workspace settings.',
    slug: '/vs-code-extension/configure-the-extension',
    targetPath: 'vs-code-extension/configure-the-extension.md',
  },
  {
    id: 'vs-code-extension-build-executables',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/build-executables.md',
    titleFallback: 'Build executables',
    descriptionFallback:
      'Build an executable JAR from the Ballerina VS Code extension using the command palette.',
    slug: '/vs-code-extension/build-executables',
    targetPath: 'vs-code-extension/build-executables.md',
  },
  {
    id: 'vs-code-extension-notebooks',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/notebooks.md',
    titleFallback: 'Notebooks',
    descriptionFallback:
      'Create, edit, run, and debug Ballerina notebooks inside the VS Code extension.',
    slug: '/vs-code-extension/notebooks',
    targetPath: 'vs-code-extension/notebooks.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/vs-code-extension/notebooks',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/notebooks'),
  },
  {
    id: 'vs-code-extension-license',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/license.md',
    titleFallback: 'License',
    descriptionFallback:
      'Review the licensing terms for the Ballerina VS Code extension.',
    slug: '/vs-code-extension/license',
    targetPath: 'vs-code-extension/license.md',
  },
  {
    id: 'vs-code-extension-troubleshoot',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/troubleshoot.md',
    titleFallback: 'Troubleshoot',
    descriptionFallback:
      'Troubleshoot common issues in the Ballerina VS Code extension and inspect extension logs.',
    slug: '/vs-code-extension/troubleshoot',
    targetPath: 'vs-code-extension/troubleshoot.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/vs-code-extension/troubleshoot',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/troubleshoot'),
  },
  {
    id: 'vs-code-extension-run-a-program',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/run-a-program.md',
    titleFallback: 'Run a program',
    descriptionFallback:
      'Follow the steps below to run a sample Ballerina program in VS Code.',
    slug: '/vs-code-extension/run-a-program',
    targetPath: 'vs-code-extension/run-a-program.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/build-and-try/build-and-run',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/build-and-try/build-and-run'),
  },
  {
    id: 'vs-code-extension-test-the-code',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/test-the-code.md',
    titleFallback: 'Test the code',
    descriptionFallback:
      'Run and debug tests written in your Ballerina programs using the VS Code extension.',
    slug: '/vs-code-extension/test-the-code',
    targetPath: 'vs-code-extension/test-the-code.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/test-the-code',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/test-the-code'),
  },
  {
    id: 'vs-code-extension-intellisense',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/write-the-code/intellisense.md',
    titleFallback: 'Intellisense',
    descriptionFallback:
      'Use intelligent completions and inline language assistance in the Ballerina VS Code extension.',
    slug: '/vs-code-extension/write-the-code/intellisense',
    targetPath: 'vs-code-extension/write-the-code/intellisense.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/edit-the-code/intellisense',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/edit-the-code/intellisense'),
  },
  {
    id: 'vs-code-extension-code-actions',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/write-the-code/code-actions.md',
    titleFallback: 'Code actions',
    descriptionFallback:
      'Use quick fixes and source actions in the Ballerina VS Code extension.',
    slug: '/vs-code-extension/write-the-code/code-actions',
    targetPath: 'vs-code-extension/write-the-code/code-actions.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/edit-the-code/code-actions',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/edit-the-code/code-actions'),
  },
  {
    id: 'vs-code-extension-code-navigation',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/write-the-code/code-navigation.md',
    titleFallback: 'Code navigation',
    descriptionFallback:
      'Navigate through Ballerina code efficiently inside the VS Code extension.',
    slug: '/vs-code-extension/write-the-code/code-navigation',
    targetPath: 'vs-code-extension/write-the-code/code-navigation.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/edit-the-code/code-navigation',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/edit-the-code/code-navigation'),
  },
  {
    id: 'vs-code-extension-diagnostics',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/write-the-code/diagnostics.md',
    titleFallback: 'Diagnostics',
    descriptionFallback:
      'Inspect diagnostics and quick fixes surfaced by the Ballerina VS Code extension.',
    slug: '/vs-code-extension/write-the-code/diagnostics',
    targetPath: 'vs-code-extension/write-the-code/diagnostics.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/edit-the-code/diagnostics',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/edit-the-code/diagnostics'),
  },
  {
    id: 'vs-code-extension-commands',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/write-the-code/commands.md',
    titleFallback: 'Commands',
    descriptionFallback:
      'Use the built-in Ballerina commands available from the VS Code command palette.',
    slug: '/vs-code-extension/write-the-code/commands',
    targetPath: 'vs-code-extension/write-the-code/commands.md',
  },
  {
    id: 'vs-code-extension-debug-configurations',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/debug-the-code/debug-configurations.md',
    titleFallback: 'Debug configurations',
    descriptionFallback:
      'Configure debug sessions for Ballerina programs inside VS Code.',
    slug: '/vs-code-extension/debug-the-code/debug-configurations',
    targetPath: 'vs-code-extension/debug-the-code/debug-configurations.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/debug',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/debug'),
  },
  {
    id: 'vs-code-extension-debug-features',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/debug-the-code/debug-features.md',
    titleFallback: 'Debug features',
    descriptionFallback:
      'Use the debugger features available in the Ballerina VS Code extension.',
    slug: '/vs-code-extension/debug-the-code/debug-features',
    targetPath: 'vs-code-extension/debug-the-code/debug-features.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/debug',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/debug'),
  },
  {
    id: 'vs-code-extension-debug-sessions',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/debug-the-code/debug-sessions.md',
    titleFallback: 'Debug sessions',
    descriptionFallback:
      'Start and manage Ballerina debug sessions from the VS Code extension.',
    slug: '/vs-code-extension/debug-the-code/debug-sessions',
    targetPath: 'vs-code-extension/debug-the-code/debug-sessions.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/debug',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/debug'),
  },
  {
    id: 'vs-code-extension-http-api-designer',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/design-the-services/http-api-designer.md',
    titleFallback: 'HTTP API designer',
    descriptionFallback:
      'Design and update Ballerina HTTP services visually in the VS Code extension.',
    slug: '/vs-code-extension/design-the-services/http-api-designer',
    targetPath: 'vs-code-extension/design-the-services/http-api-designer.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/visual-programming/http-api-designer',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/visual-programming/http-api-designer'),
  },
  {
    id: 'vs-code-extension-graphql-api-designer',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/design-the-services/graphql-api-designer.md',
    titleFallback: 'GraphQL API designer',
    descriptionFallback:
      'Model and evolve GraphQL APIs visually in the VS Code extension.',
    slug: '/vs-code-extension/design-the-services/graphql-api-designer',
    targetPath: 'vs-code-extension/design-the-services/graphql-api-designer.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/visual-programming/graphql-designer',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/visual-programming/graphql-designer'),
  },
  {
    id: 'vs-code-extension-try-http-services',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/try-the-services/try-http-services.md',
    titleFallback: 'Try HTTP services',
    descriptionFallback:
      'Run and interact with HTTP services inside the Ballerina VS Code extension.',
    slug: '/vs-code-extension/try-the-services/try-http-services',
    targetPath: 'vs-code-extension/try-the-services/try-http-services.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/build-and-try/try-http-services',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/build-and-try/try-http-services'),
  },
  {
    id: 'vs-code-extension-try-graphql-services',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/try-the-services/try-graphql-services.md',
    titleFallback: 'Try GraphQL services',
    descriptionFallback:
      'Run and interact with GraphQL services inside the Ballerina VS Code extension.',
    slug: '/vs-code-extension/try-the-services/try-graphql-services',
    targetPath: 'vs-code-extension/try-the-services/try-graphql-services.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/build-and-try/try-graphql-services',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/build-and-try/try-graphql-services'),
  },
  {
    id: 'vs-code-extension-ballerina-visualizer-view',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/implement-the-code/ballerina-visualizer-view.md',
    titleFallback: 'Ballerina Visualizer View',
    descriptionFallback:
      'Visually understand and develop Ballerina applications using the Ballerina Visualizer view in the VS Code extension.',
    slug: '/vs-code-extension/implement-the-code/ballerina-visualizer-view',
    targetPath: 'vs-code-extension/implement-the-code/ballerina-visualizer-view.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/vs-code-extension/visual-programming/ballerina-visualizer',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/visual-programming/ballerina-visualizer'),
  },
  {
    id: 'vs-code-extension-data-mapper',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/implement-the-code/data-mapper.md',
    titleFallback: 'Data Mapper',
    descriptionFallback:
      'Use the Data Mapper in the Ballerina VS Code extension to visually define and edit data transformations.',
    slug: '/vs-code-extension/implement-the-code/data-mapper',
    targetPath: 'vs-code-extension/implement-the-code/data-mapper.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/vs-code-extension/visual-programming/datamapper',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/visual-programming/datamapper'),
  },
  {
    id: 'vs-code-extension-entity-relationship-diagram-view',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/implement-the-code/entity-relationship-diagram-view.md',
    titleFallback: 'Entity Relationship Diagram View',
    descriptionFallback:
      'View bal persist entity models graphically in the Ballerina VS Code extension using the Entity Relationship Diagram view.',
    slug: '/vs-code-extension/implement-the-code/entity-relationship-diagram-view',
    targetPath: 'vs-code-extension/implement-the-code/entity-relationship-diagram-view.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/vs-code-extension/visual-programming/entity-relationship-diagram-view',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/visual-programming/entity-relationship-diagram-view'),
  },
  {
    id: 'vs-code-extension-convert-json-to-records',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/references/convert-json-to-records.md',
    titleFallback: 'Convert JSON to records',
    descriptionFallback:
      'Generate Ballerina record types from JSON using the VS Code extension.',
    slug: '/vs-code-extension/references/convert-json-to-records',
    targetPath: 'vs-code-extension/references/convert-json-to-records.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/record-editor',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/record-editor'),
  },
  {
    id: 'vs-code-extension-record-editor',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/references/record-editor.md',
    titleFallback: 'Record editor',
    descriptionFallback:
      'Create and edit Ballerina record types visually in the VS Code extension.',
    slug: '/vs-code-extension/references/record-editor',
    targetPath: 'vs-code-extension/references/record-editor.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/record-editor',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/record-editor'),
  },
  {
    id: 'vs-code-extension-release-notes-3.3.0',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/release-notes/version-3.3.0.md',
    titleFallback: 'Version 3.3.0',
    descriptionFallback:
      'Release notes for version 3.3.0 of the Ballerina VS Code extension.',
    slug: '/vs-code-extension/release-notes/version-3.3.0',
    targetPath: 'vs-code-extension/release-notes/version-3.3.0.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/release-notes/v-3.3.0',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/release-notes/v-3.3.0'),
  },
  {
    id: 'vs-code-extension-release-notes-4.0.0',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/release-notes/version-4.0.0.md',
    titleFallback: 'Version 4.0.0',
    descriptionFallback:
      'Release notes for version 4.0.0 of the Ballerina VS Code extension.',
    slug: '/vs-code-extension/release-notes/version-4.0.0',
    targetPath: 'vs-code-extension/release-notes/version-4.0.0.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/release-notes/v-4.0.0',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/release-notes/v-4.0.0'),
  },
  {
    id: 'vs-code-extension-release-notes-4.3.0',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/release-notes/version-4.3.0.md',
    titleFallback: 'Version 4.3.0',
    descriptionFallback:
      'Release notes for version 4.3.0 of the Ballerina VS Code extension.',
    slug: '/vs-code-extension/release-notes/version-4.3.0',
    targetPath: 'vs-code-extension/release-notes/version-4.3.0.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/release-notes/v-4.3.0',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/release-notes/v-4.3.0'),
  },
  {
    id: 'vs-code-extension-release-notes-4.4.0',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/release-notes/version-4.4.0.md',
    titleFallback: 'Version 4.4.0',
    descriptionFallback:
      'Release notes for version 4.4.0 of the Ballerina VS Code extension.',
    slug: '/vs-code-extension/release-notes/version-4.4.0',
    targetPath: 'vs-code-extension/release-notes/version-4.4.0.md',
  },
  {
    id: 'vs-code-extension-release-notes-4.5.0',
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/release-notes/version-4.5.0.md',
    titleFallback: 'Version 4.5.0',
    descriptionFallback:
      'Release notes for version 4.5.0 of the Ballerina VS Code extension.',
    slug: '/vs-code-extension/release-notes/version-4.5.0',
    targetPath: 'vs-code-extension/release-notes/version-4.5.0.md',
    imageSourceDir:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/vs-code-extension/img/release-notes/v-4.5.0',
    imageTargetDir: path.resolve('static/learn/images/vs-code-extension/release-notes/v-4.5.0'),
  },
];

const targetDocsDir = path.resolve('learn-tools-docs');

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
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description || '')}\nslug: ${JSON.stringify(
    slug,
  )}\n${yamlArray('keywords', keywords)}---\n`;
}

function cleanupContent(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')
    .replace(/<br\s*>/g, '<br />')
    .replace(/\]\(https:\/\/ballerina\.io\/downloads\/\)/g, '](/downloads/)')
    .replace(/\]\(\/downloads\/\)/g, '](/downloads/)')
    .replace(/\]\(\/learn\/package-references\/\)/g, '](/learn/package-references/)')
    .replace(/\]\(\/learn\/organize-ballerina-code\/#non-default-modules\)/g, '](/learn/organize-ballerina-code/#non-default-modules)')
    .replace(/\]\(\/learn\/bal-persist-overview\/\)/g, '](https://ballerina.io/learn/bal-persist-overview/)')
    .replace(
      /\]\(\/learn\/manage-data-persistence-with-bal-persist\/#model-your-data\)/g,
      '](https://ballerina.io/learn/manage-data-persistence-with-bal-persist/#model-your-data)',
    )
    .replace(
      /\]\(\/learn\/vs-code-extension\/debug-the-code\/debug-sessions\/#test-debug-sessions\)/g,
      '](https://ballerina.io/learn/vs-code-extension/debug-the-code/debug-sessions/#test-debug-sessions)',
    )
    .replace(/\]\(\/learn\/vs-code-extension\/debug-the-code\/debug-sessions\/\)/g, '](https://ballerina.io/learn/vs-code-extension/debug-the-code/debug-sessions/)')
    .replace(/class="cInlineImage-half"/g, 'class="cInlineImage-half"')
    .trim();
}

for (const page of pages) {
  const raw = fs.readFileSync(page.sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const cleanedContent = cleanupContent(content);

  const frontmatter = buildFrontmatter({
    title: data.title || page.titleFallback,
    description: data.description || data.intro || page.descriptionFallback,
    slug: page.slug,
    keywords: normalizeKeywords(data.keywords),
  });

  const output = `${frontmatter}\n${cleanedContent.trim()}\n`;

  fs.mkdirSync(targetDocsDir, {recursive: true});
  fs.rmSync(path.join(targetDocsDir, `${page.id}.md`), {force: true});
  fs.rmSync(path.join(targetDocsDir, `${page.id}.mdx`), {force: true});
  const targetPath = path.join(targetDocsDir, page.targetPath);
  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, output);
  fs.rmSync(targetPath.replace(/\.md$/, '.mdx'), {force: true});

  if (page.imageSourceDir && page.imageTargetDir) {
    fs.rmSync(page.imageTargetDir, {recursive: true, force: true});
    fs.mkdirSync(path.dirname(page.imageTargetDir), {recursive: true});
    fs.cpSync(page.imageSourceDir, page.imageTargetDir, {recursive: true});
  }

  console.log(`Imported ${path.basename(page.sourcePath)} -> ${path.relative(process.cwd(), targetPath)}`);
}
