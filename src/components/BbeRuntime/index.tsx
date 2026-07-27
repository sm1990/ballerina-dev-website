import React from 'react';
import clsx from 'clsx';

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export function Container({className, children, ...props}: DivProps) {
  return (
    <div className={clsx('bbe-container', className)} {...props}>
      {children}
    </div>
  );
}

export function Row({className, children, ...props}: DivProps) {
  return (
    <div className={clsx('bbe-row', className)} {...props}>
      {children}
    </div>
  );
}

export function Col({className, children, ...props}: DivProps) {
  return (
    <div className={clsx('bbe-col', className)} {...props}>
      {children}
    </div>
  );
}

export function sanitizeHtml(html: string) {
  if (/<(?:pre|code|span|div)\b/i.test(html)) {
    return html;
  }

  const escaped = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return `<pre class="bbeHighlightedCode"><code>${highlightBallerina(escaped)}</code></pre>`;
}

function highlightBallerina(escapedCode: string) {
  const placeholders: string[] = [];
  const stash = (className: string, value: string) => {
    const index = placeholders.length;
    placeholders.push(`<span class="${className}">${value}</span>`);
    return `\uE000${encodePlaceholderIndex(index)}\uE001`;
  };

  let highlighted = escapedCode
    .replace(/(&quot;(?:\\.|(?!&quot;)[\s\S])*?&quot;)/g, (value) =>
      stash('bbeTokenString', value),
    )
    .replace(/(\/\/.*)$/gm, (value) => stash('bbeTokenComment', value))
    .replace(/(&(?:#[0-9]+|[a-zA-Z]+);)/g, (value) => stash('bbeTokenEntity', value));

  highlighted = highlighted
    .replace(/\b([A-Za-z_]\w*)(?=\s*\()/g, (value) => stash('bbeTokenFunction', value))
    .replace(
      /\b(import|public|function|service|resource|returns|return|if|else|foreach|while|from|where|select|check|new|type|record|final|const|isolated|on|client|listener|true|false|error|map|json|xml|string|int|float|decimal|boolean|var)\b/g,
      (value) => stash('bbeTokenKeyword', value),
    )
    .replace(/:/g, (value) => stash('bbeTokenKeyword', value))
    .replace(/\b(\d+(?:\.\d+)?)\b/g, (value) => stash('bbeTokenNumber', value));

  return highlighted.replace(/\uE000([a-z]+)\uE001/g, (_, index) => {
    return placeholders[decodePlaceholderIndex(index)] ?? '';
  });
}

function encodePlaceholderIndex(index: number) {
  let value = index;
  let encoded = '';

  do {
    encoded = String.fromCharCode(97 + (value % 26)) + encoded;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);

  return encoded;
}

function decodePlaceholderIndex(encoded: string) {
  let value = 0;

  for (const char of encoded) {
    value = value * 26 + (char.charCodeAt(0) - 96);
  }

  return value - 1;
}
