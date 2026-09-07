import { PendingOrderCardSkeleton } from './PendingOrderCardSkeleton';

export const PendingOrdersSectionSkeleton = ({ count = 2 }) => (
  <div aria-busy="true" aria-live="polite">
    <div className="mb-6 text-center lg:text-left">
      <div className="mx-auto h-6 w-52 animate-pulse rounded bg-surface-muted lg:mx-0" />
      <div className="mx-auto mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-surface-muted lg:mx-0" />
    </div>

    <div className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, index) => (
        <PendingOrderCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
