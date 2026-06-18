import { Link } from 'react-router-dom';

const LOGO_SRC =
  'https://s3.twcstorage.ru/1718254b-3e5a-4845-8527-e67480872a8b/logo.svg';

export const Logo = ({ accentBackground = false }) => (
  <Link
    to="/"
    aria-label="Баукен и Партнеры — на главную"
    className={[
      'inline-flex shrink-0',
      accentBackground && 'rounded-lg bg-primary px-2 py-1',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <img src={LOGO_SRC} alt="Баукен и Партнеры" className="h-8 w-auto" />
  </Link>
);
