import type {ReactNode} from 'react';
import UseCaseLanding from '@site/src/components/use-cases/UseCaseLanding';
import useCasesListing from '@site/src/generated/useCasesListing';

export default function UseCasesIndexPage(): ReactNode {
  return <UseCaseLanding items={useCasesListing} />;
}
