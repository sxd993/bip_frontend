import { useHeaderSession } from '../../model/hooks/useHeaderSession';

export const HeaderBalance = ({ className }) => {
  const { isSessionLoading, isAuthorized, balanceLabel } = useHeaderSession();

  if (isSessionLoading || !isAuthorized || !balanceLabel) {
    return null;
  }

  return (
    <span
      className={[
        'rounded-lg bg-surface-muted px-3 py-1.5 text-[15px] font-medium tabular-nums text-text',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {balanceLabel}
    </span>
  );
};
