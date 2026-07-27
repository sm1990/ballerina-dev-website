import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../BreadcrumbTrail';
import RawHtml from '../RawHtml';
import styles from './index.module.css';

type Props = {
  title: string;
  description: string;
  intro: string;
  html: string;
};

export default function ActiveProposalsPage({title, description, intro, html}: Props) {
  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <div className="container">
          <div className={styles.topRow}>
            <div>
              <BreadcrumbTrail
                items={[
                  {label: 'Home', href: '/'},
                  {label: 'Active proposals'},
                ]}
              />
              <Heading as="h1" className={styles.title}>
                {title}
              </Heading>
              {intro ? <p className={styles.intro}>{intro}</p> : null}
            </div>
            <a
              className={styles.editLink}
              href="https://github.com/ballerina-platform/ballerina-dev-website/blob/master/community/proposals/active-proposals.md"
              target="_blank"
              rel="noreferrer">
              Edit on GitHub
            </a>
          </div>
          <div className={`${styles.content} markdown`}>
            <RawHtml html={html} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
