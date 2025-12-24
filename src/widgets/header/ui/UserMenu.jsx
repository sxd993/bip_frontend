import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const UserMenu = ({ user, onLogout, buttonClassName, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  const toggleMenu = (event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const userLabel =
    label ??
    [
      user.second_name ?? user.last_name ?? "",
      user.last_name ? `${user.last_name[0]}.` : "",
      user.first_name ? `${user.first_name[0]}.` : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={buttonClassName || "text-white text-[16px] font-bold border border-white px-5 py-[6px]"}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {userLabel}
        <svg
          width={10}
          height={5}
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5L0 0H10L5 5Z" fill="#fff" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute -right-2 mt-2 w-[200px] bg-white text-black border border-[#A01E1E] shadow-lg z-50 flex flex-col">
          <NavLink
            to="/personal-account"
            className="px-4 py-3 text-[15px] font-semibold border-b border-[#A01E1E] hover:bg-gray-100"
            onClick={closeMenu}
          >
            Личный кабинет
          </NavLink>
          <button
            type="button"
            className="px-4 py-3 text-[15px] font-semibold hover:bg-gray-100 text-left"
            onClick={(event) => {
              closeMenu();
              onLogout?.(event);
            }}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
