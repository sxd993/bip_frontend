export const FILE_CONSTRAINTS = {
  MAX_FILES: 5,
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_EXTENSIONS: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ],
};
