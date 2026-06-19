export const UserTypeSwitch = ({ value, onChange }) => (
  <div
    className="flex border-b border-border"
    role="group"
    aria-label="Тип пользователя"
  >
    <button
      type="button"
      aria-pressed={value === "physical"}
      onClick={() => onChange("physical")}
      className={[
        "flex-1 px-2 pb-2.5 text-center text-xs md:text-sm transition",
        value === "physical"
          ? "-mb-px border-b-2 border-primary font-medium text-text"
          : "text-text-muted hover:text-text",
      ].join(" ")}
    >
      Частное лицо
    </button>
    <button
      type="button"
      aria-pressed={value === "legal"}
      onClick={() => onChange("legal")}
      className={[
        "flex-1 px-2 pb-2.5 text-center text-xs md:text-sm transition",
        value === "legal"
          ? "-mb-px border-b-2 border-primary font-medium text-text"
          : "text-text-muted hover:text-text",
      ].join(" ")}
    >
      Юридическое лицо
    </button>
  </div>
);
