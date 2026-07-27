import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseB2bData from '@site/src/generated/useCaseB2bData';

export default function B2bUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseB2bData} />;
}
