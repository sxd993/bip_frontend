import { useState, useMemo } from 'react';
import { useAppeals } from './useAppeals';

const EMPTY_ITEMS = [];

export const useAppealsSection = () => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data = { items: [] }, isLoading } = useAppeals();
  const appeals = data.items ?? EMPTY_ITEMS;

  const totalAppeals = appeals.length;
  const totalPages = Math.ceil(totalAppeals / PAGE_SIZE);

  const paginatedAppeals = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return appeals.slice(start, start + PAGE_SIZE);
  }, [appeals, currentPage]);

  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages || 1));

  return {
    appeals,
    paginatedAppeals,
    isLoading,
    modal: {
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    },
    pagination: {
      currentPage,
      totalPages,
      totalAppeals,
      pageSize: PAGE_SIZE,
      goToPrevPage,
      goToNextPage,
      goToPage: setCurrentPage,
      startItem: totalAppeals === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1,
      endItem: Math.min(currentPage * PAGE_SIZE, totalAppeals),
    },
  };
};
