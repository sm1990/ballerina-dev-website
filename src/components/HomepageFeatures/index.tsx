import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Route parity first',
    description: (
      <>
        We are treating the existing ballerina.io URL structure as a contract.
        The migration will combine native Docusaurus permalinks, generated alias
        pages, and post-build path shaping where needed.
      </>
    ),
  },
  {
    title: 'Static deployment preserved',
    description: (
      <>
        The current staging and production pipeline is staying intact: build the
        static site for <code>gh-pages</code> in the website repo first, then
        sync it into <code>ballerina-platform.github.io</code> for production.
      </>
    ),
  },
  {
    title: 'Generated content stays generated',
    description: (
      <>
        Ballerina By Example, release-note style sections, and other data-driven
        areas will be rebuilt around scripts or plugins rather than converted by
        hand.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx('text--left padding-horiz--md', styles.featureCard)}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Migration foundations already captured
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
