import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {
  enterpriseIntegrationPatternCategories,
  enterpriseIntegrationPatterns,
} from '../../../generated/enterpriseIntegrationPatternsData';
import styles from './index.module.css';

const allTags = Array.from(new Set(enterpriseIntegrationPatterns.flatMap((item) => item.tags))).sort();

export default function EnterpriseIntegrationPatternsIndex(): JSX.Element {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const visibleCategories = React.useMemo(() => {
    return enterpriseIntegrationPatternCategories
      .map((category) => ({
        category: category.category,
        items: category.items.filter((item) => selectedTags.every((tag) => item.tags.includes(tag))),
      }))
      .filter((category) => category.items.length > 0);
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <Layout
      title="Enterprise Integration Patterns"
      description="Ballerina usage patterns and best practices for implementing enterprise integrations.">
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Enterprise Integration Patterns'},
            ]}
          />
          <Heading as="h1" className={styles.title}>Enterprise Integration Patterns</Heading>
          <p className={styles.description}>
            Ballerina usage patterns and best practices for implementing enterprise integrations. These patterns are based on the{' '}
            <a href="https://www.enterpriseintegrationpatterns.com/" target="_blank" rel="noreferrer">Enterprise Integration Patterns</a>{' '}
            book by Gregor Hohpe and Bobby Woolf. Each sample is a simplified version of a real-world integration scenario.
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
          {visibleCategories.map((category) => (
            <section key={category.category} className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>{category.category}</Heading>
              <div className={styles.grid}>
                {category.items.map((item) => (
                  <Link key={item.slug} to={`/learn/enterprise-integration-patterns/${item.slug}/`} className={styles.card}>
                    <div className={styles.cardBody}>
                      <div className={styles.iconWrap}>
                        <img src={item.icon} alt="" className={styles.icon} />
                      </div>
                      <div>
                        <Heading as="h3" className={styles.cardTitle}>{item.name}</Heading>
                        <p className={styles.cardDescription}>{item.description}</p>
                        <div className={styles.cardTags}>
                          {item.tags.map((tag) => (
                            <span key={tag} className={styles.cardTag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
