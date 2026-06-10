// src/components/widgets/passkey-demo/components/ForgetAllDialog.tsx
import Modal from './Modal';
import { useStrings } from '../StringsContext';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ForgetAllDialog({ open, onConfirm, onClose }: Props) {
  const s = useStrings();
  return (
    <Modal open={open} onClose={onClose} title={s.forgetAll.title}>
      <p className="text-sm leading-relaxed text-slate-600">{s.forgetAll.body}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {s.forgetAll.cancel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          {s.forgetAll.confirm}
        </button>
      </div>
    </Modal>
  );
}
