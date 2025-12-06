import { NavLink } from "react-router-dom";

const variants = {
  black: "bg-black text-white",
  red: "bg-primary text-white",
  white: "bg-white text-[#A01E1E]",
};

export const Button = ({
  to = "/",
  label,
  className = "",
  variant = "white",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center w-[80%] self-center px-3 py-2 rounded-[8px] font-bold text-sm leading-[1] text-center";

  return (
    <NavLink
      to={to}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {label}
    </NavLink>
  );
};
