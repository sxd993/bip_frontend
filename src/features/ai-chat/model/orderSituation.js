export const ORDER_SITUATION = {
  FLOOD: 'flood',
  OTHER: 'other',
};

export const OTHER_ORDER_PAY_ERROR =
  'У нас тех проблемы, мы в ближайшее время с вами свяжемся';

export const resolveSituationType = (text, fallback = ORDER_SITUATION.OTHER) => {
  const normalized = String(text || '')
    .trim()
    .toLowerCase();

  if (!normalized) return fallback;

  if (
    normalized === 'затопление' ||
    normalized.includes('затоп') ||
    normalized === ORDER_SITUATION.FLOOD
  ) {
    return ORDER_SITUATION.FLOOD;
  }

  if (normalized === ORDER_SITUATION.OTHER || normalized === 'другая ситуация') {
    return ORDER_SITUATION.OTHER;
  }

  return fallback;
};

export const normalizeSituationType = (value) => {
  if (value === ORDER_SITUATION.FLOOD) return ORDER_SITUATION.FLOOD;
  return ORDER_SITUATION.OTHER;
};
