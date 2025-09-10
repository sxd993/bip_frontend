import { useState, useEffect } from 'react';
import { getDealFilesApi, getLatestDealFilesApi } from '../api/dealsApi';

export const useDealFiles = (dealId, options = {}) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    latest = false,
    autoLoad = true,
    onSuccess = null,
    onError = null
  } = options;

  const loadFiles = async () => {
    if (!dealId) {
      setFiles([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = latest 
        ? await getLatestDealFilesApi(dealId)
        : await getDealFilesApi(dealId);
      
      const filesData = response.files || [];
      setFiles(filesData);
      
      if (onSuccess) {
        onSuccess(filesData, response);
      }
      
    } catch (err) {
      console.error('Ошибка загрузки файлов сделки:', err);
      setError(err);
      setFiles([]);
      
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad && dealId) {
      loadFiles();
    }
  }, [dealId, latest, autoLoad]);

  return {
    files,
    isLoading,
    error,
    loadFiles,
    refetch: loadFiles
  };
};

export const useLatestDealFiles = (dealId) => {
  return useDealFiles(dealId, { latest: true });
};

export const useAllDealFiles = (dealId) => {
  return useDealFiles(dealId, { latest: false });
};
