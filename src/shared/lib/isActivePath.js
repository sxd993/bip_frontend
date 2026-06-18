export const isActivePath = (pathname, path) => {
  if (path === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(path);
};
