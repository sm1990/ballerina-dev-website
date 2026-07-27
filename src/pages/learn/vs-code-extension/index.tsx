import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './index.module.css';
import features, {docsCtaHref, heroSlides} from '../../../data/vsCodeExtensionLanding';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            Code and visualize Ballerina
          </Heading>
          <p className={styles.heroText}>
            The VS Code extension provides robust language support with visualization and design tools for
            Ballerina.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="https://marketplace.visualstudio.com/items?itemName=WSO2.ballerina">
              Install the extension
            </Link>
            <Link className="button button--secondary button--lg" to={docsCtaHref}>
              See documentation
            </Link>
          </div>
        </div>
        <div className={styles.heroGallery} aria-hidden="true">
          {heroSlides.map((src, index) => (
            <img
              key={src}
              className={clsx(styles.heroSlide, styles[`heroSlide${index + 1}` as keyof typeof styles])}
              src={src}
              alt=""
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSection({
  id,
  title,
  description,
  links,
  images,
  reverse,
}: (typeof features)[number] & {reverse?: boolean}) {
  return (
    <section id={id} className={clsx(styles.featureSection, reverse && styles.featureSectionReverse)}>
      <div className={clsx('container', styles.featureInner)}>
        <div className={styles.featureText}>
          <Heading as="h2" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
          <div className={styles.featureLinks}>
            {links.map((link) => (
              <Link
                key={link.label}
                className={styles.featureLink}
                to={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.imagePanel}>
          {images.map((image) => (
            <figure key={image.src} className={styles.imageCard}>
              <img src={image.src} alt={image.alt} className={styles.image} />
              <figcaption className={styles.imageLabel}>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VsCodeExtensionPage() {
  return (
    <Layout
      title="Code and visualize Ballerina"
      description="The VS Code extension provides robust language support with visualization and design tools for Ballerina."
    >
      <Hero />
      {features.map((feature, index) => (
        <FeatureSection key={feature.id} reverse={index % 2 === 1} {...feature} />
      ))}
    </Layout>
  );
}
