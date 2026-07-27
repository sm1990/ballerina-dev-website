export type VsCodeFeature = {
  id: string;
  title: string;
  description: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  images: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
};

export const heroSlides = [
  '/images/vs-code-extension/vsc-slider-images-5.png',
  '/images/vs-code-extension/vsc-slider-images-4.png',
  '/images/vs-code-extension/vsc-slider-images-1.png',
  '/images/vs-code-extension/vsc-slider-images-3.png',
];

export const docsCtaHref = '/learn/vs-code-extension/get-started/';

const vsCodeFeatures: VsCodeFeature[] = [
  {
    id: 'ballerina-copilot',
    title: 'Ballerina Copilot',
    description:
      'Ballerina Copilot brings AI-assisted code generation, Q&A, test generation, and AI data mapping into the extension for faster integration development.',
    links: [
      {label: 'Install the extension', href: 'https://marketplace.visualstudio.com/items?itemName=WSO2.ballerina', external: true},
    ],
    images: [
      {src: '/images/vs-code-extension/ai_codegen.png', alt: 'Ballerina Copilot code generation', label: 'Code generation'},
      {src: '/images/vs-code-extension/ai_datamapper.png', alt: 'AI Data Mapper', label: 'AI Data Mapper'},
      {src: '/images/vs-code-extension/ai_ask.png', alt: 'Ask Ballerina', label: 'Ask Ballerina'},
      {src: '/images/vs-code-extension/ai_test.png', alt: 'AI test generation', label: 'Test generation'},
    ],
  },
  {
    id: 'build-and-try',
    title: 'Build and try',
    description:
      'Run Ballerina programs and execute tests directly inside VS Code using the extension’s built-in commands and views.',
    links: [
      {label: 'Run a program', href: '/learn/vs-code-extension/run-a-program/'},
      {label: 'Test the code', href: '/learn/vs-code-extension/test-the-code/'},
    ],
    images: [
      {src: '/learn/images/vs-code-extension/build-and-try/build-and-run/run-button.png', alt: 'Run a Ballerina program in VS Code', label: 'Run programs'},
      {src: '/learn/images/vs-code-extension/test-the-code/write-tests.png', alt: 'Run Ballerina tests in VS Code', label: 'Run tests'},
    ],
  },
  {
    id: 'design-the-application',
    title: 'Design the application',
    description:
      'Use the Ballerina Visualizer to design and understand service interactions, architecture flow, and project structure as your application grows.',
    links: [
      {label: 'Ballerina Visualizer View', href: '/learn/vs-code-extension/implement-the-code/ballerina-visualizer-view/'},
      {label: 'Data Mapper', href: '/learn/vs-code-extension/implement-the-code/data-mapper/'},
      {label: 'Entity Relationship Diagram View', href: '/learn/vs-code-extension/implement-the-code/entity-relationship-diagram-view/'},
    ],
    images: [
      {src: '/images/vs-code-extension/ai_project_diagram.png', alt: 'Project diagram', label: 'Project diagram'},
      {src: '/images/vs-code-extension/ai_project_flow_diag.png', alt: 'Flow diagram', label: 'Flow diagram'},
      {src: '/images/vs-code-extension/ai_project_comp.png', alt: 'Component view', label: 'Components'},
      {src: '/images/vs-code-extension/ai_project_main.png', alt: 'Main project view', label: 'Project view'},
    ],
  },
  {
    id: 'design-the-services',
    title: 'Design the services',
    description:
      'Model HTTP and GraphQL APIs visually and move quickly between design and implementation with the built-in designers.',
    links: [
      {label: 'HTTP API Designer', href: '/learn/vs-code-extension/design-the-services/http-api-designer/'},
      {label: 'GraphQL API Designer', href: '/learn/vs-code-extension/design-the-services/graphql-api-designer/'},
    ],
    images: [
      {src: '/images/vs-code-extension/http-designer.png', alt: 'HTTP API designer', label: 'HTTP API Designer'},
      {src: '/images/vs-code-extension/graphql-designer.png', alt: 'GraphQL API designer', label: 'GraphQL API Designer'},
    ],
  },
  {
    id: 'try-the-services',
    title: 'Try the services',
    description:
      'Run HTTP and GraphQL services directly from VS Code and exercise them using the built-in Try It support.',
    links: [
      {label: 'Try HTTP services', href: '/learn/vs-code-extension/try-the-services/try-http-services/'},
      {label: 'Try GraphQL services', href: '/learn/vs-code-extension/try-the-services/try-graphql-services/'},
    ],
    images: [
      {src: '/learn/images/vs-code-extension/build-and-try/try-http-services/http-try-it.png', alt: 'Try HTTP services in VS Code', label: 'HTTP services'},
      {src: '/learn/images/vs-code-extension/build-and-try/try-graphql-services/graphql-tryit.png', alt: 'Try GraphQL services in VS Code', label: 'GraphQL services'},
    ],
  },
  {
    id: 'write-the-code',
    title: 'Write the code',
    description:
      'Get rich editing support with completions, actions, navigation, and diagnostics tailored for Ballerina development.',
    links: [
      {label: 'Intellisense', href: '/learn/vs-code-extension/write-the-code/intellisense/'},
      {label: 'Code actions', href: '/learn/vs-code-extension/write-the-code/code-actions/'},
      {label: 'Code navigation', href: '/learn/vs-code-extension/write-the-code/code-navigation/'},
    ],
    images: [
      {src: '/images/vs-code-extension/code-completion.png', alt: 'Code completion', label: 'Code completion'},
      {src: '/images/vs-code-extension/code-actions.png', alt: 'Code actions', label: 'Code actions'},
      {src: '/images/vs-code-extension/go-to-references.png', alt: 'Go to references', label: 'Go to references'},
      {src: '/images/vs-code-extension/diagnostics.png', alt: 'Diagnostics', label: 'Diagnostics'},
    ],
  },
  {
    id: 'references',
    title: 'References',
    description:
      'Use the built-in editors and generators to work faster with Ballerina records and related source transformations.',
    links: [
      {label: 'Convert JSON to records', href: '/learn/vs-code-extension/references/convert-json-to-records/'},
      {label: 'Record editor', href: '/learn/vs-code-extension/references/record-editor/'},
    ],
    images: [
      {src: '/learn/images/vs-code-extension/record-editor/import-JSON.gif', alt: 'Create record types from JSON', label: 'Convert JSON'},
      {src: '/learn/images/vs-code-extension/record-editor/preview.png', alt: 'Record editor in VS Code', label: 'Record editor'},
    ],
  },
  {
    id: 'release-notes',
    title: 'Release notes',
    description:
      'Track extension changes and new capabilities across recent VS Code extension releases from the docs sidebar or landing page.',
    links: [
      {label: 'Version 4.5.0', href: '/learn/vs-code-extension/release-notes/version-4.5.0/'},
      {label: 'Version 4.4.0', href: '/learn/vs-code-extension/release-notes/version-4.4.0/'},
      {label: 'Version 4.3.0', href: '/learn/vs-code-extension/release-notes/version-4.3.0/'},
    ],
    images: [
      {src: '/learn/images/vs-code-extension/release-notes/v-4.5.0/doc-link.gif', alt: 'VS Code extension release notes 4.5.0', label: 'Version 4.5.0'},
      {src: '/learn/images/vs-code-extension/release-notes/v-4.3.0/graphql-filtering.gif', alt: 'VS Code extension release notes 4.3.0', label: 'Version 4.3.0'},
    ],
  },
];

export default vsCodeFeatures;
