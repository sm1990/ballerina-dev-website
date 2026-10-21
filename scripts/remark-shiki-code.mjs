import {highlightCodeHtml} from './lib/shiki-highlight.mjs';

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPlainCodeHtml(code) {
  const lines = code.split('\n');
  const renderedLines = lines
    .map((line) => `<span class="line"><span>${escapeHtml(line)}</span></span>`)
    .join('\n');

  return `<pre class="plainCodeBlock" tabindex="0"><code>${renderedLines}</code></pre>`;
}

function visitCodeNodes(node, visitor) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (node.type === 'code') {
    visitor(node);
    return;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visitCodeNodes(child, visitor);
    }
  }
}

export default function remarkShikiCode() {
  return async (tree) => {
    const codeNodes = [];
    visitCodeNodes(tree, (node) => codeNodes.push(node));

    await Promise.all(
      codeNodes.map(async (node) => {
        const language = typeof node.lang === 'string' ? node.lang.trim() : '';
        const hasLanguage = language.length > 0;
        const html = hasLanguage
          ? await highlightCodeHtml(node.value, language)
          : renderPlainCodeHtml(node.value);
        node.type = 'mdxJsxFlowElement';
        node.name = 'ShikiCodeBlock';
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'html',
            value: html,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'code',
            value: node.value,
          },
        ];
        if (!hasLanguage) {
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'stripPrompt',
          });
        }
        node.children = [];
        delete node.value;
        delete node.lang;
        delete node.meta;
      }),
    );
  };
}
