import Link from '@docusaurus/Link';

import styles from './index.module.css';

type Props = {
  compact?: boolean;
};

export default function NewsletterSubscription({compact = false}: Props) {
  return (
    <section className={`${styles.card}${compact ? ` ${styles.compact}` : ''}`}>
      <p className={styles.eyebrow}>Stay in the loop</p>
      <h2 className={styles.title}>Subscribe to the Ballerina newsletter</h2>
      <p className={styles.description}>
        Get hand-picked content and the latest Ballerina updates delivered to your inbox.
      </p>
      <div className={styles.actions}>
        <Link
          className="button button--primary button--lg"
          href="https://resources.wso2.com/l/142131/2022-01-05/b3x14k">
          Subscribe
        </Link>
      </div>
    </section>
  );
}
