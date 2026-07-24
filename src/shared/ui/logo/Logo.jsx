import { Link } from "react-router-dom";

const LOGO_SRC =
  "https://s3.twcstorage.ru/1718254b-3e5a-4845-8527-e67480872a8b/%D0%9A%D0%A017.svg";

export const Logo = ({ accentBackground = false }) => (
  <Link
    to="/"
    aria-label="КР17 — на главную"
    className={["inline-flex shrink-0", accentBackground]
      .filter(Boolean)
      .join(" ")}
  >
    <img src={LOGO_SRC} alt="КР17" className="h-8 w-auto" />
  </Link>
);
