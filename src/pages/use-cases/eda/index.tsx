import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseEdaData from '@site/src/generated/useCaseEdaData';

export default function EdaUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseEdaData} />;
}
