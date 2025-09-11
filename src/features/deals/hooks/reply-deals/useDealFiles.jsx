import { useState, useEffect } from 'react';
import { getDealFilesApi, getLatestDealFilesApi } from '../../api/dealsApi';

export const useDealFiles = (dealId, latest = false) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      setFiles(response.files || []);
    } catch (err) {
      console.error('Ошибка загрузки файлов сделки:', err);
      setError(err);
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dealId) {
      loadFiles();
    }
  }, [dealId, latest]);

  return { files, isLoading, error, refetch: loadFiles };
};
