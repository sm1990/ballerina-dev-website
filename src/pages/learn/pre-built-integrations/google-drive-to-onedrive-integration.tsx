import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import {prebuiltIntegrationDetails} from '../../../generated/prebuiltIntegrationsData';
import styles from './detail.module.css';

const item = prebuiltIntegrationDetails["google-drive-to-onedrive-integration"];

export default function PrebuiltIntegrationPage(): JSX.Element {
  return (
    <Layout title={item.title} description={item.metaDescription}>
      <main className={styles.page}>
        <div className="container">
          <BreadcrumbTrail
            items={[
              {label: 'Home', href: '/'},
              {label: 'Learn', href: '/learn/'},
              {label: 'Pre-built integrations', href: '/learn/pre-built-integrations/'},
              {label: item.title},
            ]}
          />
          <Link to="/learn/pre-built-integrations/" className={styles.backLink}>Back to pre-built integrations</Link>
          <Heading as="h1" className={styles.title}>{item.title}</Heading>
          <section className={styles.hero}>
            <div className={styles.copy}>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>
            {item.flowDiagram && (
              <div className={styles.diagramPanel}>
                <img src={item.flowDiagram} alt={`${item.title} flow diagram`} className={styles.diagramImage} />
              </div>
            )}
          </section>
          <Tabs className={styles.tabs}>
            <TabItem value="code" label="Code" default>
              <div className={styles.codePanel}>
                {item.githubUrl && (
                  <div className={styles.codeActions}>
                    <a href={item.githubUrl} target="_blank" rel="noreferrer" className={styles.githubLink}>
                      View source on GitHub
                    </a>
                  </div>
                )}
                <CodeBlock language="ballerina">{item.code}</CodeBlock>
              </div>
            </TabItem>
            {item.sequenceDiagram && (
              <TabItem value="diagram" label="Diagram">
                <div className={styles.sequencePanel}>
                  <img src={item.sequenceDiagram} alt={`${item.title} sequence diagram`} className={styles.diagramImage} />
                </div>
              </TabItem>
            )}
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
