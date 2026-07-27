import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseMicroservicesData from '@site/src/generated/useCaseMicroservicesData';

export default function MicroservicesUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseMicroservicesData} />;
}
