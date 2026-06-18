import { Link } from "react-router-dom";
import { UserTieIcon } from "@/shared/ui/icons/header/UserTieIcon";
import { useHeaderSession } from "../../model/hooks/useHeaderSession";
import { HeaderAccountLinkSkeleton } from "./HeaderAccountLinkSkeleton";

export const HeaderAccountLink = ({ onNavigate, className }) => {
  const { isSessionLoading, accountHref, accountLabel } = useHeaderSession();

  if (isSessionLoading) {
    return <HeaderAccountLinkSkeleton className={className} />;
  }

  return (
    <Link
      to={accountHref}
      onClick={onNavigate}
      className={[
        "inline-flex items-center gap-3 rounded-lg px-3 py-1.5 text-[15px] font-normal text-text transition-colors hover:bg-surface-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <UserTieIcon className="h-5 w-5 shrink-0 text-text" />
      {accountLabel}
    </Link>
  );
};
