import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {enterpriseIntegrationPatternMap} from '../../../generated/enterpriseIntegrationPatternsData';
import styles from './detail.module.css';

const pattern = enterpriseIntegrationPatternMap["message-store"];

export default function EnterpriseIntegrationPatternPage(): JSX.Element {
  return (
    <Layout title={pattern.name} description={pattern.description}>
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Enterprise Integration Patterns', href: '/learn/enterprise-integration-patterns/'},
              {label: pattern.name},
            ]}
          />
          <Link to="/learn/enterprise-integration-patterns/" className={styles.backLink}>Back to EIP</Link>
          <Heading as="h1" className={styles.title}>{pattern.name}</Heading>
          <div className={styles.summary}>
            <div className={styles.infoTable}>
              <div className={styles.row}>
                <div className={styles.label}>Pattern</div>
                <div className={styles.value}>
                  {pattern.description}{' '}
                  <a href={pattern.link} target="_blank" rel="noreferrer">Reference</a>
                </div>
              </div>
              {pattern.helps && (
                <div className={styles.row}>
                  <div className={styles.label}>How Ballerina helps</div>
                  <div className={styles.value} dangerouslySetInnerHTML={{__html: pattern.helps}} />
                </div>
              )}
            </div>
            <div className={styles.tagRow}>
              {pattern.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <Tabs className={styles.tabs}>
            {pattern.codeFiles.map((file, index) => (
              <TabItem key={file.name} value={file.name} label={file.name} default={index === 0}>
                <CodeBlock language={file.language}>{file.content}</CodeBlock>
              </TabItem>
            ))}
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
