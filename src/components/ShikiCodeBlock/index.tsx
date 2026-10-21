import React, {useState} from 'react';

type Props = {
  html: string;
  code: string;
  stripPrompt?: boolean;
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="shikiCodeIcon">
      <path
        d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="shikiCodeIcon">
      <path
        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        fill="currentColor"
      />
    </svg>
  );
}

function getCopyText(code: string, stripPrompt?: boolean) {
  if (!stripPrompt) {
    return code;
  }

  return code.replace(/^\s*\$\s?/gm, '');
}

export default function ShikiCodeBlock({html, code, stripPrompt}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(getCopyText(code, stripPrompt));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="shikiCodePanel">
      <div className="shikiCodeActions">
        <button
          type="button"
          className="shikiCodeCopyButton"
          onClick={() => void handleCopy()}
          aria-label={copied ? 'Code copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy'}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div className="shikiCodeBlock" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}
