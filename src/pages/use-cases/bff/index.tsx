import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseBffData from '@site/src/generated/useCaseBffData';

export default function BffUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseBffData} />;
}
