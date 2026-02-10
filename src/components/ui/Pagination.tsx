'use client';

import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from 'lucide-react';

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
    onPageChange
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-end gap-8 py-2">
            <div className="flex items-center gap-6">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="text-filter-text/40 hover:text-filter-text disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Primeira página"
                >
                    <ChevronFirst size={20} />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-filter-text/40 hover:text-filter-text disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Página anterior"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <span className="text-filter-text text-sm font-medium min-w-[60px] text-center">
                {currentPage} de {totalPages}
            </span>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-filter-text/40 hover:text-filter-text disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Próxima página"
                >
                    <ChevronRight size={20} />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="text-filter-text/40 hover:text-filter-text disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Última página"
                >
                    <ChevronLast size={20} />
                </button>
            </div>
        </div>
    );
}
