export const BurgerButton = ({ onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Открыть меню"
      className={`flex items-center justify-center ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.93884 24.8852V22.7689H28.9277V24.8852H4.93884ZM4.93884 17.9926V15.876H28.9277V17.9926H4.93884ZM4.93884 11.0997V8.9834H28.9277V11.0997H4.93884Z" fill="white" />
      </svg>
    </button>
  );
};
