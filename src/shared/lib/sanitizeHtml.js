import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'b',
  'strong',
  'i',
  'em',
  'u',
  'p',
  'br',
  'ul',
  'ol',
  'li',
  'span',
  'div',
];

export const sanitizeRichHtml = (dirty) => {
  if (!dirty) return '';
  return DOMPurify.sanitize(String(dirty), {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['style'],
  });
};
