import type {ReactNode} from 'react';
import UseCasePage from '@site/src/components/use-cases/UseCasePage';
import useCaseSalesforceData from '@site/src/generated/useCaseSalesforceData';

export default function SalesforceUseCasePage(): ReactNode {
  return <UseCasePage data={useCaseSalesforceData} />;
}
