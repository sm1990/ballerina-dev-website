import Layout from '@theme/Layout';

import NewsletterIssueLead from '../NewsletterIssueLead';
import NewsletterSubscription from '../NewsletterSubscription';
import RawHtml from '../RawHtml';
import styles from './index.module.css';

type Props = {
  title: string;
  issue: string;
  description: string;
  html: string;
};

export default function NewsletterIssuePage({title, issue, description, html}: Props) {
  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <div className="container">
          <div className={styles.grid}>
            <article className={styles.content}>
              <NewsletterIssueLead title={title} issue={issue} />
              <div className={`${styles.body} markdown`}>
                <RawHtml html={html} />
              </div>
            </article>
            <aside className={styles.aside}>
              <div className={styles.sticky}>
                <NewsletterSubscription />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
}
