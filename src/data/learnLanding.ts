export type LearnLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export type LearnSection = {
  id: string;
  title: string;
  description: string;
  links: LearnLink[];
  group?: 'top' | 'development-tutorials' | 'resources';
};

const live = 'https://ballerina.io';

const learnSections: LearnSection[] = [
  {
    id: 'get-started-with-integration',
    group: 'top',
    title: 'Get started with integration',
    description:
      'Start from the fundamentals, then branch into guided integration paths and practical reference material.',
    links: [
      {
        title: 'Get started',
        description: 'Install Ballerina, set it all up, and take it for a spin.',
        href: '/learn/get-started/',
      },
      {
        title: 'Pre-built integrations',
        description: 'Explore and try out a series of guided integration examples.',
        href: '/learn/pre-built-integrations/',
      },
      {
        title: 'Enterprise integration patterns',
        description: 'Usage patterns for implementing robust integrations.',
        href: '/learn/enterprise-integration-patterns/',
      },
      {
        title: 'Integration tutorials',
        description: 'Explore and try out a series of guided integration tutorials.',
        href: '/learn/integration/integration-tutorials/',
      },
      {
        title: 'Supported data formats',
        description: 'List of data formats supported by Ballerina.',
        href: '/learn/supported-data-formats/',
      },
      {
        title: 'Supported network integration protocols',
        description: 'List of network integration protocols supported by Ballerina.',
        href: '/learn/supported-network-protocols/',
      },
    ],
  },
  {
    id: 'integration-tools',
    group: 'top',
    title: 'Integration tools',
    description:
      'Generate clients, stubs, and schema-driven artifacts that speed up common integration workflows.',
    links: [
      {
        title: 'OpenAPI tool',
        description: 'Generate a Ballerina service and client skeletons for an OpenAPI contract.',
        href: '/learn/openapi-tool/',
      },
      {
        title: 'GraphQL tool',
        description:
          'Generate a GraphQL service skeleton for a given schema and generate a schema for a Ballerina GraphQL service.',
        href: '/learn/graphql-tool/',
      },
      {
        title: 'AsyncAPI tool',
        description: 'Generate a Ballerina service and listener skeletons for an AsyncAPI contract.',
        href: '/learn/asyncapi-tool/',
      },
      {
        title: 'gRPC tool',
        description:
          'Develop a service documented in Protocol Buffers by generating Ballerina service and client stubs.',
        href: '/learn/grpc-tool/',
      },
      {
        title: 'Health tool (FHIR/HL7)',
        description: 'FHIR/HL7 profile-to-client and stub generation tooling for Ballerina.',
        href: '/learn/health-tool/',
      },
      {
        title: 'EDI tool',
        description: 'Work with EDI files in Ballerina using the provided command-line tools.',
        href: '/learn/edi-tool/',
      },
      {
        title: 'WSDL tool',
        description: 'Generate Ballerina clients and records for a WSDL specification.',
        href: '/learn/wsdl-tool/',
      },
      {
        title: 'XSD tool',
        description: 'Generate Ballerina records for an XSD specification.',
        href: '/learn/xsd-tool/',
      },
    ],
  },
  {
    id: 'references',
    group: 'top',
    title: 'References',
    description:
      'Jump into examples, API references, specifications, and editor tooling from one place.',
    links: [
      {
        title: 'Ballerina By Example',
        description: 'Explore and try out a series of guided Ballerina examples.',
        href: '/learn/by-example/',
      },
      {
        title: 'Ballerina API docs',
        description: 'Refer to the Ballerina library API documentation.',
        href: 'https://lib.ballerina.io/',
        external: true,
      },
      {
        title: 'Ballerina specifications',
        description: 'Refer to the language, library, and platform specifications.',
        href: '/learn/references/ballerina-specifications/',
      },
      {
        title: 'Visual Studio Code extension',
        description: 'Features of the Ballerina Visual Studio Code extension.',
        href: '/learn/vs-code-extension/',
      },
    ],
  },
  {
    id: 'build-and-run',
    group: 'development-tutorials',
    title: 'Build and run',
    description:
      'Use the CLI, update tooling, shell, and CI/CD guidance to build and run Ballerina projects.',
    links: [
      {
        title: 'CLI commands',
        description: 'CLI commands of the bal tool.',
        href: '/learn/cli-commands/',
      },
      {
        title: 'Update tool',
        description: 'Maintain your Ballerina installation up to date with the latest patch and minor releases.',
        href: '/learn/update-tool/',
      },
      {
        title: 'Ballerina Shell',
        description: 'Details of the Read-Evaluate-Print Loop (REPL) for Ballerina.',
        href: '/learn/ballerina-shell/',
      },
      {
        title: 'Configure CI/CD for Ballerina projects',
        description: 'Learn how to configure a CI/CD pipeline for a Ballerina project.',
        href: '/learn/build-and-run/ci-cd/',
      },
    ],
  },
  {
    id: 'organize-source-code-and-dependencies',
    group: 'development-tutorials',
    title: 'Organize source code and dependencies',
    description:
      'Work with packages, modules, dependencies, workspaces, and project-wide code style conventions.',
    links: [
      {
        title: 'Organize Ballerina code',
        description: 'Basics of projects, packages, and modules.',
        href: '/learn/organize-ballerina-code/',
      },
      {
        title: 'Package references',
        description: 'References related to Ballerina packages.',
        href: '/learn/package-references/',
      },
      {
        title: 'Manage dependencies',
        description: 'Declare and manage dependencies and use the local repository.',
        href: '/learn/manage-dependencies/',
      },
      {
        title: 'Workspaces',
        description: 'Manage and organize Ballerina packages in a workspace.',
        href: '/learn/workspaces/',
      },
      {
        title: 'Style guide',
        description: 'Best practices to follow when formatting Ballerina code.',
        href: '/learn/style-guide/coding-conventions/',
      },
      {
        title: 'Customize formatting',
        description: 'Provide custom formatting options to the Ballerina formatter.',
        href: '/learn/customize-formatting/',
      },
    ],
  },
  {
    id: 'test-debug-and-document-the-code',
    group: 'development-tutorials',
    title: 'Test, debug, and document the code',
    description:
      'Write automated tests, debug applications, and generate documentation for Ballerina code.',
    links: [
      {
        title: 'Test Ballerina code',
        description: 'Write automated tests using the built-in test framework.',
        href: '/learn/test-ballerina-code/test-a-simple-function/',
      },
      {
        title: 'Debug Ballerina programs',
        description: 'Tooling support for troubleshooting Ballerina applications.',
        href: '/learn/debug-ballerina-programs/',
      },
      {
        title: 'Document Ballerina code',
        description: 'Generate documentation for the code.',
        href: '/learn/generate-code-documentation/',
      },
    ],
  },
  {
    id: 'configurability',
    group: 'development-tutorials',
    title: 'Configurability',
    description:
      'Configure module-level variables and provide values through files, environment variables, and command-line inputs.',
    links: [
      {
        title: 'Configure a sample Ballerina service',
        description: 'Configure values at runtime through configurable module-level variables.',
        href: '/learn/configure-a-sample-ballerina-service/',
      },
      {
        title: 'Provide values to configurable variables',
        description: 'Provide configurable values through configuration files, command-line arguments, and environment variables.',
        href: '/learn/provide-values-to-configurable-variables/',
      },
      {
        title: 'Configure values',
        description: 'Advanced use cases of configuring values using configurable variables.',
        href: '/learn/configure-values/',
      },
    ],
  },
  {
    id: 'deployment-guidelines',
    group: 'development-tutorials',
    title: 'Deployment guidelines',
    description:
      'Choose the right deployment approach for VMs, containers, Kubernetes, and serverless targets.',
    links: [
      {
        title: 'Deployment guidelines overview',
        description: 'Guidelines for Ballerina deployment in production.',
        href: '/learn/deployment-guidelines-overview/',
      },
      {
        title: 'Monolithic deployment',
        description: 'Guidelines for deployment in VMs.',
        href: '/learn/monolithic-deployment/',
      },
      {
        title: 'Containerized deployment',
        description: 'Guidelines for deployment in Docker and Kubernetes.',
        href: '/learn/containerized-deployment/',
      },
      {
        title: 'Serverless deployment',
        description: 'Guidelines for deployment in serverless environments.',
        href: '/learn/serverless-deployment/',
      },
    ],
  },
  {
    id: 'persistently-store-data',
    group: 'development-tutorials',
    title: 'Persistently store data',
    description:
      'Use bal persist to model, generate, and manage type-safe data access for supported stores.',
    links: [
      {
        title: 'Bal persist overview',
        description: 'How to simplify data persistence with bal persist.',
        href: '/learn/bal-persist-overview/',
      },
      {
        title: 'Data model',
        description: 'How to model and define data structures for efficient data persistence.',
        href: '/learn/persist-model/',
      },
      {
        title: 'CLI tool',
        description: 'How to use the tool for generating client code and types for the data model.',
        href: '/learn/persist-cli-tool/',
      },
      {
        title: 'Type-safe client API',
        description: 'Generated client, types, and their usages for managing data persistence.',
        href: '/learn/persist-client-api/',
      },
      {
        title: 'Supported data stores',
        description: 'Data stores for managing data persistence.',
        href: '/learn/supported-data-stores/',
      },
    ],
  },
  {
    id: 'observability',
    group: 'development-tutorials',
    title: 'Observability',
    description:
      'Instrument services and connect them to supported tracing, metrics, and monitoring backends.',
    links: [
      {
        title: 'Overview of Ballerina observability',
        description: 'Basics of the observability functionality provided for Ballerina programs.',
        href: '/learn/overview-of-ballerina-observability/',
      },
      {
        title: 'Supported observability tools and platforms',
        description: 'Observe Ballerina programs with different observability tools and platforms.',
        href: '/learn/supported-observability-tools-and-platforms/prometheus/',
      },
    ],
  },
  {
    id: 'java-interoperability',
    group: 'development-tutorials',
    title: 'Java interoperability',
    description:
      'Call Java code, generate bindings, and use the language features that make interop practical.',
    links: [
      {
        title: 'Call Java code from Ballerina',
        description: 'Call existing Java code from Ballerina.',
        href: '/learn/call-java-code-from-ballerina/',
      },
      {
        title: 'The BindGen tool',
        description: 'The CLI tool that generates Ballerina bindings for Java classes.',
        href: '/learn/the-bindgen-tool/',
      },
      {
        title: 'Ballerina FFI',
        description: 'Language features that enable Ballerina developers to call foreign code.',
        href: '/learn/ballerina-ffi/',
      },
    ],
  },
  {
    id: 'build-native-binaries-with-graalvm',
    group: 'development-tutorials',
    title: 'Build native binaries with GraalVM',
    description:
      'Build, package, and run native executables locally or in containerized environments.',
    links: [
      {
        title: 'GraalVM executable overview',
        description: 'The overview of GraalVM and the native executable.',
        href: '/learn/graalvm-executable-overview/',
      },
      {
        title: 'Build the GraalVM executable in a container',
        description: 'Build and pack the GraalVM executable in a container.',
        href: '/learn/build-the-executable-in-a-container/',
      },
      {
        title: 'Build the GraalVM executable locally',
        description: 'Build the GraalVM executable locally from Ballerina.',
        href: '/learn/build-the-executable-locally/',
      },
    ],
  },
  {
    id: 'reuse-code-with-ballerina-central',
    group: 'development-tutorials',
    title: 'Reuse code with Ballerina Central',
    description:
      'Publish packages, work behind proxies, and reuse shared code through Ballerina Central.',
    links: [
      {
        title: 'Publish packages to Ballerina Central',
        description: 'Publish your library package to Ballerina Central.',
        href: '/learn/publish-packages-to-ballerina-central/',
      },
      {
        title: 'Configure a network proxy',
        description: 'Perform operations with Ballerina Central over an HTTP proxy.',
        href: '/learn/configure-a-network-proxy/',
      },
      {
        title: 'Proxy Ballerina Central with a Maven Repository',
        description: 'Use a Maven repository as a proxy for Ballerina Central.',
        href: '/learn/proxy-ballerina-central-with-maven-repository/',
      },
    ],
  },
  {
    id: 'run-in-the-cloud',
    group: 'development-tutorials',
    title: 'Run in the cloud',
    description:
      'Generate deployment artifacts for Docker and Kubernetes directly from Ballerina code using code-to-cloud support.',
    links: [
      {
        title: 'Code to Cloud deployment',
        description: 'Generate and use Docker and Kubernetes deployment artifacts from your package.',
        href: '/learn/run-ballerina-programs-in-the-cloud/code-to-cloud-deployment/',
      },
    ],
  },
  {
    id: 'troubleshoot-the-runtime',
    group: 'development-tutorials',
    title: 'Troubleshoot the runtime',
    description:
      'Inspect runtime state and profile packages when you need to diagnose issues in production or development.',
    links: [
      {
        title: 'Strand dump tool',
        description: 'Dump the status of currently running strands.',
        href: '/learn/strand-dump-tool/',
      },
      {
        title: 'Ballerina Profiler (experimental)',
        description: 'Profile a Ballerina package and create a flame graph.',
        href: '/learn/ballerina-profiler/',
      },
    ],
  },
  {
    id: 'additional-tools',
    group: 'development-tutorials',
    title: 'Additional tools',
    description:
      'Use static analysis and package consolidation tools that support larger development workflows.',
    links: [
      {
        title: 'Scan tool',
        description: 'A static code analysis tool that checks Ballerina code for security issues and quality improvements.',
        href: '/learn/scan-tool/',
      },
      {
        title: 'Consolidate-packages tool',
        description: 'Generate code to consolidate Ballerina services.',
        href: '/learn/consolidate-packages-tool/',
      },
    ],
  },
  {
    id: 'featured-scenarios',
    group: 'resources',
    title: 'Featured scenarios',
    description:
      'Step through practical scenarios that show how Ballerina is used for services, integrations, data, AI, and deployment.',
    links: [
      {
        title: 'Write a RESTful API with Ballerina',
        description: 'Use Ballerina constructs to create RESTful APIs.',
        href: '/learn/write-a-restful-api-with-ballerina/',
      },
      {
        title: 'Write a gRPC service with Ballerina',
        description: 'Write and invoke a simple Ballerina gRPC service.',
        href: '/learn/write-a-grpc-service-with-ballerina/',
      },
      {
        title: 'Manage data persistence with bal persist',
        description: 'Use bal persist to simplify data persistence management.',
        href: '/learn/manage-data-persistence-with-bal-persist/',
      },
      {
        title: 'Write a GraphQL API with Ballerina',
        description: 'Write and invoke a simple Ballerina GraphQL service.',
        href: '/learn/write-a-graphql-api-with-ballerina/',
      },
      {
        title: 'Work with data using queries in Ballerina',
        description: 'Use query expressions to work with data.',
        href: '/learn/work-with-data-using-queries-in-ballerina/',
      },
      {
        title: 'Build a data service in Ballerina',
        description: 'Use Ballerina constructs to work with data services.',
        href: '/learn/build-a-data-service-in-ballerina/',
      },
      {
        title: 'Build a Change Data Capture (CDC) service in Ballerina',
        description: 'Use Ballerina constructs to work with change data capture services.',
        href: '/learn/build-a-change-data-capture-service-in-ballerina/',
      },
      {
        title: 'Work with Large Language Models (LLMs) using natural expressions',
        description: 'Use natural expressions to work with LLMs.',
        href: '/learn/work-with-llms-using-natural-expressions/',
      },
      {
        title: 'Deploy Ballerina on Kubernetes',
        description: 'Write, build, and deploy a Ballerina service on Kubernetes.',
        href: '/learn/deploy-ballerina-on-kubernetes/',
      },
      {
        title: 'Create your first connector with Ballerina',
        description: 'Generate custom connectors using the Ballerina OpenAPI tool.',
        href: '/learn/create-your-first-connector-with-ballerina/',
      },
    ],
  },
  {
    id: 'learn-the-language',
    group: 'resources',
    title: 'Learn the language',
    description:
      'Build language fluency across syntax, services, data, concurrency, and advanced general-purpose features.',
    links: [
      {
        title: 'Language basics',
        description: 'Get started with basics common to C-family programming languages.',
        href: '/learn/language-basics/',
      },
      {
        title: 'Network interaction',
        description: 'Provide and consume services using Ballerina.',
        href: '/learn/network-interaction/',
      },
      {
        title: 'Data',
        description: 'Work with data using Ballerina.',
        href: '/learn/data/',
      },
      {
        title: 'Concurrency',
        description: 'How concurrency and transactions are handled in Ballerina.',
        href: '/learn/concurrency/',
      },
      {
        title: 'Advanced general-purpose language features',
        description: 'Advanced language features that give you additional options when building programs.',
        href: '/learn/advanced-general-purpose-language-features/',
      },
    ],
  },
];

export default learnSections;
