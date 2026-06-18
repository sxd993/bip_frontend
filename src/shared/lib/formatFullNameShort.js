const toInitial = (value) => {
  const letter = value?.trim()?.[0];
  return letter ? `${letter.toUpperCase()}.` : '';
};

export const formatFullNameShort = ({ last_name, first_name, second_name } = {}) => {
  const lastName = last_name?.trim();
  if (!lastName) {
    return null;
  }

  const initials = [toInitial(first_name), toInitial(second_name)].filter(Boolean).join('');

  return initials ? `${lastName} ${initials}` : lastName;
};
