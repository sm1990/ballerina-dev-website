import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '@site/src/components/BreadcrumbTrail';

import styles from './index.module.css';

type Props = {
  title: string;
  intro?: string;
  logo?: string;
};

export default function CaseStudyLead({title, intro, logo}: Props): ReactNode {
  if (!intro && !logo) {
    return null;
  }

  return (
    <section className={styles.lead} aria-label={`${title} overview`}>
      <BreadcrumbTrail
        items={[
          {label: 'Home', href: '/'},
          {label: 'Case studies', href: '/case-studies/'},
          {label: title},
        ]}
      />
      <Heading as="h1" className={styles.title}>
        {title}
      </Heading>
      {logo ? (
        <div className={styles.logoWrap}>
          <img src={logo} alt={`${title} logo`} className={styles.logo} />
        </div>
      ) : null}
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </section>
  );
}
