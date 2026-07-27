import {useEffect, useState} from 'react';
import type {KeyboardEvent} from 'react';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import samples from '@site/src/generated/ballerinaInActionSamples';

import styles from './index.module.css';

type ActionSample = {
  slug: string;
  title: string;
  code: string;
  language: string;
  githubUrl: string;
  highlightedHtml: string;
  diagram?: string;
  diagramAlt?: string;
  secondaryTitle?: string;
  secondaryCode?: string;
  secondaryHighlightedHtml?: string;
  secondaryLanguage?: string;
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.toolbarIcon}>
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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.toolbarIcon}>
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.08.63-.2.63-.45 0-.22-.01-.95-.01-1.73-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.02-1.35-1.02-1.35-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.82 1.42 2.16 1.01 2.69.77.08-.6.32-1.01.58-1.24-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.95-2.49-.1-.23-.41-1.17.09-2.43 0 0 .78-.25 2.56.95a8.9 8.9 0 0 1 4.66 0c1.78-1.2 2.56-.95 2.56-.95.5 1.26.19 2.2.09 2.43.59.65.95 1.48.95 2.49 0 3.55-2.17 4.34-4.23 4.56.34.29.63.86.63 1.74 0 1.26-.01 2.27-.01 2.58 0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ActionPanel({
  title,
  code,
  highlightedHtml,
  githubUrl,
  copyKey,
  copiedKey,
  onCopy,
}: {
  title?: string;
  code: string;
  highlightedHtml: string;
  githubUrl?: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (value: string, key: string) => Promise<void>;
}) {
  const displayTitle = title ?? 'main.bal';

  return (
    <div className={styles.panel}>
      <div className={styles.panelToolbar}>
        <span className={styles.panelTitle}>{displayTitle}</span>
        <div className={styles.panelActions}>
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.toolbarLink}>
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          ) : (
            <span className={styles.toolbarGhost} aria-hidden="true" />
          )}
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => void onCopy(code, copyKey)}>
            <CopyIcon />
            <span>{copiedKey === copyKey ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
      <div className={styles.codeBlock} dangerouslySetInnerHTML={{__html: highlightedHtml}} />
    </div>
  );
}

export default function BallerinaInAction() {
  const actionSamples = samples as ActionSample[];
  const [activeSlug, setActiveSlug] = useState(actionSamples[0]?.slug ?? '');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (actionSamples.some((sample) => sample.slug === hash)) {
      setActiveSlug(hash);
      document.getElementById('ballerina-in-action')?.scrollIntoView();
    }
  }, [actionSamples]);

  const activeSample =
    actionSamples.find((sample) => sample.slug === activeSlug) ?? actionSamples[0];

  async function handleCopy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1800);
  }

  function selectSample(slug: string) {
    setActiveSlug(slug);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${slug}`);
    }
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();

    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % actionSamples.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + actionSamples.length) % actionSamples.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = actionSamples.length - 1;
    }

    const nextSample = actionSamples[nextIndex];
    if (!nextSample) {
      return;
    }

    selectSample(nextSample.slug);
    document.getElementById(`ballerina-in-action-tab-${nextSample.slug}`)?.focus();
  }

  return (
    <section className={styles.section} id="ballerina-in-action">
      <div className="container">
        <div className={styles.sectionHeading}>
          <Heading as="h2" className={styles.title}>
            Ballerina in action
          </Heading>
          <p className={styles.description}>
            A curated set of runnable integration scenarios taken from the current
            homepage sample set, with generated content backed by source markdown
            in this repo.
          </p>
        </div>

        <div className={styles.tabRow} role="tablist" aria-label="Ballerina in action examples">
          {actionSamples.map((sample, index) => (
            <button
              key={sample.slug}
              id={`ballerina-in-action-tab-${sample.slug}`}
              type="button"
              role="tab"
              aria-selected={sample.slug === activeSample.slug}
              aria-controls={`ballerina-in-action-panel-${sample.slug}`}
              className={clsx(styles.tab, sample.slug === activeSample.slug && styles.tabActive)}
              tabIndex={sample.slug === activeSample.slug ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              onClick={() => selectSample(sample.slug)}>
              {sample.title}
            </button>
          ))}
        </div>

        <div
          className={styles.contentArea}
          id={`ballerina-in-action-panel-${activeSample.slug}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`ballerina-in-action-tab-${activeSample.slug}`}>
          {activeSample.secondaryCode ? (
            <div className={styles.dualCodeGrid}>
                <ActionPanel
                  title="main.bal"
                  code={activeSample.code}
                  highlightedHtml={activeSample.highlightedHtml}
                  githubUrl={activeSample.githubUrl}
                  copyKey={`${activeSample.slug}:primary`}
                  copiedKey={copiedKey}
                onCopy={handleCopy}
              />
                <ActionPanel
                  title={activeSample.secondaryTitle}
                  code={activeSample.secondaryCode}
                  highlightedHtml={activeSample.secondaryHighlightedHtml ?? ''}
                  copyKey={`${activeSample.slug}:secondary`}
                  copiedKey={copiedKey}
                  onCopy={handleCopy}
              />
            </div>
          ) : activeSample.diagram ? (
            <div className={styles.codeDiagramGrid}>
              <ActionPanel
                title="main.bal"
                code={activeSample.code}
                highlightedHtml={activeSample.highlightedHtml}
                githubUrl={activeSample.githubUrl}
                copyKey={`${activeSample.slug}:primary`}
                copiedKey={copiedKey}
                onCopy={handleCopy}
              />
              <div className={styles.diagramPanel}>
                <img src={activeSample.diagram} alt={activeSample.diagramAlt ?? activeSample.title} />
              </div>
            </div>
          ) : (
            <ActionPanel
              title="main.bal"
              code={activeSample.code}
              highlightedHtml={activeSample.highlightedHtml}
              githubUrl={activeSample.githubUrl}
              copyKey={`${activeSample.slug}:primary`}
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          )}
        </div>
      </div>
    </section>
  );
}
