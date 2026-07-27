import type {ReactNode} from 'react';

import styles from './index.module.css';

type Item = {
  label: string;
  href?: string;
};

type Props = {
  items: Item[];
};

function HomeIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" className={styles.homeIcon} aria-hidden="true">
      <path
        d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BreadcrumbTrail({items}: Props): ReactNode {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={`theme-doc-breadcrumbs ${styles.container}`} aria-label="Breadcrumbs">
      <ul className="breadcrumbs">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={`breadcrumbs__item${isLast ? ' breadcrumbs__item--active' : ''}`}>
              {item.href && !isLast ? (
                <a
                  className="breadcrumbs__link"
                  href={item.href}
                  aria-label={isFirst ? 'Home page' : item.label}>
                  {isFirst ? <HomeIcon /> : item.label}
                </a>
              ) : (
                <span className="breadcrumbs__link">
                  {isFirst ? <HomeIcon /> : item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
