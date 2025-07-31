export const formatMessage = (text) => {
  if (!text) return 'Без текста';
  return text
    .replace(/\[p\]/g, '')
    .replace(/\[\/p\]/g, '')
    .split('\n')
    .map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
};

export const getFileIcon = (fileName) => {
  if (!fileName || typeof fileName !== 'string') {
    return 'fas fa-file';
  }
  const extension = fileName.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'fas fa-file-image';
  if (extension === 'pdf') return 'fas fa-file-pdf';
  if (['doc', 'docx'].includes(extension)) return 'fas fa-file-word';
  return 'fas fa-file';
};