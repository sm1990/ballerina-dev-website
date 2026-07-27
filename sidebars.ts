import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  migrationSidebar: [
    'intro',
    'migration-plan',
    'url-strategy',
    'deployment-flow',
    {
      type: 'category',
      label: 'Inventories',
      items: ['inventories/content-audit'],
    },
  ],
};

export default sidebars;
