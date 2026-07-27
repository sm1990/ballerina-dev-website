import BreadcrumbTrail from '../BreadcrumbTrail';
import styles from './index.module.css';

type Props = {
  title: string;
  issue: string;
};

export default function NewsletterIssueLead({title}: Props) {
  return (
    <header className={styles.header}>
      <BreadcrumbTrail
        items={[
          {label: 'Home', href: '/'},
          {label: 'Ballerina newsletter', href: '/community/ballerina-newsletter/'},
          {label: title},
        ]}
      />
    </header>
  );
}
