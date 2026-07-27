import {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

import {exploreMenuSections} from '@site/src/data/exploreMenu';

import styles from './index.module.css';

type ExploreNavbarItemProps = {
  label?: string;
  mobile?: boolean;
  position?: 'left' | 'right';
};

export default function ExploreNavbarItem({
  label = 'Explore',
  mobile,
  position,
}: ExploreNavbarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const mobileItems = useMemo(
    () =>
      exploreMenuSections.map((section) => ({
        label: section.title,
        items: [
          ...section.links.map((link) => ({label: link.label, to: link.to})),
          ...(section.more ? [{label: section.more.label, to: section.more.to}] : []),
        ],
      })),
    [],
  );

  if (mobile) {
    return (
      <DropdownNavbarItem
        label={label}
        items={mobileItems}
        position={position}
        className={styles.mobileDropdown}
      />
    );
  }

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimeout();
    setIsOpen(true);
  };

  const scheduleCloseMenu = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => () => clearCloseTimeout(), []);

  const closeIfFocusLeaves = (nextTarget: EventTarget | null) => {
    if (
      nextTarget instanceof Node &&
      wrapperRef.current?.contains(nextTarget)
    ) {
      return;
    }
    setIsOpen(false);
    clearCloseTimeout();
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.exploreItem}
      onBlur={(event) => closeIfFocusLeaves(event.relatedTarget)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          clearCloseTimeout();
        }
      }}>
      <button
        type="button"
        className={clsx('navbar__link', styles.exploreTrigger, isOpen && styles.exploreTriggerOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
        onClick={() => {
          clearCloseTimeout();
          setIsOpen((open) => !open);
        }}>
        <span>{label}</span>
        <span className={styles.caret} aria-hidden="true">
          ▾
        </span>
      </button>

      <div
        className={clsx(styles.panel, isOpen && styles.panelOpen)}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}>
        <div className={styles.panelGrid}>
          {exploreMenuSections.map((section) => (
            <div key={section.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{section.title}</h3>
              <div className={styles.linkList}>
                {section.links.map((link) => (
                  <Link key={link.label} className={styles.menuLink} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
              {section.more ? (
                <Link className={styles.moreLink} to={section.more.to}>
                  {section.more.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
