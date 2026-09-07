export const PendingOrderCardSkeleton = () => (
  <article
    className="flex animate-pulse flex-col rounded-xl border border-border bg-surface p-4 sm:p-5"
    aria-hidden="true"
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-36 rounded bg-surface-muted sm:h-3.5" />
        <div className="h-4 w-3/4 max-w-md rounded bg-surface-muted sm:h-5" />
        <div className="h-3 w-28 rounded bg-surface-muted" />
      </div>
      <div className="h-8 w-28 shrink-0 self-start rounded-lg bg-surface-muted" />
    </div>

    <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
      <div className="space-y-2">
        <div className="h-3 w-14 rounded bg-surface-muted" />
        <div className="h-4 w-24 rounded bg-surface-muted" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-14 rounded bg-surface-muted" />
        <div className="h-4 w-20 rounded bg-surface-muted" />
      </div>
    </div>

    <div className="mt-4 space-y-2 border-t border-border pt-4">
      <div className="h-3 w-full rounded bg-surface-muted" />
      <div className="h-3 w-5/6 rounded bg-surface-muted" />
    </div>

    <div className="mt-4 border-t border-border pt-4">
      <div className="h-11 w-full rounded-xl bg-surface-muted" />
    </div>
  </article>
);
