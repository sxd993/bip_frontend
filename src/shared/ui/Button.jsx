import { NavLink } from "react-router-dom";

export const Button = ({ to = "/", label, className = "" }) => {
  const baseClasses = "w-[80%] self-center px-8 py-4 bg-white rounded-[8px] font-bold text-[23px] leading-[1] text-center text-[#A01E1E]";

  return (
    <NavLink to={to} className={`${baseClasses} ${className}`}>
      {label}
    </NavLink>
  );
};
