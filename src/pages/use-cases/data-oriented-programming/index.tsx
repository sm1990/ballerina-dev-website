import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseDataOrientedProgrammingData from '@site/src/generated/useCaseDataOrientedProgrammingData';

export default function DataOrientedProgrammingUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseDataOrientedProgrammingData} />;
}
