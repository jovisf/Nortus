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
        className="text-filter-text/60 absolute top-1/2 left-4 -translate-y-1/2"
      />
      <input
        {...props}
        className="bg-filter-bg text-filter-text h-[42px] w-full rounded-full border border-white/5 pr-4 pl-11 text-sm font-light transition-all placeholder:text-white/10 focus:ring-1 focus:ring-white/10 focus:outline-none"
      />
    </div>
  );
}
