import React, {isValidElement, type ReactNode} from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import ShikiCodeBlock from '@site/src/components/ShikiCodeBlock';
import type {Props} from '@theme/CodeBlock';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPlainCodeHtml(code: string) {
  return `<pre class="plainCodeBlock" tabindex="0"><code>${code
    .split('\n')
    .map((line) => `<span class="line"><span>${escapeHtml(line)}</span></span>`)
    .join('\n')}</code></pre>`;
}

function maybeStringifyChildren(children: ReactNode): ReactNode {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }

  return Array.isArray(children) ? children.join('') : children;
}

function hasExplicitLanguage(props: Props) {
  const className = typeof props.className === 'string' ? props.className : '';
  const language = typeof props.language === 'string' ? props.language.trim() : '';
  return language.length > 0 || /\blanguage-\S+/.test(className);
}

export default function CodeBlock(props: Props): ReactNode {
  const children = maybeStringifyChildren(props.children);

  if (!hasExplicitLanguage(props) && typeof children === 'string') {
    return (
      <ShikiCodeBlock
        html={renderPlainCodeHtml(children)}
        code={children}
        stripPrompt
      />
    );
  }

  return <OriginalCodeBlock {...props} />;
}
