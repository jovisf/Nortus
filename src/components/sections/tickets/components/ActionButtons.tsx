interface ActionButtonsProps {
    onCancel: () => void;
    isPending: boolean;
    submitLabel?: string;
}

export function ActionButtons({ onCancel, isPending, submitLabel = 'Salvar' }: ActionButtonsProps) {
    return (
        <div className="pt-6 flex items-center justify-center gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 max-w-[160px] py-4 rounded-2xl border border-white text-white text-sm font-semibold hover:bg-white/5 transition-all cursor-pointer"
            >
                Cancelar
            </button>
            <button
                type="submit"
                disabled={isPending}
                className="flex-1 max-w-[160px] py-4 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-white text-sm font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? 'Salvando...' : submitLabel}
            </button>
        </div>
    );
}
