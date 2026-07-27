import fs from 'node:fs';
import path from 'node:path';

const targetDocsDir = path.resolve('learn-tools-docs');

const pages = [
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/cloud-native.md',
    targetPath: 'why-ballerina/cloud-native.md',
    slug: '/why-ballerina/cloud-native',
    titleFallback: 'Cloud native',
    descriptionFallback:
      'See how the Ballerina programming language has built-in language constructs for network interactions and cloud support.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/flexibly-typed.md',
    targetPath: 'why-ballerina/flexibly-typed.md',
    slug: '/why-ballerina/flexibly-typed',
    titleFallback: 'Flexibly typed',
    descriptionFallback:
      "See how the Ballerina programming language's flexible type system helps developers work with networked resources in their code.",
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/data-oriented.md',
    targetPath: 'why-ballerina/data-oriented.md',
    slug: '/why-ballerina/data-oriented',
    titleFallback: 'Data oriented',
    descriptionFallback:
      'See how Ballerina provides first-class support for writing queries that process data.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/graphical.md',
    targetPath: 'why-ballerina/graphical.md',
    slug: '/why-ballerina/graphical',
    titleFallback: 'Graphical',
    descriptionFallback:
      'See why the support for a visual representation of the development experience lays the foundation for designing the syntax and semantics of the Ballerina programming language.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/concurrent.md',
    targetPath: 'why-ballerina/concurrent.md',
    slug: '/why-ballerina/concurrent',
    titleFallback: 'Concurrent',
    descriptionFallback:
      'Concurrency in Ballerina is enabled by strands, which are lightweight threads.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/why-ballerina/reliable-maintainable.md',
    targetPath: 'why-ballerina/reliable-maintainable.md',
    slug: '/why-ballerina/reliable-maintainable',
    titleFallback: 'Reliable, maintainable',
    descriptionFallback:
      'The sections below explain how the explicit error handling, static types, and concurrency safety combined with a familiar, readable syntax make programs reliable and maintainable.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-and-run/cli-commands.md',
    targetPath: 'development-tutorials/build-and-run/cli-commands.md',
    slug: '/cli-commands',
    titleFallback: 'CLI commands',
    descriptionFallback:
      'Learn all the command-line interface commands you need to build, test, run, and manage Ballerina projects.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-and-run/update-tool.md',
    targetPath: 'development-tutorials/build-and-run/update-tool.md',
    slug: '/update-tool',
    titleFallback: 'Update tool',
    descriptionFallback:
      'Maintain your Ballerina installation and keep it up to date with the latest releases.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-and-run/ballerina-shell.md',
    targetPath: 'development-tutorials/build-and-run/ballerina-shell.md',
    slug: '/ballerina-shell',
    titleFallback: 'Ballerina Shell',
    descriptionFallback:
      'Use the Ballerina REPL to evaluate snippets and explore language features interactively.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-and-run/cicd.md',
    targetPath: 'development-tutorials/build-and-run/cicd.md',
    slug: '/build-and-run/ci-cd',
    titleFallback: 'Configure CI/CD for Ballerina projects',
    descriptionFallback:
      'Learn how to configure a CI/CD pipeline for a Ballerina project.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/organize-ballerina-code.md',
    targetPath: 'development-tutorials/source-code-dependencies/organize-ballerina-code.md',
    slug: '/organize-ballerina-code',
    titleFallback: 'Organize Ballerina code',
    descriptionFallback:
      'Learn about packages and how to manage the growth of your source code.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/package-references.md',
    targetPath: 'development-tutorials/source-code-dependencies/package-references.md',
    slug: '/package-references',
    titleFallback: 'Package references',
    descriptionFallback:
      'Learn about the structure of a package directory and the purpose of each file in a package.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/manage-dependencies.md',
    targetPath: 'development-tutorials/source-code-dependencies/manage-dependencies.md',
    slug: '/manage-dependencies',
    titleFallback: 'Manage dependencies',
    descriptionFallback:
      'Learn about dependencies, imports, and how they can be used in your package.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/workspaces.md',
    targetPath: 'development-tutorials/source-code-dependencies/workspaces.md',
    slug: '/workspaces',
    titleFallback: 'Workspaces',
    descriptionFallback:
      'Organize related packages in a workspace and manage multi-package development in one directory structure.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-central/publish-packages-to-ballerina-central.md',
    targetPath: 'development-tutorials/ballerina-central/publish-packages-to-ballerina-central.md',
    slug: '/publish-packages-to-ballerina-central',
    titleFallback: 'Publish packages to Ballerina Central',
    descriptionFallback:
      'Learn how to publish packages to Ballerina Central and work with published packages.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-central/configure-a-network-proxy.md',
    targetPath: 'development-tutorials/ballerina-central/configure-a-network-proxy.md',
    slug: '/configure-a-network-proxy',
    titleFallback: 'Configure a network proxy',
    descriptionFallback:
      'Configure proxy settings so Ballerina tools can access Central and related package services.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-central/proxy-ballerina-central-with-maven-repository.md',
    targetPath: 'development-tutorials/ballerina-central/proxy-ballerina-central-with-maven-repository.md',
    slug: '/proxy-ballerina-central-with-maven-repository',
    titleFallback: 'Proxy Ballerina Central with a Maven repository',
    descriptionFallback:
      'Configure a Maven repository manager to act as a caching proxy in front of Ballerina Central.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/coding-conventions.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/coding-conventions.md',
    slug: '/style-guide/coding-conventions',
    titleFallback: 'Coding conventions',
    descriptionFallback:
      'Learn the standard coding style used by the Ballerina community and formatting tools.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/top-level-definitions.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/top-level-definitions.md',
    slug: '/top-level-definitions',
    titleFallback: 'Top-level definitions',
    descriptionFallback:
      'Learn the coding conventions used for top-level definitions in Ballerina source files.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/operators-keywords-and-types.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/operators-keywords-and-types.md',
    slug: '/operators-keywords-and-types',
    titleFallback: 'Operators, keywords, and types',
    descriptionFallback:
      'Learn the coding conventions used for operators, keywords, and types in Ballerina.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/statements.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/statements.md',
    slug: '/statements',
    titleFallback: 'Statements',
    descriptionFallback:
      'Learn the coding conventions used for statements in Ballerina source code.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/expressions.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/expressions.md',
    slug: '/expressions',
    titleFallback: 'Expressions',
    descriptionFallback:
      'Learn the coding conventions used for expressions in Ballerina source code.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/style-guide/annotations-documentation-and-comments.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/annotations-documentation-and-comments.md',
    slug: '/annotations-documentation-comments',
    titleFallback: 'Annotations, documentation and comments',
    descriptionFallback:
      'Learn the coding conventions used for annotations, documentation, and comments in Ballerina.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/source-code-dependencies/customize-formatting.md',
    targetPath: 'development-tutorials/source-code-dependencies/style-guide/customize-formatting.md',
    slug: '/customize-formatting',
    titleFallback: 'Customize formatting',
    descriptionFallback:
      'Provide custom formatter configuration so projects can enforce consistent code style.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-a-graalvm-executable/graalvm-executable-overview.md',
    targetPath: 'development-tutorials/build-a-graalvm-executable/graalvm-executable-overview.md',
    slug: '/graalvm-executable-overview',
    titleFallback: 'GraalVM executable overview',
    descriptionFallback:
      'Understand GraalVM executables and how Ballerina supports native image generation.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-a-graalvm-executable/build-the-executable-in-a-container.md',
    targetPath: 'development-tutorials/build-a-graalvm-executable/build-the-executable-in-a-container.md',
    slug: '/build-the-executable-in-a-container',
    titleFallback: 'Build the GraalVM executable in a container',
    descriptionFallback:
      'Compile a Ballerina application to a native executable and package it into a container image.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/build-a-graalvm-executable/build-the-executable-locally.md',
    targetPath: 'development-tutorials/build-a-graalvm-executable/build-the-executable-locally.md',
    slug: '/build-the-executable-locally',
    titleFallback: 'Build the GraalVM executable locally',
    descriptionFallback:
      'Compile and test a GraalVM native executable in a local development environment.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/additional-tools/consolidate-packages-tool.md',
    targetPath: 'development-tutorials/additional-tools/consolidate-packages-tool.md',
    slug: '/consolidate-packages-tool',
    titleFallback: 'Consolidate-packages tool',
    descriptionFallback:
      'Use the consolidate-packages tool to combine multiple Ballerina services into a single executable.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/configurability/configure-a-sample-ballerina-service.md',
    targetPath: 'development-tutorials/configurability/configure-a-sample-ballerina-service.md',
    slug: '/configure-a-sample-ballerina-service',
    titleFallback: 'Configure a sample Ballerina service',
    descriptionFallback:
      'Configure module-level variables at runtime through configuration files and other inputs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/configurability/provide-values-to-configurable-variables.md',
    targetPath: 'development-tutorials/configurability/provide-values-to-configurable-variables.md',
    slug: '/provide-values-to-configurable-variables',
    titleFallback: 'Provide values to configurable variables',
    descriptionFallback:
      'Provide configurable values through files, environment variables, and command-line arguments.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/configurability/configure-values.md',
    targetPath: 'development-tutorials/configurability/configure-values.md',
    slug: '/configure-values',
    titleFallback: 'Configure values',
    descriptionFallback:
      'Explore advanced configurable-variable use cases and module-aware configuration patterns.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/deployment-guide/deployment-guidelines-overview.md',
    targetPath: 'development-tutorials/deployment-guide/deployment-guidelines-overview.md',
    slug: '/deployment-guidelines-overview',
    titleFallback: 'Deployment guidelines overview',
    descriptionFallback:
      'Review the main deployment approaches, configurations, and security considerations for production Ballerina workloads.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/deployment-guide/monolithic-deployment.md',
    targetPath: 'development-tutorials/deployment-guide/monolithic-deployment.md',
    slug: '/monolithic-deployment',
    titleFallback: 'Monolithic deployment',
    descriptionFallback:
      'Deploy Ballerina services in traditional server-based environments without containerization.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/deployment-guide/containerized-deployment.md',
    targetPath: 'development-tutorials/deployment-guide/containerized-deployment.md',
    slug: '/containerized-deployment',
    titleFallback: 'Containerized deployment',
    descriptionFallback:
      'Generate container and Kubernetes artifacts from Ballerina code for cloud-native deployments.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/deployment-guide/serverless-deployment.md',
    targetPath: 'development-tutorials/deployment-guide/serverless-deployment.md',
    slug: '/serverless-deployment',
    titleFallback: 'Serverless deployment',
    descriptionFallback:
      'Deploy Ballerina functions to serverless platforms such as AWS Lambda and Azure Functions.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/deployment-guide/keystore-truststore.md',
    targetPath: 'development-tutorials/deployment-guide/keystore-truststore.md',
    slug: '/keystore-truststore',
    titleFallback: 'Keystores and truststores',
    descriptionFallback:
      'Configure keystores and truststores for secure communication in production deployments.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/run-in-the-cloud/code-to-cloud-deployment.md',
    targetPath: 'development-tutorials/run-in-the-cloud/code-to-cloud-deployment.md',
    slug: '/run-ballerina-programs-in-the-cloud/code-to-cloud-deployment',
    titleFallback: 'Code to Cloud deployment',
    descriptionFallback:
      'Generate cloud deployment artifacts from Ballerina code for Docker and Kubernetes targets.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/debug-ballerina-programs.md',
    targetPath: 'development-tutorials/test-document-the-code/debug-ballerina-programs.md',
    slug: '/debug-ballerina-programs',
    titleFallback: 'Debug Ballerina programs',
    descriptionFallback:
      'Use the Ballerina VS Code extension and debugger features to inspect and troubleshoot program execution.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/generate-code-documentation.md',
    targetPath: 'development-tutorials/test-document-the-code/generate-code-documentation.md',
    slug: '/generate-code-documentation',
    titleFallback: 'Generate code documentation',
    descriptionFallback:
      'Generate HTML documentation for Ballerina packages using Ballerina Flavored Markdown and the bal doc command.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/test-a-simple-function.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/test-a-simple-function.md',
    slug: '/test-ballerina-code/test-a-simple-function',
    titleFallback: 'Test a simple function',
    descriptionFallback:
      'Get started with the Ballerina test framework by writing and running a simple function test.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/write-tests.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/write-tests.md',
    slug: '/test-ballerina-code/write-tests',
    titleFallback: 'Write tests',
    descriptionFallback:
      'Use the Ballerina test framework annotations and assertions to define and organize tests.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/structure-tests.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/structure-tests.md',
    slug: '/test-ballerina-code/structure-tests',
    titleFallback: 'Structure tests',
    descriptionFallback:
      'Structure Ballerina test suites using modules, tests directories, resources, and configuration files.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/configure-tests.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/configure-tests.md',
    slug: '/test-ballerina-code/configure-tests',
    titleFallback: 'Configure tests',
    descriptionFallback:
      'Configure setup, teardown, and execution behavior for Ballerina test suites.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/code-coverage-and-reporting.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/code-coverage-and-reporting.md',
    slug: '/test-ballerina-code/code-coverage-and-reporting',
    titleFallback: 'Code coverage and reporting',
    descriptionFallback:
      'Generate test reports and code coverage output for Ballerina test runs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/define-data-driven-tests.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/define-data-driven-tests.md',
    slug: '/test-ballerina-code/define-data-driven-tests',
    titleFallback: 'Define data-driven tests',
    descriptionFallback:
      'Use data providers to define and run data-driven test cases in Ballerina.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/define-test-groups.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/define-test-groups.md',
    slug: '/test-ballerina-code/define-test-groups',
    titleFallback: 'Define test groups',
    descriptionFallback:
      'Group Ballerina tests and control execution by selecting or excluding groups.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/test-services-and-clients.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/test-services-and-clients.md',
    slug: '/test-ballerina-code/test-services-and-clients',
    titleFallback: 'Test services and clients',
    descriptionFallback:
      'Test Ballerina services and clients by sending requests and asserting responses.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/mocking.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/mocking.md',
    slug: '/test-ballerina-code/mocking',
    titleFallback: 'Mocking',
    descriptionFallback:
      'Mock functions and objects in Ballerina tests to isolate dependencies and external endpoints.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/execute-tests.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/execute-tests.md',
    slug: '/test-ballerina-code/execute-tests',
    titleFallback: 'Execute tests',
    descriptionFallback:
      'Run Ballerina tests with different execution options and understand setup and teardown behavior.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/test-document-the-code/test-ballerina-code/execute-tests-in-parallel.md',
    targetPath: 'development-tutorials/test-document-the-code/test-ballerina-code/execute-tests-in-parallel.md',
    slug: '/test-ballerina-code/execute-tests-in-parallel',
    titleFallback: 'Execute tests in parallel',
    descriptionFallback:
      'Run Ballerina tests in parallel to reduce execution time in larger codebases.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/troubleshoot-the-runtime/strand-dump-tool.md',
    targetPath: 'development-tutorials/troubleshoot-the-runtime/strand-dump-tool.md',
    slug: '/strand-dump-tool',
    titleFallback: 'Strand dump tool',
    descriptionFallback:
      'Inspect the currently running strands of a Ballerina program to troubleshoot runtime issues.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/troubleshoot-the-runtime/ballerina-profiler.md',
    targetPath: 'development-tutorials/troubleshoot-the-runtime/ballerina-profiler.md',
    slug: '/ballerina-profiler',
    titleFallback: 'Ballerina Profiler',
    descriptionFallback:
      'Profile Ballerina packages and inspect flame graphs to find runtime bottlenecks.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/static-code-analysis/scan-tool.md',
    targetPath: 'development-tutorials/static-code-analysis/scan-tool.md',
    slug: '/scan-tool',
    titleFallback: 'Scan tool',
    descriptionFallback:
      'Perform static code analysis on Ballerina projects to identify code smells, bugs, and vulnerabilities.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/static-code-analysis/scan-rules.md',
    targetPath: 'development-tutorials/static-code-analysis/scan-rules.md',
    slug: '/scan-rules',
    titleFallback: 'Scan rules',
    descriptionFallback:
      'Explore the static analysis rules used by the Ballerina scan tool and their compliant patterns.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/java-interoperability/call-java-code-from-ballerina.md',
    targetPath: 'development-tutorials/java-interoperability/call-java-code-from-ballerina.md',
    slug: '/call-java-code-from-ballerina',
    titleFallback: 'Call Java code from Ballerina',
    descriptionFallback:
      'Use Java libraries from Ballerina and generate bindings for the APIs you need.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/java-interoperability/ballerina-ffi.md',
    targetPath: 'development-tutorials/java-interoperability/ballerina-ffi.md',
    slug: '/ballerina-ffi',
    titleFallback: 'Ballerina FFI',
    descriptionFallback:
      'Learn the language features that make it possible to invoke foreign code from Ballerina.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/java-interoperability/the-bindgen-tool.md',
    targetPath: 'development-tutorials/java-interoperability/the-bindgen-tool.md',
    slug: '/the-bindgen-tool',
    titleFallback: 'The Bindgen tool',
    descriptionFallback:
      'Generate Ballerina bindings for Java APIs using the Bindgen CLI tool.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/overview-of-ballerina-observability.md',
    targetPath: 'development-tutorials/observability/overview-of-ballerina-observability.md',
    slug: '/overview-of-ballerina-observability',
    titleFallback: 'Overview of Ballerina observability',
    descriptionFallback:
      'Understand the observability model in Ballerina and how to expose metrics, traces, and logs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/prometheus.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/prometheus.md',
    slug: '/supported-observability-tools-and-platforms/prometheus',
    titleFallback: 'Observe metrics using Prometheus',
    descriptionFallback:
      'Set up Prometheus and Grafana to collect and visualize Ballerina metrics.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/jaeger.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/jaeger.md',
    slug: '/supported-observability-tools-and-platforms/jaeger',
    titleFallback: 'Observe tracing using Jaeger',
    descriptionFallback:
      'Configure Jaeger to collect and inspect distributed traces emitted by Ballerina programs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/zipkin.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/zipkin.md',
    slug: '/supported-observability-tools-and-platforms/zipkin',
    titleFallback: 'Observe tracing using Zipkin',
    descriptionFallback:
      'Send Ballerina tracing data to Zipkin and inspect trace flows visually.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/datadog.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/datadog.md',
    slug: '/supported-observability-tools-and-platforms/datadog',
    titleFallback: 'Observe Ballerina programs with Datadog',
    descriptionFallback:
      'Send Ballerina metrics and traces to Datadog for dashboards and trace analysis.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/new-relic.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/new-relic.md',
    slug: '/supported-observability-tools-and-platforms/new-relic',
    titleFallback: 'Observe Ballerina programs with New Relic',
    descriptionFallback:
      'Integrate Ballerina metrics and tracing with New Relic observability services.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/elastic-stack.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/elastic-stack.md',
    slug: '/supported-observability-tools-and-platforms/elastic-stack',
    titleFallback: 'Observe logs using Elastic Stack',
    descriptionFallback:
      'Ship and analyze Ballerina logs with the Elastic Stack.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/opensearch.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/opensearch.md',
    slug: '/supported-observability-tools-and-platforms/opensearch',
    titleFallback: 'Observe Ballerina programs with OpenSearch',
    descriptionFallback:
      'Use OpenSearch to analyze Ballerina traces, logs, and metrics.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/observability/supported-observability-tools-and-platforms/moesif.md',
    targetPath:
      'development-tutorials/observability/supported-observability-tools-and-platforms/moesif.md',
    slug: '/supported-observability-tools-and-platforms/moesif',
    titleFallback: 'Observe Ballerina programs with Moesif',
    descriptionFallback:
      'Track API traffic, metrics, and logs from Ballerina services using Moesif.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/bal-persist-overview.md',
    targetPath: 'development-tutorials/ballerina-persist/bal-persist-overview.md',
    slug: '/bal-persist-overview',
    titleFallback: 'Bal persist overview',
    descriptionFallback:
      'Use bal persist to model your data and generate type-safe persistence layers for supported stores.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/persist-model.md',
    targetPath: 'development-tutorials/ballerina-persist/persist-model.md',
    slug: '/persist-model',
    titleFallback: 'Data model',
    descriptionFallback:
      'Define entity models and relationships for bal persist data access.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/persist-cli-tool.md',
    targetPath: 'development-tutorials/ballerina-persist/persist-cli-tool.md',
    slug: '/persist-cli-tool',
    titleFallback: 'CLI tool',
    descriptionFallback:
      'Use the bal persist CLI to initialize models and generate persistence code.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/persist-client-api.md',
    targetPath: 'development-tutorials/ballerina-persist/persist-client-api.md',
    slug: '/persist-client-api',
    titleFallback: 'Type-safe client API',
    descriptionFallback:
      'Understand the generated bal persist client APIs and the CRUD operations they expose.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/persist-introspection.md',
    targetPath: 'development-tutorials/ballerina-persist/persist-introspection.md',
    slug: '/persist-introspection',
    titleFallback: 'Persist introspection',
    descriptionFallback:
      'Introspect existing databases and generate bal persist model definitions from them.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/development-tutorials/ballerina-persist/supported-data-stores.md',
    targetPath: 'development-tutorials/ballerina-persist/supported-data-stores.md',
    slug: '/supported-data-stores',
    titleFallback: 'Supported data stores',
    descriptionFallback:
      'Compare the data stores supported by bal persist and their type mappings.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/manage-data-persistence-with-bal-persist.md',
    targetPath: 'resources/featured-scenarios/manage-data-persistence-with-bal-persist.md',
    slug: '/manage-data-persistence-with-bal-persist',
    titleFallback: 'Manage data persistence with bal persist',
    descriptionFallback:
      'Build a data persistence workflow with bal persist, an entity model, and generated client APIs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/write-a-restful-api-with-ballerina.md',
    targetPath: 'resources/featured-scenarios/write-a-restful-api-with-ballerina.md',
    slug: '/write-a-restful-api-with-ballerina',
    titleFallback: 'Write a RESTful API with Ballerina',
    descriptionFallback:
      'Build a RESTful API in Ballerina using services, resources, and a package-based project layout.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/write-a-grpc-service-with-ballerina.md',
    targetPath: 'resources/featured-scenarios/write-a-grpc-service-with-ballerina.md',
    slug: '/write-a-grpc-service-with-ballerina',
    titleFallback: 'Write a gRPC service with Ballerina',
    descriptionFallback:
      'Build and run a gRPC service in Ballerina using the generated service and client stubs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/write-a-graphql-api-with-ballerina.md',
    targetPath: 'resources/featured-scenarios/write-a-graphql-api-with-ballerina.md',
    slug: '/write-a-graphql-api-with-ballerina',
    titleFallback: 'Write a GraphQL API with Ballerina',
    descriptionFallback:
      'Create a GraphQL API in Ballerina with a package-based project structure and generated schema support.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/work-with-data-using-queries-in-ballerina.md',
    targetPath: 'resources/featured-scenarios/work-with-data-using-queries-in-ballerina.md',
    slug: '/work-with-data-using-queries-in-ballerina',
    titleFallback: 'Work with data using queries in Ballerina',
    descriptionFallback:
      'Use Ballerina query expressions and table support to read, filter, and transform structured data.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/build-a-data-service-in-ballerina.md',
    targetPath: 'resources/featured-scenarios/build-a-data-service-in-ballerina.md',
    slug: '/build-a-data-service-in-ballerina',
    titleFallback: 'Build a data service in Ballerina',
    descriptionFallback:
      'Build a database-backed data service using Ballerina, configurable values, and persistent storage.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/build-a-change-data-capture-service-in-ballerina.md',
    targetPath: 'resources/featured-scenarios/build-a-change-data-capture-service-in-ballerina.md',
    slug: '/build-a-change-data-capture-service-in-ballerina',
    titleFallback: 'Build a change data capture service in Ballerina',
    descriptionFallback:
      'Build a CDC service in Ballerina to process data changes and stream them to downstream systems.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/work-with-llms-using-natural-expressions.md',
    targetPath: 'resources/featured-scenarios/work-with-llms-using-natural-expressions.md',
    slug: '/work-with-llms-using-natural-expressions',
    titleFallback: 'Work with Large Language Models (LLMs) using natural expressions',
    descriptionFallback:
      'Use Ballerina natural expressions and tooling support to build applications powered by LLMs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/deploy-ballerina-on-kubernetes.md',
    targetPath: 'resources/featured-scenarios/deploy-ballerina-on-kubernetes.md',
    slug: '/deploy-ballerina-on-kubernetes',
    titleFallback: 'Deploy Ballerina on Kubernetes',
    descriptionFallback:
      'Deploy Ballerina applications on Kubernetes using code to cloud and the generated deployment artifacts.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/featured-scenarios/create-your-first-connector-with-ballerina.md',
    targetPath: 'resources/featured-scenarios/create-your-first-connector-with-ballerina.md',
    slug: '/create-your-first-connector-with-ballerina',
    titleFallback: 'Create your first connector with Ballerina',
    descriptionFallback:
      'Generate, shape, test, and publish a connector package for an external service using Ballerina tools.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration/supported-data-formats.md',
    targetPath: 'integration/supported-data-formats.md',
    slug: '/supported-data-formats',
    titleFallback: 'Supported data formats',
    descriptionFallback:
      'Review the data formats Ballerina supports for integration workloads and where to find the related examples and APIs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration/supported-network-protocols.md',
    targetPath: 'integration/supported-network-protocols.md',
    slug: '/supported-network-protocols',
    titleFallback: 'Supported network integration protocols',
    descriptionFallback:
      'Review the network protocols Ballerina supports for integration use cases and the related examples and libraries.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tutorials/sending-a-message-to-a-service.md',
    targetPath: 'integration/integration-tutorials/sending-a-message-to-a-service.md',
    slug: '/sending-a-message-to-a-service',
    titleFallback: 'Sending a message to a service',
    descriptionFallback:
      'Build a simple integration service that accepts requests, calls a backend service, and returns the result.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tutorials/sending-emails-from-a-service.md',
    targetPath: 'integration/integration-tutorials/sending-emails-from-a-service.md',
    slug: '/sending-emails-from-a-service',
    titleFallback: 'Sending emails from a service',
    descriptionFallback:
      'Build a service that coordinates backend calls and sends confirmation emails using Ballerina email support.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tutorials/service-orchestration.md',
    targetPath: 'integration/integration-tutorials/service-orchestration.md',
    slug: '/service-orchestration',
    titleFallback: 'Service orchestration',
    descriptionFallback:
      'Build a service that orchestrates multiple backend calls to expose a single integration endpoint.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tutorials/content-based-message-routing.md',
    targetPath: 'integration/integration-tutorials/content-based-message-routing.md',
    slug: '/content-based-message-routing',
    titleFallback: 'Content-based message routing',
    descriptionFallback:
      'Build an integration flow that routes requests to different backends based on the content of the payload.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/integration-tutorials/transforming-message-formats.md',
    targetPath: 'integration/integration-tutorials/transforming-message-formats.md',
    slug: '/transforming-message-formats',
    titleFallback: 'Transforming message formats',
    descriptionFallback:
      'Build an integration flow that transforms request payloads before forwarding them to downstream services.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/learn-the-language/language-basics.md',
    targetPath: 'resources/learn-the-language/language-basics.md',
    slug: '/language-basics',
    titleFallback: 'Language basics',
    descriptionFallback:
      'Get started with basics that are common to modern C-family programming languages.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/learn-the-language/network-interaction.md',
    targetPath: 'resources/learn-the-language/network-interaction.md',
    slug: '/network-interaction',
    titleFallback: 'Network interaction',
    descriptionFallback:
      'Learn the distinctive network-centric language features that make Ballerina suitable for cloud applications.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/learn-the-language/data.md',
    targetPath: 'resources/learn-the-language/data.md',
    slug: '/data',
    titleFallback: 'Data',
    descriptionFallback:
      'Learn Ballerina data modeling concepts including records, tables, JSON, XML, and query-driven transformations.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/learn-the-language/concurrency.md',
    targetPath: 'resources/learn-the-language/concurrency.md',
    slug: '/concurrency',
    titleFallback: 'Concurrency',
    descriptionFallback:
      'Learn about strands, workers, locks, and the concurrency model used to build responsive Ballerina programs.',
  },
  {
    sourcePath:
      '/Users/sarani/Downloads/codebase/ballerina-dev-website/swan-lake/resources/learn-the-language/advanced-general-purpose-language-features.md',
    targetPath: 'resources/learn-the-language/advanced-general-purpose-language-features.md',
    slug: '/advanced-general-purpose-language-features',
    titleFallback: 'Advanced, general-purpose language features',
    descriptionFallback:
      'Explore advanced language capabilities such as transactions, type system features, and reusable abstractions.',
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
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')
    .replace(/<br\s*>/g, '<br />')
    .replace(/<(https?:\/\/[^>\s]+)>/g, '[$1]($1)')
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
    .replace(/<code>([\s\S]*?)<\/code>/g, (_, inner) => {
      const escaped = inner
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;');
      return `<code>${escaped}</code>`;
    })
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\sstyle='[^']*'/g, '')
    .replace(/<td([^>]*)>([\s\S]*?)<\/td>/g, (_, attrs, cellContent) => {
      const normalized = cellContent.replace(/\s*\n\s*/g, ' ').trim();
      return `<td${attrs}>${normalized}</td>`;
    })
    .replace(/\]\(\/learn\/get-started\)/g, '](/learn/get-started/)')
    .replace(/\]\(\/learn\/installation-options\)/g, '](/learn/install-ballerina/installation-options/)')
    .replace(/\]\(\/learn\/language-basics\)/g, '](/learn/language-basics/)')
    .replace(/\]\(\/learn\/network-interaction\/\)/g, '](/learn/network-interaction/)')
    .replace(/\]\(\/learn\/organize-ballerina-code\)/g, '](/learn/organize-ballerina-code/)')
    .replace(/\]\(\/learn\/package-references\/\)/g, '](/learn/package-references/)')
    .replace(/\]\(\/learn\/publish-packages-to-ballerina-central\/\)/g, '](/learn/publish-packages-to-ballerina-central/)')
    .replace(/\]\(\/learn\/configure-a-network-proxy\/\)/g, '](/learn/configure-a-network-proxy/)')
    .replace(/\]\(\/learn\/manage-dependencies\/\)/g, '](/learn/manage-dependencies/)')
    .replace(/\]\(\/learn\/style-guide\/coding-conventions\/\)/g, '](/learn/style-guide/coding-conventions/)')
    .replace(/\]\(\/learn\/update-tool\/\)/g, '](/learn/update-tool/)')
    .replace(/\]\(\/learn\/update-tool\/#using-the-update-tool\)/g, '](/learn/update-tool/#use-the-update-tool)')
    .replace(/\]\(\/learn\/cli-commands\/\)/g, '](/learn/cli-commands/)')
    .replace(/\]\(\/learn\/graalvm-executable-overview\/\)/g, '](/learn/graalvm-executable-overview/)')
    .replace(/\]\(\/learn\/build-the-executable-in-a-container\/\)/g, '](/learn/build-the-executable-in-a-container/)')
    .replace(/\]\(\/learn\/build-the-executable-locally\/\)/g, '](/learn/build-the-executable-locally/)')
    .replace(/\]\(\/learn\/consolidate-packages-tool\/\)/g, '](/learn/consolidate-packages-tool/)')
    .replace(/\]\(\/learn\/consolidate-packages-tool\)/g, '](/learn/consolidate-packages-tool/)')
    .replace(/\]\(\/learn\/call-java-code-from-ballerina\/\)/g, '](/learn/call-java-code-from-ballerina/)')
    .replace(/\]\(\/learn\/call-java-code-from-ballerina\/#step-1---write-the-java-code\)/g, '](/learn/call-java-code-from-ballerina/#step-1---write-the-java-code)')
    .replace(/\]\(\/learn\/call-java-code-from-ballerina\/#step-3---generate-the-ballerina-bindings\)/g, '](/learn/call-java-code-from-ballerina/#step-3---generate-the-ballerina-bindings)')
    .replace(/\]\(\/learn\/ballerina-ffi\/?\)/g, '](/learn/ballerina-ffi/)')
    .replace(/\]\(\/learn\/the-bindgen-tool\/\)/g, '](/learn/the-bindgen-tool/)')
    .replace(/\]\(\/learn\/package-references\/#package-layout\)/g, '](/learn/package-references/#package-layout)')
    .replace(/\]\(\/learn\/manage-dependencies\/#manage-platform-dependencies\)/g, '](/learn/manage-dependencies/#manage-platform-dependencies)')
    .replace(/\]\(\/learn\/style-guide\/top-level-definitions\/\)/g, '](/learn/top-level-definitions/)')
    .replace(/\]\(\/learn\/style-guide\/top-level-definitions\/#function-definition\)/g, '](/learn/top-level-definitions/#function-definition)')
    .replace(/\]\(\/learn\/style-guide\/operators-keywords-and-types\/\)/g, '](/learn/operators-keywords-and-types/)')
    .replace(/\]\(\/learn\/style-guide\/statements\/\)/g, '](/learn/statements/)')
    .replace(/\]\(\/learn\/style-guide\/expressions\/\)/g, '](/learn/expressions/)')
    .replace(/\]\(\/learn\/style-guide\/expressions\/#record-literal\)/g, '](/learn/expressions/#record-literal)')
    .replace(/\]\(\/learn\/style-guide\/annotations-documentation-and-comments\/\)/g, '](/learn/annotations-documentation-comments/)')
    .replace(/\]\(\/learn\/overview-of-ballerina-observability\/#example-observe-a-ballerina-service\)/g, '](/learn/overview-of-ballerina-observability/#example-observe-a-ballerina-service)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/prometheus\/?\)/g, '](/learn/supported-observability-tools-and-platforms/prometheus/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/jaeger\/?\)/g, '](/learn/supported-observability-tools-and-platforms/jaeger/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/zipkin\/?\)/g, '](/learn/supported-observability-tools-and-platforms/zipkin/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/new-relic\/?\)/g, '](/learn/supported-observability-tools-and-platforms/new-relic/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/datadog\/?\)/g, '](/learn/supported-observability-tools-and-platforms/datadog/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/elastic-stack\/?\)/g, '](/learn/supported-observability-tools-and-platforms/elastic-stack/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/opensearch\/?\)/g, '](/learn/supported-observability-tools-and-platforms/opensearch/)')
    .replace(/\]\(\/learn\/supported-observability-tools-and-platforms\/moesif\/?\)/g, '](/learn/supported-observability-tools-and-platforms/moesif/)')
    .replace(/\]\(\/learn\/bal-persist-overview\/\)/g, '](/learn/bal-persist-overview/)')
    .replace(/\]\(\/learn\/persist-model\/\)/g, '](/learn/persist-model/)')
    .replace(/\]\(\/learn\/persist-model\)/g, '](/learn/persist-model/)')
    .replace(/\]\(\/learn\/persist-model\/#mapping-types\)/g, '](/learn/persist-model/#type-mapping)')
    .replace(/\]\(\/learn\/persist-cli-tool\/\)/g, '](/learn/persist-cli-tool/)')
    .replace(/\]\(\/learn\/persist-client-api\/\)/g, '](/learn/persist-client-api/)')
    .replace(/\]\(\/learn\/persist-introspection\/\)/g, '](/learn/persist-introspection/)')
    .replace(/\]\(\/learn\/supported-data-stores\/\)/g, '](/learn/supported-data-stores/)')
    .replace(/\]\(\/learn\/manage-data-persistence-with-bal-persist\/\)/g, '](/learn/manage-data-persistence-with-bal-persist/)')
    .replace(/\]\(\/learn\/monolithic-deployment\/\)/g, '](/learn/monolithic-deployment/)')
    .replace(/\]\(\/learn\/containerized-deployment\/\)/g, '](/learn/containerized-deployment/)')
    .replace(/\]\(\/learn\/serverless-deployment\/\)/g, '](/learn/serverless-deployment/)')
    .replace(/\]\(\/learn\/deployment-guidelines-overview\/\)/g, '](/learn/deployment-guidelines-overview/)')
    .replace(/\]\(\/learn\/keystore-truststore\/\)/g, '](/learn/keystore-truststore/)')
    .replace(/\]\(\/learn\/code-to-cloud-deployment\/\)/g, '](/learn/run-ballerina-programs-in-the-cloud/code-to-cloud-deployment/)')
    .replace(/\]\(\/learn\/code-to-cloud-deployment\)/g, '](/learn/run-ballerina-programs-in-the-cloud/code-to-cloud-deployment/)')
    .replace(/\]\(\/learn\/by-example\/#aws-lambda\)/g, '](/learn/by-example/aws-lambda-hello-world/)')
    .replace(/\]\(\/learn\/by-example\/#azure-functions\)/g, '](/learn/by-example/azure-functions-hello-world/)')
    .replace(/\]\(\/learn\/by-example\/#graphql-service\)/g, '](/learn/by-example/graphql-hello-world/)')
    .replace(/\]\(\/learn\/by-example\/aws-lambda\/\)/g, '](/learn/by-example/aws-lambda-hello-world/)')
    .replace(/\]\(\/learn\/by-example\/azure-functions\/\)/g, '](/learn/by-example/azure-functions-hello-world/)')
    .replace(/\]\(\/spec\/http\/#213-default-listener\)/g, '](pathname:///spec/http/spec.md#213-default-listener)')
    .replace(/\]\(\/spec\/graphql\/?\)/g, '](pathname:///spec/graphql/spec.md)')
    .replace(/\]\(\/learn\/configure-a-sample-ballerina-service\/\)/g, '](/learn/configure-a-sample-ballerina-service/)')
    .replace(/\]\(https:\/\/ballerina\.io\/learn\/configure-a-sample-ballerina-service\/\)/g, '](/learn/configure-a-sample-ballerina-service/)')
    .replace(/\]\(\/learn\/provide-values-to-configurable-variables\/\)/g, '](/learn/provide-values-to-configurable-variables/)')
    .replace(/\]\(\/learn\/configure-values\/\)/g, '](/learn/configure-values/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/test-a-simple-function\/?\)/g, '](/learn/test-ballerina-code/test-a-simple-function/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/write-tests\/?\)/g, '](/learn/test-ballerina-code/write-tests/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/structure-tests\/?\)/g, '](/learn/test-ballerina-code/structure-tests/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/configure-tests\/?\)/g, '](/learn/test-ballerina-code/configure-tests/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/code-coverage-and-reporting\/?\)/g, '](/learn/test-ballerina-code/code-coverage-and-reporting/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/define-data-driven-tests\/?\)/g, '](/learn/test-ballerina-code/define-data-driven-tests/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/define-test-groups\/?\)/g, '](/learn/test-ballerina-code/define-test-groups/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/test-services-and-clients\/?\)/g, '](/learn/test-ballerina-code/test-services-and-clients/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/mocking\/?\)/g, '](/learn/test-ballerina-code/mocking/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/execute-tests\/?\)/g, '](/learn/test-ballerina-code/execute-tests/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/execute-tests-in-parallel\/?\)/g, '](/learn/test-ballerina-code/execute-tests-in-parallel/)')
    .replace(/\]\(\/learn\/test-ballerina-code\/configure-tests\/#define-test-specific-configurations\)/g, '](https://ballerina.io/learn/test-ballerina-code/configure-tests/#define-test-specific-configurations)')
    .replace(/\]\(\/learn\/strand-dump-tool\/#strand-group-states\)/g, '](/learn/strand-dump-tool/#strand-group-states)')
    .replace(/\]\(\/learn\/strand-dump-tool\/#strand-states\)/g, '](/learn/strand-dump-tool/#strand-states)')
    .replace(/\]\(https:\/\/ballerina\.io\/learn\/cli-commands\/#tool-commands\)/g, '](/learn/cli-commands/#tool-commands)')
    .replace(/&lt;function names>/g, '&lt;function names&gt;')
    .replace(/&lt;function name>/g, '&lt;function name&gt;')
    .replace(/<package_name>/g, '&lt;package_name&gt;')
    .replace(/<path to generated artifacts>/g, '&lt;path to generated artifacts&gt;')
    .replace(/<function_app_name>/g, '&lt;function_app_name&gt;')
    .replace(/\*\*\*enable: \{true&#124;false\}\*\*\*/g, '***enable: &#123;true&#124;false&#125;***')
    .replace(/"<book>The Lost World<\/book>"/g, '"&lt;book&gt;The Lost World&lt;/book&gt;"')
    .replace(/\]\(\/learn\/graphql-tool\/\)/g, '](/learn/graphql-tool/)')
    .replace(/\]\(\/learn\/publish-packages-to-ballerina-central\/#prepare-for-publishing\)/g, '](/learn/publish-packages-to-ballerina-central/#define-the-organization)')
    .replace(/\]\(\/learn\/publish-packages-to-ballerina-central\/#create-a-library-package\)/g, '](/learn/publish-packages-to-ballerina-central/#create-a-package)')
    .replace(/\]\(\/learn\/by-example\/#docker\)/g, '](/learn/by-example/docker-hello-world/)')
    .replace(/\]\(\/learn\/by-example\/#kubernetes\)/g, '](/learn/by-example/kubernetes-hello-world/)')
    .replace(/\]\(\/downloads\/installation-options\/\)/g, '](/learn/install-ballerina/installation-options/)')
    .replace(/\]\(\/learn\/bal-persist-overview\/\)/g, '](https://ballerina.io/learn/bal-persist-overview/)')
    .trim();
}

const sharedImageCopies = [
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/strand-dump-output-format.svg',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ballerina-profiler-output.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/search-function-inside-flame-graph.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/click-function-and-zoom-flame-graph.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/bubble-sort-function-time.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/merge-sort-function-time.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ballerina-service-profiler-output.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/test-report.gif',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/code-cov.gif',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/test-execution-order.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/scan-tool-html-report-summary-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/scan-tool-html-report-file-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/scan-tool-list-rules.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ballerina-interop-diagram-v1.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ballerina-metrics-listed-in-prometheus.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ballerina-metrics-in-graph.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/grafana-prometheus-datasource.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/grafana-import-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/grafana-ballerina-metrics-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/jaeger-tracing-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/span-details-jaeger.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/zipkin-tracing-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-add-prometheus.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-creating-api-key.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-agent-prometheus-configurations.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-metrics-explorer.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-importing-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-metrics-dashboard-1.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-metrics-dashboard-2.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-trace-explorer.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-filter-traces.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/datadog-span-tags.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/newrelic-metric-query-builder.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/newrelic-tracing.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/newrelic-span-tags.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/opensearch-traces-dashboard.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/span-details-opensearch.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/service-map-opensearch.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/service-details-opensearch.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/opensearch-metrics-dashboard-overall.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/opensearch-metrics-dashboard-summary.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/opensearch-logs-dashboard-overall.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/opensearch-logs-dashboard-logs-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/moesif-request-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/moesif-metrics-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/moesif-logs-view.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/bal-persist-diagram.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/bal-persist-scenario-diagram.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/grpc-getting-started.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/data-service-architecture.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/ai_natural_expr_configure_default_model.png',
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/images/data-service-guide-output.png',
];

for (const page of pages) {
  const raw = fs.readFileSync(page.sourcePath, 'utf8');
  const {data, content} = parseFrontmatter(raw);
  const title = data.title || page.titleFallback;
  const description = data.description || data.intro || page.descriptionFallback;
  const keywords = normalizeKeywords(data.keywords);
  let body = data.intro ? `${data.intro}\n\n${content}` : content;
  body = cleanupContent(body);

  if (page.slug === '/publish-packages-to-ballerina-central') {
    body = body
      .replace(/^## Create a package$/m, '## Create a package')
      .replace(/^### Define the organization$/m, '### Define the organization');
  }

  if (page.slug === '/advanced-general-purpose-language-features') {
    body = body.replace(
      /\| mapping\s+\| string\s+\| object \| \{<br \/> x: "foo",<br \/> y: "bar"<br \/>} \| map<br \/><br \/>map&lt;T&gt;\s+\| record<br \/><br \/>record \{<br \/> Tx x; Ty y;<br \/>} \| record \{\\\|<br \/> Tx x;<br \/> Tr\.\.\.;<br \/>\\\|} \|/,
      '| mapping       | string     | object | &lbrace;<br /> x: "foo",<br /> y: "bar"<br />&rbrace; | map<br /><br />map&lt;T&gt;                     | record<br /><br />record &lbrace;<br /> Tx x; Ty y;<br />&rbrace; | record &lbrace;\\|<br /> Tx x;<br /> Tr...;<br />\\|&rbrace; |',
    );
  }

  if (page.slug === '/supported-network-protocols') {
    body = body.replace(
      '<ul><li> [WebSubHub listener](https://lib.ballerina.io/ballerina/websubhub/latest#Listener)<br /> </li><li> [WebSubHub publsiher client](https://lib.ballerina.io/ballerina/websubhub/latest#PublisherClient)</ul>',
      '<ul><li> [WebSubHub listener](https://lib.ballerina.io/ballerina/websubhub/latest#Listener)<br /> </li><li> [WebSubHub publsiher client](https://lib.ballerina.io/ballerina/websubhub/latest#PublisherClient)</li></ul>',
    );
  }

  const output = `${buildFrontmatter({
    title,
    description,
    slug: page.slug,
    keywords,
  })}\n${body}\n`;

  const targetPath = path.join(targetDocsDir, page.targetPath);
  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, output);
  fs.rmSync(targetPath.replace(/\.md$/, '.mdx'), {force: true});

  console.log(
    `Imported ${path.basename(page.sourcePath)} -> ${path.relative(process.cwd(), targetPath)}`,
  );
}

const sharedLearnImagesDir = path.resolve('static/learn/images');
const sharedImagesDir = path.resolve('static/images');
fs.mkdirSync(sharedLearnImagesDir, {recursive: true});
fs.mkdirSync(sharedImagesDir, {recursive: true});
for (const sourcePath of sharedImageCopies) {
  const targetDir = sourcePath.includes('/public/images/')
    ? sharedImagesDir
    : sharedLearnImagesDir;
  fs.copyFileSync(sourcePath, path.join(targetDir, path.basename(sourcePath)));
}

fs.cpSync(
  '/Users/sarani/Downloads/codebase/ballerina-dev-website/public/learn/images/integration-tutorials',
  path.join(sharedLearnImagesDir, 'integration-tutorials'),
  {recursive: true},
);
