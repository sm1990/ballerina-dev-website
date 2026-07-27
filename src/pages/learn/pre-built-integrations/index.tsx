import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {prebuiltIntegrationItems} from '../../../generated/prebuiltIntegrationsData';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import styles from './index.module.css';

const allTags = Array.from(new Set(prebuiltIntegrationItems.flatMap((item) => item.tags))).sort();

export default function PrebuiltIntegrationsIndex(): JSX.Element {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const visibleItems = React.useMemo(() => {
    if (!selectedTags.length) {
      return prebuiltIntegrationItems;
    }
    return prebuiltIntegrationItems.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)));
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <Layout title="Pre-built integrations" description="These pre-built integration samples are built using Ballerina connectors and can be used as a starting point for your integration use cases.">
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Learn', href: '/learn/'}, {label: 'Pre-built integrations'}]} />
          <Heading as="h1" className={styles.title}>Pre-built integrations</Heading>
          <p className={styles.description}>
            These pre-built integration samples are built using Ballerina connectors and can be used as a starting point for your integration use cases.
          </p>
          <div className={styles.tagRow}>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button key={tag} type="button" className={isSelected ? styles.activeTag : styles.tag} onClick={() => toggleTag(tag)}>
                  {tag}
                </button>
              );
            })}
          </div>
          <div className={styles.grid}>
            {visibleItems.map((item) => (
              <Link key={item.slug} to={`/learn/pre-built-integrations/${item.slug}/`} className={styles.card}>
                <div className={styles.cardBody}>
                  <Heading as="h2" className={styles.cardTitle}>{item.name}</Heading>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <div className={styles.cardTags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
