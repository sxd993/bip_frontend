import { useState } from 'react';

const FILE_CONSTRAINTS = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
};

export const useFileUpload = () => {
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  const validateFiles = (files) => {
    const errors = [];

    files.forEach((file) => {
      if (file.size > FILE_CONSTRAINTS.MAX_SIZE_BYTES) {
        errors.push(`Файл "${file.name}" превышает размер ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB`);
      }

      if (!FILE_CONSTRAINTS.ALLOWED_MIME_TYPES.includes(file.type)) {
        errors.push(`Файл "${file.name}" имеет недопустимый тип`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve({
          name: file.name,
          base64: base64,
          type: file.type,
          size: file.size
        });
      };
      reader.onerror = reject;
    });
  };

  const addFiles = (newFiles) => {
    const validation = validateFiles(newFiles);
    
    if (!validation.isValid) {
      setFileErrors(validation.errors);
      return false;
    }

    setFileErrors([]);
    setAttachedFiles(prev => [...prev, ...newFiles]);
    return true;
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    setFileErrors([]);
  };

  const clearFiles = () => {
    setAttachedFiles([]);
    setFileErrors([]);
  };

  const getBase64Files = async () => {
    return await Promise.all(attachedFiles.map(file => fileToBase64(file)));
  };

  return {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    clearFiles,
    getBase64Files,
    FILE_CONSTRAINTS
  };
};