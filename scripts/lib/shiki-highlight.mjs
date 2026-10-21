import {createHighlighter} from 'shiki';

let highlighterPromise;

const supportedLanguages = [
  'ballerina',
  'bash',
  'console',
  'graphql',
  'json',
  'markdown',
  'nginx',
  'properties',
  'protobuf',
  'shell',
  'shellscript',
  'sql',
  'toml',
  'typescript',
  'yaml',
];

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: supportedLanguages,
    });
  }

  return highlighterPromise;
}

export function inferLanguage(code, explicitLanguage) {
  if (explicitLanguage) {
    const language = explicitLanguage.toLowerCase();
    if (language === 'ts') return 'typescript';
    if (language === 'proto') return 'protobuf';
    if (language === 'sh') return 'bash';
    return language;
  }

  const source = code.trim();

  if (
    source.includes('syntax = "proto3"') ||
    source.includes("syntax = 'proto3'") ||
    source.includes('google/protobuf')
  ) {
    return 'protobuf';
  }

  if (
    source.includes("from '@apollo/server'") ||
    source.includes("from '@apollo/server/standalone'") ||
    source.includes("from 'express'") ||
    source.includes('const resolvers =') ||
    source.includes('await startStandaloneServer(')
  ) {
    return 'typescript';
  }

  if (source.includes('#graphql') || /^type\s+\w+\s*\{/m.test(source)) {
    return 'graphql';
  }

  if (source.includes('[package]') || /^org\s*=\s*".+"/m.test(source)) {
    return 'toml';
  }

  if (/^\s*\$ /m.test(source) || /^\s*(bal|git|curl|export|set|cd|mkdir|npm|pnpm)\b/m.test(source)) {
    return 'bash';
  }

  if (/^[\s\S]*\/\n[\s\S]*(├──|└──)/.test(source)) {
    return 'text';
  }

  if (/^\s*[{[]/.test(source)) {
    return 'json';
  }

  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/im.test(source)) {
    return 'sql';
  }

  return 'ballerina';
}

export async function highlightCodeHtml(code, explicitLanguage) {
  const language = inferLanguage(code, explicitLanguage);
  const highlighter = await getHighlighter();
  const options = {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  };

  try {
    return highlighter.codeToHtml(code, options);
  } catch {
    return highlighter.codeToHtml(code, {
      ...options,
      lang: 'text',
    });
  }
}
