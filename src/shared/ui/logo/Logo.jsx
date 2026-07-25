import { Link } from "react-router-dom";

export const Logo = () => (
  <Link
    to="/"
    aria-label="КР17 — на главную"
    className="inline-flex shrink-0 items-start text-primary transition-opacity hover:opacity-80"
  >
    <span className="text-[1.5rem] font-bold leading-none tracking-tight">
      КР
    </span>
    <span className="ml-0.5 mt-0.5 text-[0.8125rem] font-bold leading-none tracking-tight tabular-nums">
      17
    </span>
  </Link>
);
