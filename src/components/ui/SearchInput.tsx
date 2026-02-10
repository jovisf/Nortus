'use client';

import { Search as SearchIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
    return (
        <div className={`relative w-full ${className || ''}`}>
            <SearchIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-filter-text/60"
            />
            <input
                {...props}
                className="w-full bg-filter-bg text-filter-text text-sm h-[42px] pl-11 pr-4 rounded-full border border-white/5 focus:outline-none focus:ring-1 focus:ring-white/10 placeholder:text-white/10 transition-all font-light"
            />
        </div>
    );
}
