import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bbeSidebar: [
    'intro',
    {
      type: 'category',
      label: "Language concepts",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Hello World",
          collapsible: true,
          collapsed: true,
          items: [
            'hello-world',
            'hello-world-service'
          ],
        },
        {
          type: 'category',
          label: "Basics",
          collapsible: true,
          collapsed: true,
          items: [
            'programs-and-modules',
            'main-function',
            'init-function',
            'variables-and-types',
            'identifiers'
          ],
        },
        {
          type: 'category',
          label: "Simple basic types",
          collapsible: true,
          collapsed: true,
          items: [
            'integers',
            'floating-point-numbers',
            'decimal-type',
            'nil',
            'boolean',
            'byte-type'
          ],
        },
        {
          type: 'category',
          label: "Strings",
          collapsible: true,
          collapsed: true,
          items: [
            'strings'
          ],
        },
        {
          type: 'category',
          label: "Operators",
          collapsible: true,
          collapsed: true,
          items: [
            'binary-operators',
            'unary-operators'
          ],
        },
        {
          type: 'category',
          label: "Conditional statements",
          collapsible: true,
          collapsed: true,
          items: [
            'if-statement',
            'match-statement',
            'match-guard-in-match-statement',
            'binding-patterns-in-match-statement'
          ],
        },
        {
          type: 'category',
          label: "Functions",
          collapsible: true,
          collapsed: true,
          items: [
            'functions',
            'included-record-parameters',
            'rest-parameters',
            'default-values-for-function-parameters',
            'provide-function-arguments-by-name',
            'rest-arguments',
            'function-pointers',
            'function-values',
            'function-types',
            'anonymous-function',
            'function-closure'
          ],
        },
        {
          type: 'category',
          label: "Iteration",
          collapsible: true,
          collapsed: true,
          items: [
            'foreach-statement',
            'while-statement',
            'break-statement',
            'continue-statement',
            'int-range'
          ],
        },
        {
          type: 'category',
          label: "Lang library",
          collapsible: true,
          collapsed: true,
          items: [
            'langlib-functions'
          ],
        },
        {
          type: 'category',
          label: "Types and typing",
          collapsible: true,
          collapsed: true,
          items: [
            'structural-typing',
            'unions',
            'error-reporting',
            'anydata-type',
            'any-type',
            'type-definitions',
            'typedesc-type',
            'covariance',
            'type-inference',
            'built-in-integer-subtypes',
            'built-in-string-subtype',
            'ensureType-function',
            'dependent-types',
            'singleton-types',
            'stream-type',
            'never-type'
          ],
        },
        {
          type: 'category',
          label: "Expression-oriented style",
          collapsible: true,
          collapsed: true,
          items: [
            'expression-oriented-style'
          ],
        },
        {
          type: 'category',
          label: "Equality",
          collapsible: true,
          collapsed: true,
          items: [
            'expression-equality'
          ],
        },
        {
          type: 'category',
          label: "Lists",
          collapsible: true,
          collapsed: true,
          items: [
            'arrays',
            'nested-arrays',
            'tuples',
            'rest-type-in-tuples',
            'filler-values-of-a-list',
            'list-subtyping',
            'list-equality',
            'binary-data'
          ],
        },
        {
          type: 'category',
          label: "Mappings",
          collapsible: true,
          collapsed: true,
          items: [
            'maps',
            'records',
            'computed-field-key'
          ],
        },
        {
          type: 'category',
          label: "Records",
          collapsible: true,
          collapsed: true,
          items: [
            'optional-fields',
            'open-records',
            'controlling-openness',
            'type-inclusion-for-records',
            'default-values-for-record-fields'
          ],
        },
        {
          type: 'category',
          label: "Array/Map symmetry",
          collapsible: true,
          collapsed: true,
          items: [
            'array-map-symmetry'
          ],
        },
        {
          type: 'category',
          label: "Objects",
          collapsible: true,
          collapsed: true,
          items: [
            'object',
            'defining-classes',
            'object-constructor',
            'object-value-from-class-definition',
            'visibility-of-object-fields-and-methods',
            'init-return-type',
            'object-types',
            'object-type-inclusion',
            'distinct-object-types',
            'object-closure',
            'client-class',
            'start-service-from-service-class-definition'
          ],
        },
        {
          type: 'category',
          label: "Binding patterns",
          collapsible: true,
          collapsed: true,
          items: [
            'binding-patterns',
            'typed-binding-pattern',
            'wildcard-binding-pattern',
            'list-binding-pattern',
            'rest-binding-pattern-in-list-binding-pattern',
            'mapping-binding-pattern',
            'rest-binding-pattern-in-mapping-binding-pattern',
            'error-binding-pattern',
            'rest-binding-pattern-in-error-binding-pattern',
            'single-use-of-typed-binding',
            'single-use-with-on-fail-clause',
            'iterative-use-of-typed-binding',
            'list-binding-pattern-in-match-statement',
            'mapping-binding-pattern-in-match-statement',
            'error-binding-pattern-in-match-statement'
          ],
        },
        {
          type: 'category',
          label: "Tables",
          collapsible: true,
          collapsed: true,
          items: [
            'table',
            'table-types',
            'multiple-key-fields',
            'structured-keys'
          ],
        },
        {
          type: 'category',
          label: "Query expressions",
          collapsible: true,
          collapsed: true,
          items: [
            'query-expressions',
            'sort-iterable-objects',
            'let-clause',
            'limit-clause',
            'joining-iterable-objects',
            'outer-join-clause',
            'querying-tables',
            'create-tables-with-query',
            'create-maps-with-query',
            'create-streams-with-query',
            'on-conflict-clause',
            'advanced-conflict-handling',
            'iterating-over-xml-with-query',
            'nested-query-expressions',
            'destructure-records-using-query',
            'querying-with-streams',
            'aggregation'
          ],
        },
        {
          type: 'category',
          label: "Query actions",
          collapsible: true,
          collapsed: true,
          items: [
            'query-actions'
          ],
        },
        {
          type: 'category',
          label: "JSON",
          collapsible: true,
          collapsed: true,
          items: [
            'json-type',
            'access-json-elements',
            'access-optional-json-elements',
            'match-statement-with-maps',
            'converting-from-user-defined-type-to-json',
            'converting-from-table-and-xml-to-json',
            'convert-from-json-to-user-defined-type',
            'casting-json-to-user-defined-type',
            'resource-method-typing',
            'json-numbers',
            'json-to-record',
            'json-to-record-with-projection',
            'jsonpath-expressions'
          ],
        },
        {
          type: 'category',
          label: "Backtick templates",
          collapsible: true,
          collapsed: true,
          items: [
            'raw-templates',
            'string-templates',
            'xml-templates'
          ],
        },
        {
          type: 'category',
          label: "XML",
          collapsible: true,
          collapsed: true,
          items: [
            'xml-data-model',
            'xml-operations',
            'xml-iteration',
            'xml-access',
            'xml-mutation',
            'xml-subtyping',
            'xml-navigation',
            'xml-templates-and-query',
            'xml-namespaces',
            'xmlns-declarations',
            'xml-to-record',
            'xml-to-record-with-projection'
          ],
        },
        {
          type: 'category',
          label: "Regular Expressions",
          collapsible: true,
          collapsed: true,
          items: [
            'regexp-type',
            'regexp-operations-overview',
            'regexp-replace-operations',
            'regexp-find-operations',
            'regexp-match-operations'
          ],
        },
        {
          type: 'category',
          label: "Metadata",
          collapsible: true,
          collapsed: true,
          items: [
            'documentation',
            'annotations'
          ],
        },
        {
          type: 'category',
          label: "Network interaction",
          collapsible: true,
          collapsed: true,
          items: [
            'consuming-services',
            'providing-services',
            'module-lifecycle',
            'service-declaration',
            'resource-methods',
            'hierarchical-resources',
            'resource-path-parameters'
          ],
        },
        {
          type: 'category',
          label: "Configurability",
          collapsible: true,
          collapsed: true,
          items: [
            'configurable-variables',
            'configuring-via-toml',
            'configuring-via-cli'
          ],
        },
        {
          type: 'category',
          label: "Error handling",
          collapsible: true,
          collapsed: true,
          items: [
            'error-handling',
            'check-expression',
            'error-subtyping',
            'panics',
            'trap-expression',
            'error-type-intersection',
            'error-detail',
            'error-cause'
          ],
        },
        {
          type: 'category',
          label: "Ignore return values and errors",
          collapsible: true,
          collapsed: true,
          items: [
            'ignoring-return-values-and-errors'
          ],
        },
        {
          type: 'category',
          label: "Mutability and identity",
          collapsible: true,
          collapsed: true,
          items: [
            'identity',
            'const-and-final',
            'enumerations',
            'immutability'
          ],
        },
        {
          type: 'category',
          label: "Concurrency",
          collapsible: true,
          collapsed: true,
          items: [
            'asynchronous-function-calls',
            'named-workers',
            'sequence-diagrams',
            'waiting-for-workers',
            'strands',
            'named-worker-return-values',
            'alternate-wait',
            'multiple-wait',
            'named-workers-and-futures',
            'inter-worker-message-passing',
            'alternate-receive',
            'multiple-receive',
            'conditional-send',
            'inter-worker-failure-propagation',
            'named-worker-with-on-fail-clause',
            'synchronize-message-passing',
            'asynchronize-message-passing',
            'flush',
            'fork'
          ],
        },
        {
          type: 'category',
          label: "Transactions",
          collapsible: true,
          collapsed: true,
          items: [
            'transaction-statement',
            'check-semantics',
            'rollback',
            'retry-transaction-statement',
            'transactional-qualifier',
            'transactional-named-workers',
            'commit-rollback-handlers'
          ],
        },
        {
          type: 'category',
          label: "Concurrency safety",
          collapsible: true,
          collapsed: true,
          items: [
            'lock-statement',
            'isolated-functions',
            'readonly-type',
            'readonly-and-isolated',
            'readonly-objects-and-classes',
            'combining-isolated-functions-and-lock',
            'isolated-variables',
            'isolated-methods',
            'isolated-objects',
            'inferring-isolated',
            'run-strands-safely-on-separate-threads'
          ],
        },
        {
          type: 'category',
          label: "Interface to external code",
          collapsible: true,
          collapsed: true,
          items: [
            'interface-to-external-code'
          ],
        },
        {
          type: 'category',
          label: "Testing",
          collapsible: true,
          collapsed: true,
          items: [
            'testerina-assertions',
            'testerina-before-and-after-test',
            'testerina-before-and-after-each',
            'testerina-before-and-after-groups',
            'testerina-before-and-after-suite',
            'testerina-data-driven-tests',
            'testerina-guarantee-test-execution-order',
            'testerina-group-tests',
            'testerina-mocking-functions',
            'testerina-mocking-objects'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Network libraries",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "REST service",
          collapsible: true,
          collapsed: true,
          items: [
            'http-basic-rest-service',
            'http-service-and-resource-paths',
            'http-service-data-binding',
            'http-service-payload-constraint-validation',
            'http-path-param',
            'http-query-parameter',
            'http-header-param',
            'http-send-response',
            'http-send-different-status-codes',
            'http-send-different-status-codes-with-payload',
            'http-default-error-handling',
            'http-service-cache-response'
          ],
        },
        {
          type: 'category',
          label: "HTTP client",
          collapsible: true,
          collapsed: true,
          items: [
            'http-client-send-request-receive-response',
            'http-client-data-binding',
            'http-client-payload-constraint-validation',
            'http-client-path-parameter',
            'http-client-query-parameter',
            'http-client-header-parameter',
            'http-caching-client'
          ],
        },
        {
          type: 'category',
          label: "REST service security",
          collapsible: true,
          collapsed: true,
          items: [
            'http-service-ssl-tls',
            'http-service-mutual-ssl',
            'http-service-basic-authentication-file-user-store',
            'http-service-basic-authentication-ldap-user-store',
            'http-service-jwt-authentication',
            'http-service-oauth2'
          ],
        },
        {
          type: 'category',
          label: "HTTP client security",
          collapsible: true,
          collapsed: true,
          items: [
            'http-client-ssl-tls',
            'http-client-mutual-ssl',
            'http-client-basic-authentication',
            'http-client-bearer-token-authentication',
            'http-client-self-signed-jwt-authentication',
            'http-client-oauth2-client-credentials-grant-type',
            'http-client-oauth2-password-grant-type',
            'http-client-oauth2-refresh-token-grant-type',
            'http-client-oauth2-jwt-bearer-grant-type'
          ],
        },
        {
          type: 'category',
          label: "HTTP client resiliency",
          collapsible: true,
          collapsed: true,
          items: [
            'http-timeout',
            'http-retry',
            'http-circuit-breaker',
            'http-load-balancer',
            'http-failover'
          ],
        },
        {
          type: 'category',
          label: "HTTP service advanced",
          collapsible: true,
          collapsed: true,
          items: [
            'http-default-resource',
            'http-request-response',
            'http-caller',
            'http-service-redirects',
            'http-cors',
            'http-100-continue',
            'http-matrix-param',
            'http-restrict-by-media-type',
            'http-service-file-upload',
            'http-compression',
            'http-trace-logs',
            'http-access-logs',
            'http-cookies-service',
            'http-service-chunking',
            'http-send-header',
            'http-response-with-multiparts',
            'http-passthrough',
            'http-2-to-1-1-downgrade-service',
            'http-2-0-server-push',
            'http-sse-service'
          ],
        },
        {
          type: 'category',
          label: "HTTP client advanced",
          collapsible: true,
          collapsed: true,
          items: [
            'http-client-redirects',
            'http-client-file-upload',
            'http-cookies-client',
            'http-client-chunking',
            'http-request-with-multiparts',
            'http-2-to-1-1-downgrade-client',
            'http-2-prior-knowledge-client',
            'http-2-0-client-server-push',
            'http-sse-client'
          ],
        },
        {
          type: 'category',
          label: "HTTP service interceptors",
          collapsible: true,
          collapsed: true,
          items: [
            'http-request-interceptor',
            'http-response-interceptor',
            'http-error-handling',
            'http-interceptor-error-handling'
          ],
        },
        {
          type: 'category',
          label: "GraphQL service",
          collapsible: true,
          collapsed: true,
          items: [
            'graphql-hello-world',
            'graphql-returning-service-objects',
            'graphql-returning-record-values',
            'graphql-input-types',
            'graphql-mutations',
            'graphql-subscriptions',
            'graphql-input-objects',
            'graphql-id-scalar-type',
            'graphql-interfaces',
            'graphql-interfaces-implementing-interfaces',
            'graphql-service-union-types',
            'graphql-service-error-handling',
            'graphql-graphiql',
            'graphql-documentation',
            'graphql-directives',
            'graphql-hierarchical-resource-paths'
          ],
        },
        {
          type: 'category',
          label: "  GraphQL service advanced",
          collapsible: true,
          collapsed: true,
          items: [
            'graphql-context',
            'graphql-service-field-object',
            'graphql-service-interceptors',
            'graphql-field-interceptors',
            'graphql-interceptor-configurations',
            'graphql-input-constraint-validation',
            'graphql-file-upload',
            'graphql-dataloader',
            'custom-prefetch-methods',
            'graphql-service-operation-level-caching',
            'graphql-service-field-level-caching',
            'graphql-service-cache-invalidation',
            'graphql-service-query-complexity'
          ],
        },
        {
          type: 'category',
          label: "GraphQL client",
          collapsible: true,
          collapsed: true,
          items: [
            'graphql-client-query-endpoint',
            'graphql-client-handle-partial-response',
            'graphql-client-error-handling'
          ],
        },
        {
          type: 'category',
          label: "GraphQL service security",
          collapsible: true,
          collapsed: true,
          items: [
            'graphql-service-ssl-tls',
            'graphql-service-mutual-ssl',
            'graphql-service-basic-auth-file-user-store',
            'graphql-service-basic-auth-ldap-user-store',
            'graphql-service-jwt-auth',
            'graphql-service-oauth2'
          ],
        },
        {
          type: 'category',
          label: "GraphQL client security",
          collapsible: true,
          collapsed: true,
          items: [
            'graphql-client-security-ssl-tls',
            'graphql-client-security-mutual-ssl',
            'graphql-client-security-basic-auth',
            'graphql-client-security-jwt-authentication',
            'graphql-client-security-oauth2-password-grant-type'
          ],
        },
        {
          type: 'category',
          label: "WebSocket service",
          collapsible: true,
          collapsed: true,
          items: [
            'websocket-basic-sample',
            'websocket-service-payload-constraint-validation',
            'websocket-service-error-handling',
            'websocket-query-parameter'
          ],
        },
        {
          type: 'category',
          label: "WebSocket client",
          collapsible: true,
          collapsed: true,
          items: [
            'websocket-client',
            'websocket-client-payload-constraint-validation'
          ],
        },
        {
          type: 'category',
          label: "WebSocket service security",
          collapsible: true,
          collapsed: true,
          items: [
            'websocket-service-ssl-tls',
            'websocket-service-mutual-ssl',
            'websocket-service-basic-auth-file-user-store',
            'websocket-service-basic-auth-ldap-user-store',
            'websocket-service-jwt-auth',
            'websocket-service-oauth2'
          ],
        },
        {
          type: 'category',
          label: "WebSocket client security",
          collapsible: true,
          collapsed: true,
          items: [
            'websocket-client-ssl-tls',
            'websocket-client-mutual-ssl',
            'websocket-client-basic-auth',
            'websocket-client-bearer-token-auth',
            'websocket-client-self-signed-jwt-auth',
            'websocket-client-oauth2-client-cred-grant-type',
            'websocket-client-oauth2-password-grant-type',
            'websocket-client-oauth2-refresh-token-grant-type',
            'websocket-client-oauth2-jwt-bearer-grant-type'
          ],
        },
        {
          type: 'category',
          label: "WebSocket client resiliency",
          collapsible: true,
          collapsed: true,
          items: [
            'websocket-timeout-client',
            'websocket-retry-client'
          ],
        },
        {
          type: 'category',
          label: "WebSub service",
          collapsible: true,
          collapsed: true,
          items: [
            'websub-webhook-sample'
          ],
        },
        {
          type: 'category',
          label: "Listeners and StopHandlers",
          collapsible: true,
          collapsed: true,
          items: [
            'dynamic-listener',
            'stop-handler'
          ],
        },
        {
          type: 'category',
          label: "gRPC service",
          collapsible: true,
          collapsed: true,
          items: [
            'grpc-service-simple',
            'grpc-service-server-streaming',
            'grpc-service-client-streaming',
            'grpc-service-bidirectional-streaming',
            'grpc-service-headers',
            'grpc-server-reflection',
            'grpc-service-check-deadline'
          ],
        },
        {
          type: 'category',
          label: "gRPC client",
          collapsible: true,
          collapsed: true,
          items: [
            'grpc-client-simple',
            'grpc-client-server-streaming',
            'grpc-client-client-streaming',
            'grpc-client-bidirectional-streaming',
            'grpc-client-headers',
            'grpc-client-set-deadline'
          ],
        },
        {
          type: 'category',
          label: "gRPC service security",
          collapsible: true,
          collapsed: true,
          items: [
            'grpc-service-ssl-tls',
            'grpc-service-mutual-ssl',
            'grpc-service-basic-auth-file-user-store',
            'grpc-service-basic-auth-ldap-user-store',
            'grpc-service-jwt-auth',
            'grpc-service-oauth2'
          ],
        },
        {
          type: 'category',
          label: "gRPC client security",
          collapsible: true,
          collapsed: true,
          items: [
            'grpc-client-ssl-tls',
            'grpc-client-mutual-ssl',
            'grpc-client-basic-auth',
            'grpc-client-bearer-token-auth',
            'grpc-client-self-signed-jwt-auth',
            'grpc-client-oauth2-client-credentials-grant-type',
            'grpc-client-oauth2-password-grant-type',
            'grpc-client-oauth2-refresh-token-grant-type',
            'grpc-client-oauth2-jwt-bearer-grant-type'
          ],
        },
        {
          type: 'category',
          label: "NATS service",
          collapsible: true,
          collapsed: true,
          items: [
            'nats-basic-sub',
            'nats-basic-reply',
            'nats-service-constraint-validation',
            'nats-jetstream-sub'
          ],
        },
        {
          type: 'category',
          label: "NATS client",
          collapsible: true,
          collapsed: true,
          items: [
            'nats-basic-pub',
            'nats-basic-request',
            'nats-jetstream-pub'
          ],
        },
        {
          type: 'category',
          label: "NATS service security",
          collapsible: true,
          collapsed: true,
          items: [
            'nats-service-secure-connection',
            'nats-service-basic-auth'
          ],
        },
        {
          type: 'category',
          label: "NATS client security",
          collapsible: true,
          collapsed: true,
          items: [
            'nats-client-secure-connection',
            'nats-client-basic-auth'
          ],
        },
        {
          type: 'category',
          label: "Kafka service",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-service-consume-message',
            'kafka-service-constraint-validation',
            'kafka-service-error-handling'
          ],
        },
        {
          type: 'category',
          label: "Kafka producer",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-producer-produce-message'
          ],
        },
        {
          type: 'category',
          label: "Kafka consumer",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-consumer-payload-data-binding',
            'kafka-consumer-consumer-record-data-binding',
            'kafka-consumer-constraint-validation'
          ],
        },
        {
          type: 'category',
          label: "Kafka service security",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-service-ssl',
            'kafka-service-sasl'
          ],
        },
        {
          type: 'category',
          label: "Kafka producer security",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-producer-ssl',
            'kafka-producer-sasl'
          ],
        },
        {
          type: 'category',
          label: "Kafka consumer security",
          collapsible: true,
          collapsed: true,
          items: [
            'kafka-consumer-ssl',
            'kafka-consumer-sasl'
          ],
        },
        {
          type: 'category',
          label: "SOAP client",
          collapsible: true,
          collapsed: true,
          items: [
            'soap-client-send-receive'
          ],
        },
        {
          type: 'category',
          label: "SOAP client security",
          collapsible: true,
          collapsed: true,
          items: [
            'soap-client-security-ssl-tsl',
            'soap-client-security-inbound-security-config',
            'soap-client-security-outbound-security-config'
          ],
        },
        {
          type: 'category',
          label: "RabbitMQ service",
          collapsible: true,
          collapsed: true,
          items: [
            'rabbitmq-consumer',
            'rabbitmq-consumer-with-client-acknowledgement',
            'rabbitmq-transaction-consumer',
            'rabbitmq-service-constraint-validation'
          ],
        },
        {
          type: 'category',
          label: "RabbitMQ client",
          collapsible: true,
          collapsed: true,
          items: [
            'rabbitmq-queue-declare',
            'rabbitmq-producer',
            'rabbitmq-sync-consumer',
            'rabbitmq-transaction-producer',
            'rabbitmq-client-constraint-validation'
          ],
        },
        {
          type: 'category',
          label: "RabbitMQ service security",
          collapsible: true,
          collapsed: true,
          items: [
            'rabbitmq-service-secure-connection',
            'rabbitmq-service-basic-auth'
          ],
        },
        {
          type: 'category',
          label: "RabbitMQ client security",
          collapsible: true,
          collapsed: true,
          items: [
            'rabbitmq-client-secure-connection',
            'rabbitmq-client-basic-auth'
          ],
        },
        {
          type: 'category',
          label: "MQTT service",
          collapsible: true,
          collapsed: true,
          items: [
            'mqtt-service-subscribe-message'
          ],
        },
        {
          type: 'category',
          label: "MQTT client",
          collapsible: true,
          collapsed: true,
          items: [
            'mqtt-client-publish-message'
          ],
        },
        {
          type: 'category',
          label: "MQTT service security",
          collapsible: true,
          collapsed: true,
          items: [
            'mqtt-service-ssl',
            'mqtt-service-basic-authentication'
          ],
        },
        {
          type: 'category',
          label: "MQTT client security",
          collapsible: true,
          collapsed: true,
          items: [
            'mqtt-client-ssl',
            'mqtt-client-basic-authentication'
          ],
        },
        {
          type: 'category',
          label: "LDAP client",
          collapsible: true,
          collapsed: true,
          items: [
            'ldap-add-remove-entry',
            'ldap-search-entry'
          ],
        },
        {
          type: 'category',
          label: "JMS service",
          collapsible: true,
          collapsed: true,
          items: [
            'jms-service-consume-message'
          ],
        },
        {
          type: 'category',
          label: "JMS message producer",
          collapsible: true,
          collapsed: true,
          items: [
            'jms-producer-produce-message',
            'jms-producer-transaction'
          ],
        },
        {
          type: 'category',
          label: "JMS message consumer",
          collapsible: true,
          collapsed: true,
          items: [
            'jms-consumer-consume-message',
            'jms-consumer-acknowledgement'
          ],
        },
        {
          type: 'category',
          label: "TCP service",
          collapsible: true,
          collapsed: true,
          items: [
            'tcp-listener'
          ],
        },
        {
          type: 'category',
          label: "TCP client",
          collapsible: true,
          collapsed: true,
          items: [
            'tcp-client'
          ],
        },
        {
          type: 'category',
          label: "TCP service security",
          collapsible: true,
          collapsed: true,
          items: [
            'tcp-service-ssl-tls'
          ],
        },
        {
          type: 'category',
          label: "TCP client security",
          collapsible: true,
          collapsed: true,
          items: [
            'tcp-client-ssl-tls'
          ],
        },
        {
          type: 'category',
          label: "UDP service",
          collapsible: true,
          collapsed: true,
          items: [
            'udp-listener'
          ],
        },
        {
          type: 'category',
          label: "UDP client",
          collapsible: true,
          collapsed: true,
          items: [
            'udp-client',
            'udp-connect-client'
          ],
        },
        {
          type: 'category',
          label: "Email service",
          collapsible: true,
          collapsed: true,
          items: [
            'receive-email-using-service'
          ],
        },
        {
          type: 'category',
          label: "Email client",
          collapsible: true,
          collapsed: true,
          items: [
            'send-email',
            'receive-email-using-client'
          ],
        },
        {
          type: 'category',
          label: "Email service security",
          collapsible: true,
          collapsed: true,
          items: [
            'email-service-ssl-tls'
          ],
        },
        {
          type: 'category',
          label: "Email client security",
          collapsible: true,
          collapsed: true,
          items: [
            'email-client-ssl-tls'
          ],
        },
        {
          type: 'category',
          label: "FTP Service",
          collapsible: true,
          collapsed: true,
          items: [
            'ftp-service-receive-file',
            'ftp-service-send-file'
          ],
        },
        {
          type: 'category',
          label: "FTP client",
          collapsible: true,
          collapsed: true,
          items: [
            'ftp-client-receive-file',
            'ftp-client-send-file'
          ],
        },
        {
          type: 'category',
          label: "SFTP Service",
          collapsible: true,
          collapsed: true,
          items: [
            'sftp-service-receive-file',
            'sftp-service-send-file'
          ],
        },
        {
          type: 'category',
          label: "SFTP client",
          collapsible: true,
          collapsed: true,
          items: [
            'sftp-client-receive-file',
            'sftp-client-send-file'
          ],
        },
        {
          type: 'category',
          label: "Database access",
          collapsible: true,
          collapsed: true,
          items: [
            'mysql-query-operation',
            'mysql-query-row-operation',
            'mysql-query-column-mapping',
            'mysql-execute-operation',
            'mysql-batch-execute-operation',
            'mysql-atomic-transaction',
            'mysql-call-stored-procedures'
          ],
        },
        {
          type: 'category',
          label: "Change data capture",
          collapsible: true,
          collapsed: true,
          items: [
            'cdc-service',
            'cdc-advanced-service'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Common libraries",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Avro",
          collapsible: true,
          collapsed: true,
          items: [
            'avro-serdes'
          ],
        },
        {
          type: 'category',
          label: "IO",
          collapsible: true,
          collapsed: true,
          items: [
            'io-bytes',
            'io-strings',
            'io-csv',
            'io-csv-datamapping',
            'io-json',
            'io-xml'
          ],
        },
        {
          type: 'category',
          label: "Messaging",
          collapsible: true,
          collapsed: true,
          items: [
            'message-store-type',
            'in-memory-message-store',
            'message-store-listener'
          ],
        },
        {
          type: 'category',
          label: "Security",
          collapsible: true,
          collapsed: true,
          items: [
            'security-crypto',
            'security-jwt-issue-validate'
          ],
        },
        {
          type: 'category',
          label: "URL",
          collapsible: true,
          collapsed: true,
          items: [
            'url-encode-decode'
          ],
        },
        {
          type: 'category',
          label: "Time",
          collapsible: true,
          collapsed: true,
          items: [
            'time-utc',
            'time-utc-and-civil',
            'time-formatting-and-parsing',
            'time-zone'
          ],
        },
        {
          type: 'category',
          label: "Cache",
          collapsible: true,
          collapsed: true,
          items: [
            'cache-basics',
            'cache-invalidation'
          ],
        },
        {
          type: 'category',
          label: "Log",
          collapsible: true,
          collapsed: true,
          items: [
            'logging',
            'logging-with-context',
            'error-logging',
            'logging-configuration',
            'log-file-rotation',
            'child-loggers-with-context',
            'logger-from-config',
            'custom-logger',
            'sensitive-data-logging'
          ],
        },
        {
          type: 'category',
          label: "EDI",
          collapsible: true,
          collapsed: true,
          items: [
            'edi-to-record',
            'record-to-edi'
          ],
        },
        {
          type: 'category',
          label: "OS",
          collapsible: true,
          collapsed: true,
          items: [
            'environment-variables'
          ],
        },
        {
          type: 'category',
          label: "File",
          collapsible: true,
          collapsed: true,
          items: [
            'filepaths',
            'directories',
            'files',
            'temp-files-directories',
            'directory-listener'
          ],
        },
        {
          type: 'category',
          label: "Random",
          collapsible: true,
          collapsed: true,
          items: [
            'random-numbers'
          ],
        },
        {
          type: 'category',
          label: "Task",
          collapsible: true,
          collapsed: true,
          items: [
            'task-frequency-job-execution',
            'task-one-time-job-execution',
            'manage-scheduled-jobs'
          ],
        },
        {
          type: 'category',
          label: "UUID",
          collapsible: true,
          collapsed: true,
          items: [
            'uuid-generation',
            'uuid-operations'
          ],
        },
        {
          type: 'category',
          label: "XSLT",
          collapsible: true,
          collapsed: true,
          items: [
            'xslt-transformation'
          ],
        },
        {
          type: 'category',
          label: "XML data",
          collapsible: true,
          collapsed: true,
          items: [
            'xml-to-json-conversion',
            'xml-from-json-conversion',
            'xml-to-record-conversion',
            'xml-from-record-conversion'
          ],
        },
        {
          type: 'category',
          label: "YAML data",
          collapsible: true,
          collapsed: true,
          items: [
            'yaml-to-anydata',
            'yaml-to-anydata-with-projection',
            'anydata-to-yaml-string'
          ],
        },
        {
          type: 'category',
          label: "CSV data",
          collapsible: true,
          collapsed: true,
          items: [
            'csv-string-to-record-array',
            'csv-string-to-anydata-array',
            'csv-streams-to-record-array',
            'parse-csv-lists',
            'transform-csv-records-to-custom-types',
            'csv-user-configurations'
          ],
        },
        {
          type: 'category',
          label: "Constraint",
          collapsible: true,
          collapsed: true,
          items: [
            'constraint-validations'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Generative AI",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Direct LLM calls",
          collapsible: true,
          collapsed: true,
          items: [
            'direct-llm-calls',
            'direct-llm-calls-with-history',
            'direct-llm-calls-with-multimodal-input'
          ],
        },
        {
          type: 'category',
          label: "Retrieval-augmented generation (RAG)",
          collapsible: true,
          collapsed: true,
          items: [
            'rag-with-in-memory-vector-store',
            'rag-ingestion-with-external-vector-store',
            'rag-query-with-external-vector-store'
          ],
        },
        {
          type: 'category',
          label: "Model context protocol (MCP)",
          collapsible: true,
          collapsed: true,
          items: [
            'mcp-service',
            'mcp-service-advanced'
          ],
        },
        {
          type: 'category',
          label: "AI agents",
          collapsible: true,
          collapsed: true,
          items: [
            'ai-agent-local-tools',
            'ai-agent-mcp-integration',
            'ai-agent-external-endpoint-integration',
            'chat-agents',
            'ai-agent-tool-kit'
          ],
        },
        {
          type: 'category',
          label: "Natural expressions",
          collapsible: true,
          collapsed: true,
          items: [
            'natural-expressions'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Deployment",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Docker",
          collapsible: true,
          collapsed: true,
          items: [
            'docker-hello-world'
          ],
        },
        {
          type: 'category',
          label: "Kubernetes",
          collapsible: true,
          collapsed: true,
          items: [
            'kubernetes-hello-world'
          ],
        },
        {
          type: 'category',
          label: "AWS Lambda",
          collapsible: true,
          collapsed: true,
          items: [
            'aws-lambda-hello-world',
            'aws-lambda-execution-context',
            'aws-lambda-s3-trigger',
            'aws-lambda-dynamodb-trigger'
          ],
        },
        {
          type: 'category',
          label: "Azure Functions",
          collapsible: true,
          collapsed: true,
          items: [
            'azure-functions-hello-world',
            'azure-functions-timer-trigger',
            'azure-functions-http-trigger-with-queue',
            'azure-functions-cosmosdb-trigger'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Bal persist",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Query data",
          collapsible: true,
          collapsed: true,
          items: [
            'persist-get-all',
            'persist-get-by-key',
            'persist-select-fields',
            'persist-filtering',
            'persist-relation-queries'
          ],
        },
        {
          type: 'category',
          label: "Write data",
          collapsible: true,
          collapsed: true,
          items: [
            'persist-create',
            'persist-update',
            'persist-delete'
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "Observability",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: "Tracing",
          collapsible: true,
          collapsed: true,
          items: [
            'tracing'
          ],
        },
        {
          type: 'category',
          label: "Metrics",
          collapsible: true,
          collapsed: true,
          items: [
            'gauge-metrics',
            'counter-metrics'
          ],
        }
      ],
    }
  ],
};

export default sidebars;
