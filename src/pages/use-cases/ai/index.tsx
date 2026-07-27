import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseAiData from '@site/src/generated/useCaseAiData';

export default function AiUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseAiData} />;
}
