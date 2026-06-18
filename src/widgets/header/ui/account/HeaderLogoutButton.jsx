import { useHeaderLogoutButton } from "../../model/hooks/useHeaderLogoutButton";

export const HeaderLogoutButton = ({ onNavigate, className }) => {
  const { isVisible, handleLogout, isPending } =
    useHeaderLogoutButton(onNavigate);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={[
        "inline-flex items-center rounded-lg px-3 py-1.5 text-[15px] font-normal text-text transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Выйти
    </button>
  );
};
