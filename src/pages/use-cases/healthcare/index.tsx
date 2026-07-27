import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseHealthcareData from '@site/src/generated/useCaseHealthcareData';

export default function HealthcareUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseHealthcareData} />;
}
