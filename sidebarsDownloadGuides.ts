import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  downloadGuidesSidebar: [
    {
      type: 'link',
      label: 'Get started',
      href: '/learn/get-started/',
    },
    {
      type: 'link',
      label: 'Installation options',
      href: '/learn/install-ballerina/installation-options/',
    },
    'build-ballerina-from-source',
    'verify-ballerina-artifacts',
  ],
};

export default sidebars;
