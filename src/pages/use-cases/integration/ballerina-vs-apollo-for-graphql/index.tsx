import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseApolloGraphqlComparisonData from '@site/src/generated/useCaseApolloGraphqlComparisonData';

export default function ApolloGraphqlComparisonPage(): ReactNode {
  return <UseCasePage data={useCaseApolloGraphqlComparisonData} />;
}
