// src/components/widgets/passkey-demo/components/ForgetPasskeyDialog.tsx
import Modal from './Modal';
import { useStrings } from '../StringsContext';

interface Props {
  open: boolean;
  /** Name of the passkey being forgotten, for the dialog body. */
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ForgetPasskeyDialog({ open, userName, onConfirm, onClose }: Props) {
  const s = useStrings();
  return (
    <Modal open={open} onClose={onClose} title={s.forgetOne.title}>
      <p className="text-sm leading-relaxed text-slate-600">
        {s.forgetOne.bodyBefore}
        {userName ? (
          <>
            {s.forgetOne.nameOf}
            <strong>{userName}</strong>
          </>
        ) : null}
        {s.forgetOne.bodyAfter}
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {s.forgetOne.cancel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          {s.forgetOne.confirm}
        </button>
      </div>
    </Modal>
  );
}
