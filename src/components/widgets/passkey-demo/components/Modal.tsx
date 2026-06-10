// src/components/widgets/passkey-demo/components/Modal.tsx
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useStrings } from '../StringsContext';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: Props) {
  const s = useStrings();
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Hold the latest onClose in a ref so the open/close effect doesn't depend on
  // it. onClose is a fresh closure each parent render; if it were a dep, any
  // parent re-render while the dialog is open would re-run the effect's cleanup
  // and steal focus back to the trigger mid-interaction.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    lastFocused.current = (document.activeElement as HTMLElement) ?? null;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl outline-none"
      >
        <div className="mb-2 flex items-start justify-between gap-4">
          <div id={titleId} role="heading" aria-level={2} className="text-base font-semibold text-slate-900">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={s.modal.close}
            className="shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
