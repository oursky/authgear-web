// src/components/widgets/passkey-demo/components/ForgetPasskeyDialog.tsx
import Modal from './Modal';

interface Props {
  open: boolean;
  /** Name of the passkey being forgotten, for the dialog body. */
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ForgetPasskeyDialog({ open, userName, onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Forget this passkey?">
      <p className="text-sm leading-relaxed text-slate-600">
        This removes only <strong>this page’s record</strong>
        {userName ? (
          <>
            {' '}of <strong>{userName}</strong>
          </>
        ) : null}{' '}
        (kept in your browser’s localStorage). The passkey itself stays in your keychain or password manager
        until you remove it there — see the FAQ below for per-OS instructions.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Forget
        </button>
      </div>
    </Modal>
  );
}
