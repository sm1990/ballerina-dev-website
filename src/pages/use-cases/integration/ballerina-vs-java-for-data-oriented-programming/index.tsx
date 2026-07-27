import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseJavaComparisonData from '@site/src/generated/useCaseJavaComparisonData';

export default function JavaComparisonPage(): ReactNode {
  return <UseCasePage data={useCaseJavaComparisonData} />;
}
