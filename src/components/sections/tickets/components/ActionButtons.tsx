'use client';

import { useTranslations } from 'next-intl';

interface ActionButtonsProps {
    onCancel: () => void;
    isPending: boolean;
    submitLabel?: string;
}

export function ActionButtons({ onCancel, isPending, submitLabel }: ActionButtonsProps) {
    const t = useTranslations('Common');
    const label = submitLabel || t('save');

    return (
        <div className="pt-6 flex items-center justify-center gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 max-w-[160px] py-4 rounded-2xl border border-white text-white text-md font-semibold hover:bg-white/5 transition-all cursor-pointer"
            >
                {t('cancel')}
            </button>
            <button
                type="submit"
                disabled={isPending}
                className="flex-1 max-w-[160px] py-4 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-white text-md font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? t('loading') : label}
            </button>
        </div>
    );
}
