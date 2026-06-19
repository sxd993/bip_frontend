import { useState } from 'react';
import { FILE_CONSTRAINTS } from '@/shared/constants/fileConstraints';

export const useFileUpload = () => {
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  const validateFiles = (files) => {
    const errors = [];

    files.forEach((file) => {
      if (file.size > FILE_CONSTRAINTS.MAX_SIZE_BYTES) {
        errors.push(`Файл "${file.name}" превышает размер ${FILE_CONSTRAINTS.MAX_SIZE_MB} MB`);
      }

      if (!FILE_CONSTRAINTS.ALLOWED_MIME_TYPES.includes(file.type)) {
        errors.push(`Файл "${file.name}" имеет недопустимый тип`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve({
          name: file.name,
          base64,
          type: file.type,
          size: file.size,
        });
      };
      reader.onerror = reject;
    });

  const addFiles = (newFiles) => {
    const availableSlots = FILE_CONSTRAINTS.MAX_FILES - attachedFiles.length;

    if (availableSlots <= 0) {
      setFileErrors([`Можно прикрепить не более ${FILE_CONSTRAINTS.MAX_FILES} файлов`]);
      return false;
    }

    const filesToAdd = newFiles.slice(0, availableSlots);
    const limitExceeded = newFiles.length > availableSlots;
    const validation = validateFiles(filesToAdd);
    const errors = [...validation.errors];

    if (limitExceeded) {
      errors.push(`Можно прикрепить не более ${FILE_CONSTRAINTS.MAX_FILES} файлов`);
    }

    if (!validation.isValid || limitExceeded) {
      setFileErrors(errors);
      if (!validation.isValid) {
        return false;
      }
    } else {
      setFileErrors([]);
    }

    setAttachedFiles((prev) => [...prev, ...filesToAdd]);
    return true;
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileErrors([]);
  };

  const clearFiles = () => {
    setAttachedFiles([]);
    setFileErrors([]);
  };

  const getBase64Files = async () =>
    Promise.all(attachedFiles.map((file) => fileToBase64(file)));

  const isLimitReached = attachedFiles.length >= FILE_CONSTRAINTS.MAX_FILES;

  return {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    clearFiles,
    getBase64Files,
    isLimitReached,
    FILE_CONSTRAINTS,
  };
};
