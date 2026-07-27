import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import {highlightCodeHtml, inferLanguage} from './lib/shiki-highlight.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'use-cases-content');
const generatedRoot = path.join(root, 'src/generated');
const md = new MarkdownIt({html: true, linkify: true, typographer: false});

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return {data: {}, content: raw.trim()};
  }

  const end = raw.indexOf('\n---', 4);
  if (end === -1) {
    return {data: {}, content: raw.trim()};
  }

  const block = raw.slice(4, end).trim();
  const content = raw.slice(end + 4).trim();
  const data = {};

  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const separator = trimmed.indexOf(':');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    data[key] = stripQuotes(value);
  }

  return {data, content};
}

function stripCodeFence(content) {
  if (!content) return '';
  const trimmed = content.trim();
  if (!trimmed.startsWith('```')) return trimmed;
  const lines = trimmed.split('\n');
  lines.shift();
  if (lines[lines.length - 1]?.trim() === '```') lines.pop();
  return lines.join('\n').trim();
}

function readBlade(bladeDir, name) {
  const raw = fs.readFileSync(path.join(bladeDir, `${name}.md`), 'utf8');
  const {data, content} = parseFrontmatter(raw);
  return {
    id: name,
    title: data.title || name,
    descriptionHtml: data.description ? md.render(data.description) : '',
    image: data.image ? `/${data.image.replace(/^\/+/, '')}` : undefined,
    url: data.url || undefined,
    language: data.language || undefined,
    code: stripCodeFence(content),
  };
}

async function createCodePayload(code, explicitLanguage) {
  if (!code) {
    return {
      code: '',
      language: explicitLanguage || '',
      highlightedHtml: '',
    };
  }

  const language = inferLanguage(code, explicitLanguage);
  return {
    code,
    language,
    highlightedHtml: await highlightCodeHtml(code, language),
  };
}

function createUseCasesListing() {
  const source = readJson(path.join(contentRoot, 'use-cases.json'));
  const localSlugs = new Set([
    'ai',
    'integration',
    'b2b',
    'etl',
    'eda',
    'healthcare',
    'bff',
    'microservices',
    'data-oriented-programming',
    'salesforce',
  ]);
  return source.useCases.map((entry) => ({
    slug: entry.slug,
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    logo: entry.frontmatter.logo,
    href: localSlugs.has(entry.slug)
      ? `/use-cases/${entry.slug}/`
      : `https://ballerina.io/use-cases/${entry.slug}/`,
    external: !localSlugs.has(entry.slug),
  }));
}

async function createManifestBackedPageData(area) {
  const manifest = readJson(path.join(contentRoot, area, 'page.json'));
  const bladesDir = path.join(contentRoot, area, 'blades');

  const sections = [];

  for (const section of manifest.sections) {
    if (section.type === 'comparisonPairs') {
      const source = section.source ? readBlade(bladesDir, section.source) : null;
      sections.push({
        type: section.type,
        id: section.id || section.source,
        title: source?.title || section.title,
        descriptionHtml: source?.descriptionHtml || section.descriptionHtml || '',
        image: undefined,
        links:
          section.links ||
          (source?.url ? [{label: 'View code on GitHub', href: source.url}] : []),
        code: '',
        tabs: [],
        cards: [],
        items: [],
        compareItems: section.items.map((item) => {
          const meta = readBlade(bladesDir, item.source);
          const left = readBlade(bladesDir, item.leftSource);
          const right = readBlade(bladesDir, item.rightSource);
          return {
            id: item.source,
            title: meta.title,
            descriptionHtml: meta.descriptionHtml,
            leftLabel: item.leftLabel || left.title,
            leftCode: left.code || '',
            leftLanguage: inferLanguage(left.code || '', left.language),
            leftHighlightedHtml: '',
            rightLabel: item.rightLabel || right.title,
            rightCode: right.code || '',
            rightLanguage: inferLanguage(right.code || '', right.language),
            rightHighlightedHtml: '',
          };
        }),
        compare: undefined,
      });
      for (const item of sections[sections.length - 1].compareItems) {
        item.leftHighlightedHtml = item.leftCode
          ? await highlightCodeHtml(item.leftCode, item.leftLanguage)
          : '';
        item.rightHighlightedHtml = item.rightCode
          ? await highlightCodeHtml(item.rightCode, item.rightLanguage)
          : '';
      }
      continue;
    }

    if (section.type === 'codeCompare') {
      const source = readBlade(bladesDir, section.source);
      const left = readBlade(bladesDir, section.leftSource);
      const right = readBlade(bladesDir, section.rightSource);
      const leftLanguage = inferLanguage(left.code || '', left.language);
      const rightLanguage = inferLanguage(right.code || '', right.language);
      sections.push({
        type: section.type,
        id: section.source,
        title: source.title,
        descriptionHtml: source.descriptionHtml,
        image: undefined,
        links:
          section.links ||
          (source.url ? [{label: 'View code on GitHub', href: source.url}] : []),
        code: '',
        tabs: [],
        cards: [],
        items: [],
        compareItems: [],
        compare: {
          leftLabel: section.leftLabel || left.title,
          leftCode: left.code || '',
          leftLanguage,
          leftHighlightedHtml: left.code ? await highlightCodeHtml(left.code, leftLanguage) : '',
          rightLabel: section.rightLabel || right.title,
          rightCode: right.code || '',
          rightLanguage,
          rightHighlightedHtml: right.code ? await highlightCodeHtml(right.code, rightLanguage) : '',
        },
      });
      continue;
    }

    if (section.type === 'challengeCards') {
      sections.push({
        type: section.type,
        id: section.id,
        title: section.title,
        descriptionHtml: '',
        image: undefined,
        links: [],
        code: '',
        tabs: [],
        cards: section.cards,
        items: [],
        compareItems: [],
        compare: undefined,
      });
      continue;
    }

    if (section.type === 'groupedBlades') {
      const items = [];
      for (const item of section.items) {
        const source = readBlade(bladesDir, item.source);
        const codePayload = await createCodePayload(item.code || source.code || '', item.language || source.language);
        const tabs = [];
        for (const tab of item.tabs || []) {
          const tabSource = tab.source ? readBlade(bladesDir, tab.source) : null;
          const tabCode = tabSource?.code || '';
          const tabLanguage = inferLanguage(tabCode, tab.language || tabSource?.language);
          tabs.push({
            label: tab.label,
            code: tabCode,
            language: tabCode ? tabLanguage : '',
            highlightedHtml: tabCode ? await highlightCodeHtml(tabCode, tabLanguage) : '',
            image: tab.image || tabSource?.image || '',
          });
        }

        items.push({
          id: item.source,
          title: item.title || source.title,
          descriptionHtml: item.descriptionHtml || source.descriptionHtml,
          image: item.image || source.image,
          links:
            item.links ||
            (source.url ? [{label: 'View code on GitHub', href: source.url}] : []),
          code: codePayload.code,
          language: codePayload.language,
          highlightedHtml: codePayload.highlightedHtml,
          tabs,
        });
      }

      sections.push({
        type: section.type,
        id: section.id,
        title: section.title,
        descriptionHtml: '',
        image: undefined,
        links: [],
        code: '',
        tabs: [],
        cards: [],
        items,
        compareItems: [],
        compare: undefined,
      });
      continue;
    }

    const source = readBlade(bladesDir, section.source);
    let codePayload = await createCodePayload(source.code || '', source.language);
    const normalized = {
      type: section.type,
      id: section.source,
      title: source.title,
      descriptionHtml: source.descriptionHtml,
      image: section.diagram || source.image,
      links:
        section.links ||
        (source.url ? [{label: 'View code on GitHub', href: source.url}] : []),
      code: codePayload.code,
      language: codePayload.language,
      highlightedHtml: codePayload.highlightedHtml,
      tabs: [],
      cards: [],
      items: [],
      compareItems: [],
      compare: undefined,
    };

    if (section.codeSource) {
      const codeSource = readBlade(bladesDir, section.codeSource);
      codePayload = await createCodePayload(codeSource.code, codeSource.language);
      normalized.code = codePayload.code;
      normalized.language = codePayload.language;
      normalized.highlightedHtml = codePayload.highlightedHtml;
    }

    for (const tab of section.tabs || []) {
      const tabSource = tab.source ? readBlade(bladesDir, tab.source) : null;
      const tabCode = tabSource?.code || '';
      const tabLanguage = inferLanguage(tabCode, tab.language || tabSource?.language);
      normalized.tabs.push({
        label: tab.label,
        code: tabCode,
        language: tabCode ? tabLanguage : '',
        highlightedHtml: tabCode ? await highlightCodeHtml(tabCode, tabLanguage) : '',
        image: tab.image || tabSource?.image || '',
      });
    }

    sections.push(normalized);
  }

  return {
    title: manifest.title,
    slug: manifest.slug,
    description: manifest.description,
    hero: manifest.hero,
    sections,
  };
}

function writeTsModule(fileName, exportName, payload, typeSource = '') {
  const body = `${typeSource}const ${exportName} = ${JSON.stringify(payload, null, 2)};\n\nexport default ${exportName};\n`;
  fs.mkdirSync(generatedRoot, {recursive: true});
  fs.writeFileSync(path.join(generatedRoot, fileName), body);
}

const sharedTypes = `export type UseCaseLink = { label: string; href: string };
export type UseCaseTab = {
  label: string;
  code: string;
  language: string;
  highlightedHtml: string;
  image: string;
};
export type UseCaseCard = {
  title: string;
  body: string[];
  linkLabel: string;
  linkHref: string;
};
export type UseCaseGroupedItem = {
  id: string;
  title: string;
  descriptionHtml: string;
  image?: string;
  links: UseCaseLink[];
  code: string;
  language: string;
  highlightedHtml: string;
  tabs: UseCaseTab[];
};
export type UseCaseCompareItem = {
  id: string;
  title: string;
  descriptionHtml: string;
  leftLabel: string;
  leftCode: string;
  leftLanguage: string;
  leftHighlightedHtml: string;
  rightLabel: string;
  rightCode: string;
  rightLanguage: string;
  rightHighlightedHtml: string;
};
export type UseCaseCodeCompare = {
  leftLabel: string;
  leftCode: string;
  leftLanguage: string;
  leftHighlightedHtml: string;
  rightLabel: string;
  rightCode: string;
  rightLanguage: string;
  rightHighlightedHtml: string;
};
export type UseCaseSection = {
  type:
    | 'codeDiagramSplit'
    | 'singleCode'
    | 'tabbedCode'
    | 'imageTabs'
    | 'codeImageSplit'
    | 'challengeCards'
    | 'groupedBlades'
    | 'codeCompare'
    | 'comparisonPairs';
  id: string;
  title: string;
  descriptionHtml: string;
  image?: string;
  links: UseCaseLink[];
  code: string;
  language: string;
  highlightedHtml: string;
  tabs: UseCaseTab[];
  cards: UseCaseCard[];
  items: UseCaseGroupedItem[];
  compareItems: UseCaseCompareItem[];
  compare?: UseCaseCodeCompare;
};

export type UseCasePageData = {
  title: string;
  slug: string;
  description: string;
  hero: {
    eyebrow: string;
    body: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
  };
  sections: UseCaseSection[];
};\n\n`;

async function main() {
  writeTsModule(
    'useCasesListing.ts',
    'useCasesListing',
    createUseCasesListing(),
    `export type UseCaseListingItem = {
  slug: string;
  title: string;
  description: string;
  logo: string;
  href: string;
  external: boolean;
};\n\n`,
  );

  writeTsModule('useCaseAiData.ts', 'useCaseAiData', await createManifestBackedPageData('ai'), sharedTypes);
  writeTsModule(
    'useCaseIntegrationData.ts',
    'useCaseIntegrationData',
    await createManifestBackedPageData('integration'),
    sharedTypes,
  );
  writeTsModule('useCaseB2bData.ts', 'useCaseB2bData', await createManifestBackedPageData('b2b'), sharedTypes);
  writeTsModule('useCaseEtlData.ts', 'useCaseEtlData', await createManifestBackedPageData('etl'), sharedTypes);
  writeTsModule('useCaseEdaData.ts', 'useCaseEdaData', await createManifestBackedPageData('eda'), sharedTypes);
  writeTsModule(
    'useCaseHealthcareData.ts',
    'useCaseHealthcareData',
    await createManifestBackedPageData('healthcare'),
    sharedTypes,
  );
  writeTsModule('useCaseBffData.ts', 'useCaseBffData', await createManifestBackedPageData('bff'), sharedTypes);
  writeTsModule(
    'useCaseMicroservicesData.ts',
    'useCaseMicroservicesData',
    await createManifestBackedPageData('microservices'),
    sharedTypes,
  );
  writeTsModule(
    'useCaseDataOrientedProgrammingData.ts',
    'useCaseDataOrientedProgrammingData',
    await createManifestBackedPageData('data-oriented-programming'),
    sharedTypes,
  );
  writeTsModule(
    'useCaseSalesforceData.ts',
    'useCaseSalesforceData',
    await createManifestBackedPageData('salesforce'),
    sharedTypes,
  );
  writeTsModule(
    'useCaseApolloGraphqlComparisonData.ts',
    'useCaseApolloGraphqlComparisonData',
    await createManifestBackedPageData('ballerina-vs-apollo-for-graphql'),
    sharedTypes,
  );
  writeTsModule(
    'useCaseJavaComparisonData.ts',
    'useCaseJavaComparisonData',
    await createManifestBackedPageData('ballerina-vs-java-for-data-oriented-programming'),
    sharedTypes,
  );

  console.log('Imported use-case content -> generated use-case data');
}

await main();
