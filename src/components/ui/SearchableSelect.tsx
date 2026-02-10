'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    searchPlaceholder?: string;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder,
    className,
    searchPlaceholder = "Buscar..."
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [options, searchQuery]);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => {
                    const nextState = !isOpen;
                    setIsOpen(nextState);
                    if (!nextState) setSearchQuery('');
                }}
                className="w-full bg-filter-bg text-filter-text text-sm h-[42px] px-5 rounded-full border border-white/5 flex items-center justify-between gap-2 hover:bg-black/80 transition-all font-light cursor-pointer"
            >
                <span className="truncate">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0B1125] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-1">
                    <div className="px-3 py-2 border-b border-white/5">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                            <Search size={14} className="text-white/40" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
                            />
                        </div>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-white/5 cursor-pointer ${value === option.value
                                        ? 'text-white font-medium bg-white/5'
                                        : 'text-filter-text/80 font-light'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))
                        ) : (
                            <div className="px-5 py-3 text-sm text-white/40 text-center">
                                Nenhuma opção encontrada
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
