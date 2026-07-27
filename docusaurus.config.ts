import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';

const config: Config = {
  title: 'Ballerina',
  tagline: 'The Ballerina programming language website',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://ballerina.io',
  baseUrl: '/',
  organizationName: 'ballerina-platform',
  projectName: 'ballerina-dev-website',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'policies',
        path: 'policy',
        routeBasePath: '/',
        sidebarPath: './sidebarsPolicies.ts',
        exclude: [
          'CODEOWNERS.md',
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**',
        ],
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'case-studies',
        path: 'case-studies-docs',
        routeBasePath: 'case-studies',
        sidebarPath: './sidebarsCaseStudies.ts',
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'release-notes',
        path: 'downloads',
        routeBasePath: 'downloads',
        include: [
          'swan-lake-release-notes/**/RELEASE_NOTE.md',
          '1.2.x-release-notes/*.md',
          '0.9.x-release-notes/**/RELEASE_NOTE.mdx',
          '1.0.x-release-notes/**/RELEASE_NOTE.mdx',
          '1.1.x-release-notes/**/RELEASE_NOTE.mdx',
        ],
        exclude: [
          '**/*template*.md',
          '**/*template*/**',
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**',
        ],
        sidebarPath: './sidebarsReleaseNotes.ts',
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn-tools',
        path: 'learn-tools-docs',
        routeBasePath: 'learn',
        sidebarPath: './sidebarsLearnTools.ts',
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bbe',
        path: 'bbe-docs',
        routeBasePath: 'learn/by-example',
        sidebarPath: './sidebarsBbe.ts',
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributions',
        path: 'contributions-docs',
        routeBasePath: 'contributions',
        sidebarPath: './sidebarsContributions.ts',
        editUrl:
          'https://github.com/ballerina-platform/ballerina-dev-website/tree/master/',
      } satisfies PluginContentDocs.Options,
    ],
  ],
  themeConfig: {
    image: 'img/ballerina-logo.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Ballerina',
        src: 'images/logo/ballerina-logo-grey.svg',
        srcDark: 'images/logo/ballerina-logo-white.svg',
      },
      items: [
        {type: 'custom-exploreMenu', label: 'Explore', position: 'left'},
        {to: '/learn', label: 'Learn', position: 'left'},
        {href: 'https://central.ballerina.io/', label: 'Packages', position: 'left'},
        {to: '/community', label: 'Community', position: 'left'},
        {href: 'https://blog.ballerina.io/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ballerina-platform/ballerina-dev-website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Why Ballerina',
          items: [
            {
              label: 'Why Ballerina',
              href: 'https://ballerina.io/why-ballerina/',
            },
            {
              label: 'Use cases',
              to: '/use-cases/',
            },
            {
              label: 'Case studies',
              to: '/case-studies/',
            },
            {
              label: 'Comparisons',
              to: '/use-cases/integration/ballerina-vs-apollo-for-graphql/',
            },
          ],
        },
        {
          title: 'Learn',
          items: [
            {
              label: 'Learn',
              to: '/learn',
            },
            {
              label: 'Ballerina by Example',
              to: '/learn/by-example/',
            },
            {
              label: 'VS Code extension',
              to: '/learn/vs-code-extension/',
            },
            {
              label: 'Specifications',
              to: '/learn/references/ballerina-specifications/',
            },
          ],
        },
        {
          title: 'Policies',
          items: [
            {
              label: 'Cookie policy',
              to: '/cookie-policy/',
            },
            {
              label: 'Privacy policy',
              to: '/privacy-policy/',
            },
            {
              label: 'Terms of service',
              to: '/terms-of-service/',
            },
            {
              label: 'Security policy',
              to: '/security-policy/',
            },
            {
              label: 'Trademark usage policy',
              to: '/trademark-usage-policy/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Community',
              to: '/community',
            },
            {
              label: 'Contributions',
              to: '/contributions/connector-contributor-guide/',
            },
            {
              label: 'Newsletter',
              to: '/community/ballerina-newsletter',
            },
            {
              label: 'Active Proposals',
              to: '/community/active-proposals',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Downloads',
              to: '/downloads',
            },
            {
              label: 'News',
              to: '/news',
            },
            {
              label: 'Blog',
              href: 'https://blog.ballerina.io/',
            },
            {
              label: 'Code of Conduct',
              to: '/code-of-conduct',
            },
            {
              label: 'Website license',
              to: '/license-of-site/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ballerina.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
