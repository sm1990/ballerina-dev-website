import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import learnSections from '@site/src/data/learnLanding';

import styles from './index.module.css';

function titleToSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function LearnLandingPage() {
  const topSections = learnSections.filter((section) => (section.group || 'top') === 'top');
  const developmentSections = learnSections.filter(
    (section) => section.group === 'development-tutorials',
  );
  const resourceSections = learnSections.filter((section) => section.group === 'resources');

  const renderSectionCard = (section: (typeof learnSections)[number]) => (
    <article key={section.id} className={styles.card} id={section.id}>
      <div className={styles.cardHeader}>
        <a className={styles.anchor} href={`#${section.id}`}>
          {section.title}
        </a>
        <h2 className={styles.cardTitle}>{section.title}</h2>
        <p className={styles.cardDescription}>{section.description}</p>
      </div>

      <div className={styles.linkList}>
        {section.links.map((item) => {
          const key = `${section.id}-${titleToSlug(item.title)}`;
          const content = (
            <span>
              {item.title}
              {item.external ? (
                <span className={styles.externalMark} aria-hidden="true">
                  ↗
                </span>
              ) : null}
            </span>
          );

          return (
            <div key={key} className={styles.linkItem}>
              <Link
                className={styles.linkTitle}
                href={item.href}
                {...(item.external ? {target: '_blank', rel: 'noreferrer'} : undefined)}
              >
                {content}
              </Link>
              <p className={styles.linkBody}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </article>
  );

  return (
    <Layout
      title="Learn"
      description="Ballerina is a comprehensive language that is easy to grasp for anyone with prior programming experience. Start learning with the material below."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Learn</p>
              <h1 className={styles.title}>Learn Ballerina</h1>
              <p className={styles.lead}>
                Ballerina is a comprehensive language that is easy to grasp for anyone
                with prior programming experience. Start with the essentials, then move
                through integration workflows, tooling, and reference material.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              {topSections.map(renderSectionCard)}
            </div>

            <section className={styles.groupSection} aria-labelledby="development-tutorials-heading">
              <div className={styles.groupHeader}>
                <a className={styles.groupAnchor} href="#development-tutorials-heading">
                  Development tutorials
                </a>
                <h2 id="development-tutorials-heading" className={styles.groupTitle}>
                  Development tutorials
                </h2>
              </div>
              <div className={styles.grid}>{developmentSections.map(renderSectionCard)}</div>
            </section>

            <section className={styles.groupSection} aria-labelledby="resources-heading">
              <div className={styles.groupHeader}>
                <a className={styles.groupAnchor} href="#resources-heading">
                  Resources
                </a>
                <h2 id="resources-heading" className={styles.groupTitle}>
                  Resources
                </h2>
              </div>
              <div className={styles.grid}>{resourceSections.map(renderSectionCard)}</div>
            </section>

            <p className={styles.notice}>
              This migrated learn landing page already points to local Docusaurus routes where
              they exist today. The remaining links still open the current live Ballerina site
              until their corresponding sections are migrated.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
