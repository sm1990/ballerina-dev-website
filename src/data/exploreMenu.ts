export type ExploreMenuLink = {
  label: string;
  to: string;
};

export type ExploreMenuSection = {
  title: string;
  links: ExploreMenuLink[];
  more?: ExploreMenuLink;
};

export const exploreMenuSections: ExploreMenuSection[] = [
  {
    title: 'Use cases',
    links: [
      {label: 'Integration', to: '/use-cases/integration/'},
      {label: 'AI', to: '/use-cases/ai/'},
      {label: 'Healthcare', to: '/use-cases/healthcare/'},
      {label: 'Data-oriented programming', to: '/use-cases/data-oriented-programming/'},
      {label: 'EDA', to: '/use-cases/eda/'},
    ],
    more: {label: 'See more', to: '/use-cases/'},
  },
  {
    title: 'Case studies',
    links: [
      {label: 'WSO2', to: '/case-studies/wso2/'},
      {label: 'FAT Tuesday', to: '/case-studies/fat-tuesday/'},
      {label: 'MOSIP', to: '/case-studies/mosip/'},
      {label: 'QHAna', to: '/case-studies/qhana/'},
      {label: 'Ballerina Central', to: '/case-studies/ballerina-central/'},
    ],
    more: {label: 'See more', to: '/case-studies/'},
  },
  {
    title: 'Comparisons',
    links: [
      {
        label: 'Ballerina vs. Apollo for GraphQL',
        to: '/use-cases/integration/ballerina-vs-apollo-for-graphql/',
      },
      {
        label: 'Ballerina vs. Java for data-oriented programming',
        to: '/use-cases/integration/ballerina-vs-java-for-data-oriented-programming/',
      },
    ],
  },
];
