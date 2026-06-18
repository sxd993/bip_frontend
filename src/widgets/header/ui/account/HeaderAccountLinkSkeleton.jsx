const accountLinkClassName =
  'inline-flex items-center gap-3 rounded-lg px-3 py-1.5 text-[15px] font-normal text-text';

export const HeaderAccountLinkSkeleton = ({ className }) => (
  <span
    className={[accountLinkClassName, className].filter(Boolean).join(' ')}
    aria-hidden="true"
  >
    <span className="h-5 w-5 shrink-0 rounded bg-surface-muted" />
    <span className="h-4 w-20 rounded bg-surface-muted" />
  </span>
);
