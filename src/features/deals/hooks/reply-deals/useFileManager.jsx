import { useState } from 'react';
import { validateFiles, filesToBase64 } from '../../utils';

export const useFileManager = () => {
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

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
    return await filesToBase64(attachedFiles);
  };

  return {
    attachedFiles,
    fileErrors,
    addFiles,
    removeFile,
    clearFiles,
    getBase64Files
  };
};
