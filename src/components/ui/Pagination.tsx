'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('Pagination');

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-8 py-2">
      <div className="flex items-center gap-6">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="text-filter-text/40 hover:text-filter-text cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          title={t('first')}
        >
          <ChevronFirst size={20} />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-filter-text/40 hover:text-filter-text cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          title={t('previous')}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <span className="text-filter-text min-w-[60px] text-center text-sm font-medium">
        {t('of', { current: currentPage, total: totalPages })}
      </span>

      <div className="flex items-center gap-6">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-filter-text/40 hover:text-filter-text cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          title={t('next')}
        >
          <ChevronRight size={20} />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="text-filter-text/40 hover:text-filter-text cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          title={t('last')}
        >
          <ChevronLast size={20} />
        </button>
      </div>
    </div>
  );
}
