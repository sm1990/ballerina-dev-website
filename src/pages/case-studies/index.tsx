import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '@site/src/components/BreadcrumbTrail';
import caseStudies from '@site/src/generated/caseStudiesIndexData';

import styles from './index.module.css';

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  intro: string;
  logo: string;
  href: string;
  isExternal: boolean;
};

export default function CaseStudiesIndexPage(): ReactNode {
  const items = caseStudies as CaseStudy[];

  return (
    <Layout
      title="Case studies"
      description="Discover how Ballerina is used in real-world cloud-native integration projects.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Case studies'}]} />
            <Heading as="h1" className={styles.title}>
              Case studies
            </Heading>
            <p className={styles.description}>
              Discover how teams use Ballerina to modernize internal systems,
              build integration layers, and ship reliable cloud-native solutions.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              {items.map((item) => (
                <a
                  key={item.id}
                  className={styles.card}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noreferrer' : undefined}>
                  <div className={styles.logoWrap}>
                    {item.logo ? <img src={item.logo} alt="" className={styles.logo} /> : null}
                  </div>
                  <Heading as="h2" className={styles.cardTitle}>
                    {item.title}
                  </Heading>
                  <p className={styles.cardDescription}>{item.description || item.intro}</p>
                  <span className={styles.cardLink}>
                    {item.isExternal ? 'Open case study' : 'Read case study'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
