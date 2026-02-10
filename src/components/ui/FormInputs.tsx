'use client';

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';
import { ChevronDown } from 'lucide-react';

interface BaseInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const labelClasses = 'block text-sm font-medium text-white mb-2 ml-1';
const errorClasses = 'mt-1.5 ml-1 text-xs text-red-400 font-light';
const baseInputClasses =
  'w-full bg-white/5 border rounded-[22px] px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:ring-1 transition-all text-sm font-light';

interface FieldWrapperProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

const FieldWrapper = ({
  label,
  error,
  children,
  containerClassName = '',
}: FieldWrapperProps) => (
  <div className={`w-full ${containerClassName}`}>
    {label && <label className={labelClasses}>{label}</label>}
    {children}
    {error && <p className={errorClasses}>{error}</p>}
  </div>
);

export const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & BaseInputProps
>(({ label, error, containerClassName, className = '', ...props }, ref) => {
  return (
    <FieldWrapper
      label={label}
      error={error}
      containerClassName={containerClassName}
    >
      <input
        ref={ref}
        className={` ${baseInputClasses} ${error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-white/20'} ${className} `}
        {...props}
      />
    </FieldWrapper>
  );
});
TextInput.displayName = 'TextInput';

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & BaseInputProps
>(
  (
    { label, error, containerClassName, className = '', value, ...props },
    ref
  ) => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    const maxLength = props.maxLength;

    return (
      <FieldWrapper
        label={label}
        error={error}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            className={` ${baseInputClasses} min-h-[140px] resize-none py-5 ${error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-white/20'} ${className} `}
            {...props}
          />
          {maxLength && (
            <span className="pointer-events-none absolute right-6 bottom-4 text-[10px] font-light text-white/40">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
TextAreaInput.displayName = 'TextAreaInput';

export const SelectInput = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> &
    BaseInputProps & { options: { label: string; value: string }[] }
>(
  (
    { label, error, containerClassName, className = '', options, ...props },
    ref
  ) => {
    return (
      <FieldWrapper
        label={label}
        error={error}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <select
            ref={ref}
            className={` ${baseInputClasses} cursor-pointer appearance-none ${error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-white/20'} ${className} `}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#0B1125]"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-white/40"
          />
        </div>
      </FieldWrapper>
    );
  }
);
SelectInput.displayName = 'SelectInput';
