import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  learnFoundationsSidebar: [
    'get-started',
    'installation-options',
    {
      type: 'link',
      label: 'Build Ballerina from source',
      href: '/downloads/installation-options/build-ballerina-from-source/',
    },
    {
      type: 'link',
      label: 'Verify Ballerina artifacts',
      href: '/downloads/verify-ballerina-artifacts/',
    },
  ],
};

export default sidebars;
