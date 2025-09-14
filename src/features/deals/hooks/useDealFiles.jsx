import { useState, useEffect, useRef } from 'react';
import { getDealFilesApi, getLatestDealFilesApi } from '../api/dealsApi';

export const useDealFiles = (dealId, latest = false) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef(null);
  const lastDealIdRef = useRef(null);
  const cacheRef = useRef(new Map());

  const getCacheKey = (dealId, latest) => `${dealId}-${latest}`;

  const loadFiles = async (forceFetch = false) => {
    const normalizedDealId = dealId?.toString();
    
    if (!normalizedDealId || normalizedDealId === 'undefined' || normalizedDealId === 'null') {
      setFiles([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const cacheKey = getCacheKey(normalizedDealId, latest);
    
    if (!forceFetch && cacheRef.current.has(cacheKey)) {
      const cachedData = cacheRef.current.get(cacheKey);
      setFiles(cachedData.files);
      setError(cachedData.error);
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);

      const response = latest
        ? await getLatestDealFilesApi(normalizedDealId)
        : await getDealFilesApi(normalizedDealId);

      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const filesData = response?.files || [];
      
      cacheRef.current.set(cacheKey, {
        files: filesData,
        error: null,
        timestamp: Date.now()
      });

      setFiles(filesData);
      setError(null);
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.error('Ошибка загрузки файлов сделки:', err);
      
      const errorData = {
        files: [],
        error: err,
        timestamp: Date.now()
      };
      
      cacheRef.current.set(cacheKey, errorData);
      setError(err);
      setFiles([]);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const refetch = () => {
    const normalizedDealId = dealId?.toString();
    if (normalizedDealId && normalizedDealId !== 'undefined' && normalizedDealId !== 'null') {
      const cacheKey = getCacheKey(normalizedDealId, latest);
      cacheRef.current.delete(cacheKey);
      loadFiles(true);
    }
  };

  const clearCache = () => {
    cacheRef.current.clear();
  };

  useEffect(() => {
    const normalizedDealId = dealId?.toString();
    
    if (normalizedDealId === lastDealIdRef.current) {
      return;
    }

    lastDealIdRef.current = normalizedDealId;

    if (normalizedDealId && normalizedDealId !== 'undefined' && normalizedDealId !== 'null') {
      loadFiles();
    } else {
      setFiles([]);
      setError(null);
      setIsLoading(false);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dealId, latest]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      for (const [key, value] of cacheRef.current.entries()) {
        if (now - value.timestamp > fiveMinutes) {
          cacheRef.current.delete(key);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { 
    files, 
    isLoading, 
    error, 
    refetch, 
    clearCache 
  };
};