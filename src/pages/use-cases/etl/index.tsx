import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseEtlData from '@site/src/generated/useCaseEtlData';

export default function EtlUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseEtlData} />;
}
