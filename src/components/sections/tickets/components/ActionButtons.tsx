'use client';

import { useTranslations } from 'next-intl';

interface ActionButtonsProps {
  onCancel: () => void;
  isPending: boolean;
  submitLabel?: string;
  disabled?: boolean;
}

export function ActionButtons({
  onCancel,
  isPending,
  submitLabel,
  disabled,
}: ActionButtonsProps) {
  const t = useTranslations('Common');
  const label = submitLabel || t('save');

  return (
    <div className="flex items-center justify-center gap-4 pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="text-md max-w-[160px] flex-1 cursor-pointer rounded-2xl border border-white py-4 font-semibold text-white transition-all hover:bg-white/5"
      >
        {t('cancel')}
      </button>
      <button
        type="submit"
        disabled={isPending || disabled}
        className="bg-primary shadow-primary/20 text-md max-w-[160px] flex-1 cursor-pointer rounded-2xl py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? t('loading') : label}
      </button>
    </div>
  );
}
