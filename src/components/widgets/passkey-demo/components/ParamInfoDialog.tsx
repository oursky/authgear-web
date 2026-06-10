// src/components/widgets/passkey-demo/components/ParamInfoDialog.tsx
import Modal from './Modal';

export type ParamKey =
  | 'userName'
  | 'attachment'
  | 'userVerification'
  | 'residentKey'
  | 'attestation'
  | 'algorithms';

interface Info {
  title: string;
  description: string;
  options?: { name: string; desc: string }[];
}

const PARAM_INFO: Record<ParamKey, Info> = {
  userName: {
    title: 'User name',
    description:
      'The account label this passkey belongs to. It shows in your device’s passkey or password-manager UI. In a real app it’s the username or email; a separate random user ID is generated for you.',
  },
  attachment: {
    title: 'Authenticator attachment',
    description: 'Which kind of authenticator can create the passkey.',
    options: [
      { name: 'unset (any authenticator)', desc: 'No preference; the browser offers whatever is available.' },
      { name: 'platform (this device)', desc: 'A built-in authenticator like Touch ID or Windows Hello, bound to this device.' },
      { name: 'cross-platform (security key / phone)', desc: 'A roaming authenticator such as a USB security key or a phone.' },
    ],
  },
  userVerification: {
    title: 'User verification',
    description: 'Whether the authenticator must check it’s really you (biometric or PIN) when creating the passkey.',
    options: [
      { name: 'preferred (default)', desc: 'Verify if the device can, but allow it either way.' },
      { name: 'required', desc: 'Must verify, or creation fails. For sensitive apps.' },
      { name: 'discouraged', desc: 'Skip verification; just confirm someone’s present.' },
    ],
  },
  residentKey: {
    title: 'Resident key (discoverable)',
    description:
      'Whether the passkey is “discoverable” (stored on the authenticator). Discoverable passkeys let you sign in without typing a username first.',
    options: [
      { name: 'preferred (default)', desc: 'Make it discoverable if the authenticator supports it.' },
      { name: 'required', desc: 'Must be discoverable, or creation fails. Needed for usernameless sign-in.' },
      { name: 'discouraged', desc: 'Prefer a non-discoverable credential (the server stores its ID).' },
    ],
  },
  attestation: {
    title: 'Attestation',
    description: 'Whether the authenticator returns a signed statement about its make and model that a server could verify.',
    options: [
      { name: 'none (default)', desc: 'No attestation. Most private; the AAGUID is often zeroed.' },
      { name: 'direct', desc: 'Return the authenticator’s attestation statement (reveals its model). For enterprise or regulated use.' },
    ],
  },
  algorithms: {
    title: 'Signature algorithms',
    description:
      'The signing algorithms your app accepts, in order of preference. The authenticator picks the first one it supports. The numbers are COSE algorithm IDs.',
    options: [
      { name: 'ES256 (−7)', desc: 'ECDSA on P-256 with SHA-256. The near-universal passkey algorithm.' },
      { name: 'ES256 (−7) + RS256 (−257)', desc: 'Also accept RS256 (RSA with SHA-256), a fallback some authenticators use.' },
    ],
  },
};

interface Props {
  paramKey: ParamKey | null;
  onClose: () => void;
}

export default function ParamInfoDialog({ paramKey, onClose }: Props) {
  const info = paramKey ? PARAM_INFO[paramKey] : null;
  return (
    <Modal open={info !== null} onClose={onClose} title={info?.title ?? ''}>
      {info && (
        <>
          <div className="text-sm leading-relaxed text-slate-600">{info.description}</div>
          {info.options && (
            <dl className="mt-4 flex flex-col gap-3">
              {info.options.map((o) => (
                <div key={o.name}>
                  <dt className="font-mono text-xs font-semibold text-slate-900">{o.name}</dt>
                  <dd className="mt-0.5 text-sm text-slate-600">{o.desc}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Got it
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
