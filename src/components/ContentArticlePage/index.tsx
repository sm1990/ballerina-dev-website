import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import DocSidebar from '@theme/DocSidebar';
import {useLocation} from '@docusaurus/router';
import clsx from 'clsx';

import BreadcrumbTrail from '../BreadcrumbTrail';
import styles from './index.module.css';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type TocItem = {
  id: string;
  value: string;
  level: number;
};

type SidebarItem = {
  type: 'link';
  label: string;
  href: string;
  autoAddBaseUrl?: boolean;
  docId?: string;
  unlisted?: boolean;
};

type Props = {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  html: string;
  toc?: TocItem[];
  sidebar?: SidebarItem[];
  className?: string;
};

export default function ContentArticlePage({
  title,
  description,
  breadcrumbs,
  html,
  toc = [],
  sidebar,
  className,
}: Props) {
  const {pathname} = useLocation();

  return (
    <Layout title={title} description={description}>
      <main className={clsx(styles.page, className)}>
        <div className={styles.layout}>
          {sidebar ? (
            <aside className={styles.sidebarShell}>
              <div className={styles.sidebarInner}>
                <DocSidebar sidebar={sidebar} path={pathname} />
              </div>
            </aside>
          ) : null}
          <div className={styles.contentShell}>
            <div className={styles.contentInner}>
              <article className={styles.mainColumn}>
                <BreadcrumbTrail items={breadcrumbs} />
                <div className={clsx('theme-doc-markdown', 'markdown', styles.markdown)}>
                  <header>
                    <Heading as="h1">{title}</Heading>
                  </header>
                  <div dangerouslySetInnerHTML={{__html: html}} />
                </div>
              </article>
              <div className={styles.tocColumn}>
                {toc.length > 0 ? (
                  <div className={styles.tocDesktop}>
                    <div className="tableOfContents_nGR0 thin-scrollbar theme-doc-toc-desktop">
                      <ul className="table-of-contents table-of-contents__left-border">
                        {toc.map((item) => (
                          <li
                            key={item.id}
                            className={item.level > 2 ? styles.tocNestedItem : undefined}
                          >
                            <a href={`#${item.id}`} className="table-of-contents__link toc-highlight">
                              {item.value}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
