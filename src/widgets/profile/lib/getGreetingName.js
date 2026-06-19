export const getGreetingName = (user) => {
  const name = [user?.first_name, user?.second_name].filter(Boolean).join(' ');
  return name || 'добро пожаловать';
};
