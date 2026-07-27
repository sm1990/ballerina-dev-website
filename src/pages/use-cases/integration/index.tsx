import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseIntegrationData from '@site/src/generated/useCaseIntegrationData';

export default function IntegrationUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseIntegrationData} />;
}
