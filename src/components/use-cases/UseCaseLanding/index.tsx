import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BreadcrumbTrail from '@site/src/components/BreadcrumbTrail';
import type {UseCaseListingItem} from '@site/src/generated/useCasesListing';

import styles from './index.module.css';

export default function UseCaseLanding({
  items,
}: {
  items: UseCaseListingItem[];
}): ReactNode {
  const visibleItems = items.filter((item) => item.slug !== 'salesforce');

  return (
    <Layout
      title="Use cases"
      description="Explore practical use cases for the Ballerina programming language across integration, AI, healthcare, event-driven systems, and more.">
      <main className={styles.page}>
        <div className="container">
          <div className={styles.content}>
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Use cases'}]} />
            <header className={styles.header}>
              <Heading as="h1" className={styles.title}>
                Use cases
              </Heading>
              <p className={styles.description}>
                Explore practical scenarios and architectural patterns where Ballerina helps
                teams build integration-heavy, cloud-native systems with less friction.
              </p>
            </header>
            <div className={styles.grid}>
              {visibleItems.map((item) => (
                <a
                  key={item.slug}
                  className={styles.card}
                  aria-label={`Learn more about ${item.title}`}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}>
                  <div className={styles.cardImageWrap}>
                    <img src={item.logo} alt="" className={styles.cardImage} />
                  </div>
                  <div className={styles.cardBody}>
                    <Heading as="h2" className={styles.cardTitle}>
                      {item.title}
                    </Heading>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                  <span className={styles.cardLink}>Learn more</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
