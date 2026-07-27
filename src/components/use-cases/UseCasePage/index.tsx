import {useRef, useState} from 'react';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BreadcrumbTrail from '@site/src/components/BreadcrumbTrail';
import type {
  UseCasePageData,
  UseCaseSection,
  UseCaseCard,
  UseCaseGroupedItem,
  UseCaseCompareItem,
} from '@site/src/generated/useCaseAiData';

import styles from './index.module.css';

function DownloadIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        d="M12 3v10m0 0 4-4m-4 4-4-4M5 19h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.82c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.76 0 3.97-2.35 4.83-4.59 5.09.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
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

function LinkList({links}: {links: {label: string; href: string}[]}): ReactNode {
  if (links.length === 0) return null;
  return (
    <div className={styles.linkList}>
      {links.map((link) => {
        const isGitHubLink = /github/i.test(link.label) || /github\.com/i.test(link.href);
        return (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className={`${styles.linkCard}${isGitHubLink ? ` ${styles.linkCardGithub}` : ''}`}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
            {isGitHubLink ? <GitHubIcon /> : null}
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}

function SampleLinkList({links}: {links: {label: string; href: string}[]}): ReactNode {
  if (links.length === 0) return null;

  return (
    <div className={styles.sampleLinkList}>
      {links.map((link) => (
        <div key={`${link.label}-${link.href}`} className={styles.sampleLinkRow}>
          <span className={styles.sampleLinkLabel}>{link.label}</span>
          <a
            href={link.href}
            className={styles.sampleLinkButton}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
            View code on GitHub
          </a>
        </div>
      ))}
    </div>
  );
}

function CodePanel({
  code,
  highlightedHtml,
}: {
  code: string;
  highlightedHtml: string;
}): ReactNode {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className={styles.codePanel}>
      <div className={styles.codePanelActions}>
        <button
          type="button"
          className={styles.copyButton}
          onClick={() => void handleCopy()}
          aria-label={copied ? 'Code copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy'}>
          <CopyIcon />
        </button>
      </div>
      <div className={styles.shikiBlock} dangerouslySetInnerHTML={{__html: highlightedHtml}} />
    </div>
  );
}

function CompareCodePanel({
  label,
  code,
  highlightedHtml,
}: {
  label: string;
  code: string;
  highlightedHtml: string;
}): ReactNode {
  return (
    <div className={styles.comparePanel}>
      <div className={styles.compareLabel}>{label}</div>
      <CodePanel code={code} highlightedHtml={highlightedHtml} />
    </div>
  );
}

function ImagePanel({src, alt}: {src: string; alt: string}): ReactNode {
  return (
    <div className={styles.imagePanel}>
      <img src={src} alt={alt} className={styles.panelImage} />
    </div>
  );
}

function CodeDiagramPanel({
  code,
  highlightedHtml,
  image,
  alt,
}: {
  code: string;
  highlightedHtml: string;
  image: string;
  alt: string;
}): ReactNode {
  const [mobileView, setMobileView] = useState<'code' | 'diagram'>('code');
  const [splitRatio, setSplitRatio] = useState(54);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  function updateSplit(clientX: number) {
    const element = wrapperRef.current;
    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const nextRatio = ((clientX - bounds.left) / bounds.width) * 100;
    setSplitRatio(Math.min(72, Math.max(32, nextRatio)));
  }

  return (
    <div className={styles.diagramExperience}>
      <div
        ref={wrapperRef}
        className={styles.diagramDesktop}
        style={{'--diagram-split': `${splitRatio}%`} as React.CSSProperties}
        onPointerMove={(event) => {
          if (!draggingRef.current) {
            return;
          }
          updateSplit(event.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerLeave={() => {
          draggingRef.current = false;
        }}>
        <div className={styles.diagramCodePane}>
          <div className={styles.diagramPaneLabel}>Code</div>
          <CodePanel code={code} highlightedHtml={highlightedHtml} />
        </div>
        <button
          type="button"
          className={styles.diagramHandle}
          aria-label="Resize code and diagram panels"
          onPointerDown={(event) => {
            draggingRef.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            updateSplit(event.clientX);
          }}
          onPointerUp={(event) => {
            draggingRef.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}>
          <span className={styles.diagramHandleKnob} />
        </button>
        <div className={styles.diagramImagePane}>
          <div className={styles.diagramPaneLabel}>Diagram</div>
          <ImagePanel src={image} alt={alt} />
        </div>
      </div>

      <div className={styles.diagramMobile}>
        <div className={styles.diagramMobileTabs} role="tablist" aria-label="Code and diagram views">
          <button
            type="button"
            role="tab"
            aria-selected={mobileView === 'code'}
            className={`${styles.diagramMobileTab}${mobileView === 'code' ? ` ${styles.diagramMobileTabActive}` : ''}`}
            onClick={() => setMobileView('code')}>
            Code
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileView === 'diagram'}
            className={`${styles.diagramMobileTab}${mobileView === 'diagram' ? ` ${styles.diagramMobileTabActive}` : ''}`}
            onClick={() => setMobileView('diagram')}>
            Diagram
          </button>
        </div>
        {mobileView === 'code' ? (
          <CodePanel code={code} highlightedHtml={highlightedHtml} />
        ) : (
          <ImagePanel src={image} alt={alt} />
        )}
      </div>
    </div>
  );
}

function ChallengeCards({cards}: {cards: UseCaseCard[]}): ReactNode {
  return (
    <div className={styles.challengeGrid}>
      {cards.map((card) => (
        <article key={card.title} className={styles.challengeCard}>
          <Heading as="h3" className={styles.challengeTitle}>
            {card.title}
          </Heading>
          <div className={styles.challengeBody}>
            {card.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a href={card.linkHref} className={styles.challengeLink} target="_blank" rel="noreferrer">
            {card.linkLabel}
          </a>
        </article>
      ))}
    </div>
  );
}

function renderTabsOrCode(item: {
  id?: string;
  code: string;
  highlightedHtml: string;
  tabs: {label: string; code: string; highlightedHtml: string; image: string}[];
}): ReactNode {
  if (item.tabs.length > 0) {
    return (
      <Tabs groupId={item.id || item.tabs[0]?.label || 'grouped-tabs'} defaultValue={item.tabs[0]?.label}>
        {item.tabs.map((tab) => (
          <TabItem key={tab.label} value={tab.label} label={tab.label}>
            {tab.code ? <CodePanel code={tab.code} highlightedHtml={tab.highlightedHtml} /> : null}
            {!tab.code && tab.image ? <ImagePanel src={tab.image} alt={tab.label} /> : null}
          </TabItem>
        ))}
      </Tabs>
    );
  }

  return item.code ? <CodePanel code={item.code} highlightedHtml={item.highlightedHtml} /> : null;
}

function GroupedBladeItem({item}: {item: UseCaseGroupedItem}): ReactNode {
  return (
    <div className={styles.groupedItem}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionCopy}>
          <Heading as="h3" id={item.id} className={styles.groupedItemTitle}>
            {item.title}
          </Heading>
          {item.descriptionHtml ? (
            <div className={styles.description} dangerouslySetInnerHTML={{__html: item.descriptionHtml}} />
          ) : null}
          <LinkList links={item.links} />
        </div>
        <div className={styles.sectionVisual}>
          {renderTabsOrCode(item)}
          {!item.code && item.tabs.length === 0 && item.image ? (
            <ImagePanel src={item.image} alt={item.title} />
          ) : null}
          {item.code && item.image ? <ImagePanel src={item.image} alt={item.title} /> : null}
        </div>
      </div>
    </div>
  );
}

function ComparisonPair({item}: {item: UseCaseCompareItem}): ReactNode {
  return (
    <div className={styles.comparisonPair}>
      <Heading as="h3" id={item.id} className={styles.groupedItemTitle}>
        {item.title}
      </Heading>
      {item.descriptionHtml ? (
        <div className={styles.description} dangerouslySetInnerHTML={{__html: item.descriptionHtml}} />
      ) : null}
      <div className={styles.compareGrid}>
        <CompareCodePanel
          label={item.leftLabel}
          code={item.leftCode}
          highlightedHtml={item.leftHighlightedHtml}
        />
        <CompareCodePanel
          label={item.rightLabel}
          code={item.rightCode}
          highlightedHtml={item.rightHighlightedHtml}
        />
      </div>
    </div>
  );
}

function renderPanel(section: UseCaseSection): ReactNode {
  switch (section.type) {
    case 'codeDiagramSplit':
      return section.code && section.image ? (
        <CodeDiagramPanel
          code={section.code}
          highlightedHtml={section.highlightedHtml}
          image={section.image}
          alt={section.title}
        />
      ) : null;
    case 'codeImageSplit':
      return (
        <div className={styles.stackPanel}>
          {section.code ? (
            <CodePanel code={section.code} highlightedHtml={section.highlightedHtml} />
          ) : null}
          {section.image ? <ImagePanel src={section.image} alt={section.title} /> : null}
        </div>
      );
    case 'singleCode':
      return section.code ? (
        <CodePanel code={section.code} highlightedHtml={section.highlightedHtml} />
      ) : null;
    case 'codeCompare':
      return section.compare ? (
        <div className={styles.compareGrid}>
          <CompareCodePanel
            label={section.compare.leftLabel}
            code={section.compare.leftCode}
            highlightedHtml={section.compare.leftHighlightedHtml}
          />
          <CompareCodePanel
            label={section.compare.rightLabel}
            code={section.compare.rightCode}
            highlightedHtml={section.compare.rightHighlightedHtml}
          />
        </div>
      ) : null;
    case 'tabbedCode':
      return (
        <Tabs groupId={section.id} defaultValue={section.tabs[0]?.label}>
          {section.tabs.map((tab) => (
            <TabItem key={tab.label} value={tab.label} label={tab.label}>
              <CodePanel code={tab.code} highlightedHtml={tab.highlightedHtml} />
            </TabItem>
          ))}
        </Tabs>
      );
    case 'imageTabs':
      return (
        <Tabs groupId={section.id} defaultValue={section.tabs[0]?.label}>
          {section.tabs.map((tab) => (
            <TabItem key={tab.label} value={tab.label} label={tab.label}>
              <ImagePanel src={tab.image} alt={`${section.title} - ${tab.label}`} />
            </TabItem>
          ))}
        </Tabs>
      );
    case 'groupedBlades':
      return null;
    default:
      return null;
  }
}

function renderSectionLinks(section: UseCaseSection): ReactNode {
  if (!section.links.length) {
    return null;
  }

  const useSampleLinks =
    (section.type === 'codeDiagramSplit' ||
      section.type === 'singleCode' ||
      section.type === 'tabbedCode') &&
    section.links.every((link) => /github\.com/i.test(link.href));

  if (useSampleLinks) {
    return <SampleLinkList links={section.links} />;
  }

  return <LinkList links={section.links} />;
}

function Section({section, alternate}: {section: UseCaseSection; alternate: boolean}): ReactNode {
  if (section.type === 'challengeCards') {
    return (
      <section className={`${styles.section}${alternate ? ` ${styles.sectionAlt}` : ''}`}>
        <div className="container">
          <Heading as="h2" id={section.id} className={styles.sectionTitle}>
            {section.title}
          </Heading>
          <ChallengeCards cards={section.cards} />
        </div>
      </section>
    );
  }

  if (section.type === 'groupedBlades') {
    return (
      <section className={`${styles.section}${alternate ? ` ${styles.sectionAlt}` : ''}`}>
        <div className="container">
          <Heading as="h2" id={section.id} className={styles.sectionTitle}>
            {section.title}
          </Heading>
          <div className={styles.groupedSection}>
            {section.items.map((item) => (
              <GroupedBladeItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'comparisonPairs') {
    return (
      <section className={`${styles.section}${alternate ? ` ${styles.sectionAlt}` : ''}`}>
        <div className="container">
          <div className={styles.sectionCopyWide}>
            <Heading as="h2" id={section.id} className={styles.sectionTitle}>
              {section.title}
            </Heading>
            {section.descriptionHtml ? (
              <div className={styles.description} dangerouslySetInnerHTML={{__html: section.descriptionHtml}} />
            ) : null}
            <LinkList links={section.links} />
          </div>
          <div className={styles.comparisonList}>
            {section.compareItems.map((item) => (
              <ComparisonPair key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.section}${alternate ? ` ${styles.sectionAlt}` : ''}`}>
      <div className="container">
        <div className={styles.sectionGrid}>
          <div className={styles.sectionCopy}>
            <Heading as="h2" id={section.id} className={styles.sectionTitle}>
              {section.title}
            </Heading>
            {section.descriptionHtml ? (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{__html: section.descriptionHtml}}
              />
            ) : null}
            {renderSectionLinks(section)}
          </div>
          <div className={styles.sectionVisual}>{renderPanel(section)}</div>
        </div>
      </div>
    </section>
  );
}

export default function UseCasePage({data}: {data: UseCasePageData}): ReactNode {
  return (
    <Layout title={data.title} description={data.description}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroTop}>
              <BreadcrumbTrail
                items={[
                  {label: 'Home', href: '/'},
                  {label: 'Use cases', href: '/use-cases/'},
                  {label: data.title},
                ]}
              />
            </div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <Heading as="h1" className={styles.heroTitle}>
                  {data.title}
                </Heading>
                <p className={styles.heroEyebrow}>{data.hero.eyebrow}</p>
                <p className={styles.heroBody}>{data.hero.body}</p>
                <a
                  href={data.hero.ctaHref}
                  className={`${styles.heroCta}${
                    /download/i.test(data.hero.ctaLabel) ? ` ${styles.heroCtaDownload}` : ''
                  }`}>
                  {/download/i.test(data.hero.ctaLabel) ? <DownloadIcon /> : null}
                  {data.hero.ctaLabel}
                </a>
              </div>
              <div className={styles.heroVisual}>
                <img src={data.hero.image} alt={data.title} className={styles.heroImage} />
              </div>
            </div>
          </div>
        </section>
        {data.sections.map((section, index) => (
          <Section key={section.id} section={section} alternate={index % 2 === 1} />
        ))}
      </main>
    </Layout>
  );
}
