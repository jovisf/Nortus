'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
    ({ error, label, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    type="text"
                    inputMode="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                        } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

EmailInput.displayName = 'EmailInput';
