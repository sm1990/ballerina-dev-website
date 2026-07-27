import fs from 'node:fs';
import path from 'node:path';
import {highlightCodeHtml} from './lib/shiki-highlight.mjs';

const sourceDir = path.resolve('content/homepage/ballerina-in-action');
const targetPath = path.resolve('src/generated/ballerinaInActionSamples.js');

const metadata = [
  {
    slug: 'consuming-services',
    title: 'Consuming services',
    source: 'consuming-services.md',
    githubPath: 'consuming_services',
    language: 'ballerina',
    diagram: '/images/consuming-services-diagram.png',
    diagramAlt: 'Consuming services diagram',
  },
  {
    slug: 'working-with-data',
    title: 'Working with data',
    source: 'working-with-data.md',
    githubPath: 'working_with_data',
    language: 'ballerina',
    diagram: '/images/working-with-data-diagram.png',
    diagramAlt: 'Working with data diagram',
  },
  {
    slug: 'restful-api',
    title: 'RESTful API',
    source: 'restful-api.md',
    githubPath: 'restful_api',
    language: 'ballerina',
  },
  {
    slug: 'grpc-api',
    title: 'gRPC API',
    source: 'grpc-api.md',
    githubPath: 'grpc_api',
    language: 'ballerina',
    secondarySource: 'grpc-api-proto.md',
    secondaryTitle: 'Proto definition',
    secondaryLanguage: 'protobuf',
  },
  {
    slug: 'graphql-api',
    title: 'GraphQL API',
    source: 'graphql-api.md',
    githubPath: 'graphql_api',
    language: 'ballerina',
  },
  {
    slug: 'kafka-consumer-producer',
    title: 'Kafka consumer/producer',
    source: 'kafka-consumer-producer.md',
    githubPath: 'kafka_consumer_producer',
    language: 'ballerina',
  },
  {
    slug: 'working-with-databases',
    title: 'Working with databases',
    source: 'working-with-databases.md',
    githubPath: 'working_with_databases',
    language: 'ballerina',
  },
  {
    slug: 'working-with-llms',
    title: 'Working with LLMs',
    source: 'working-with-llms.md',
    githubPath: 'working-with-llms',
    language: 'ballerina',
  },
];

function stripCodeFences(content) {
  return content
    .replace(/^\s*```[^\n]*\n/, '')
    .replace(/\n```\s*$/, '')
    .trimEnd();
}

function loadCode(fileName) {
  const filePath = path.join(sourceDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  return stripCodeFences(content);
}

async function main() {
  const samples = [];

  for (const sample of metadata) {
    const code = loadCode(sample.source);
    const secondaryCode = sample.secondarySource ? loadCode(sample.secondarySource) : undefined;

    samples.push({
      slug: sample.slug,
      title: sample.title,
      code,
      language: sample.language,
      githubUrl: `https://github.com/ballerina-guides/integration-samples/tree/main/${sample.githubPath}`,
      diagram: sample.diagram,
      diagramAlt: sample.diagramAlt,
      secondaryTitle: sample.secondaryTitle,
      highlightedHtml: await highlightCodeHtml(code, sample.language),
      secondaryCode,
      secondaryHighlightedHtml: secondaryCode
        ? await highlightCodeHtml(secondaryCode, sample.secondaryLanguage ?? undefined)
        : undefined,
      secondaryLanguage: sample.secondaryLanguage,
    });
  }

  const output = `const ballerinaInActionSamples = ${JSON.stringify(samples, null, 2)};\n\nexport default ballerinaInActionSamples;\n`;

  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, output);

  console.log(
    `Generated ${path.relative(process.cwd(), targetPath)} from ${path.relative(process.cwd(), sourceDir)}`,
  );
}

await main();
