import {createHighlighter} from 'shiki';

let highlighterPromise;

const supportedLanguages = [
  'ballerina',
  'graphql',
  'typescript',
  'protobuf',
  'toml',
  'sql',
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
    if (explicitLanguage === 'ts') return 'typescript';
    if (explicitLanguage === 'proto') return 'protobuf';
    return explicitLanguage;
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

  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/im.test(source)) {
    return 'sql';
  }

  return 'ballerina';
}

export async function highlightCodeHtml(code, explicitLanguage) {
  const language = inferLanguage(code, explicitLanguage);
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
}
