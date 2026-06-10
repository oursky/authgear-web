// src/components/widgets/passkey-demo/components/JargonLabel.tsx
import Tooltip from './Tooltip';

interface Props {
  /** The WebAuthn term being labelled. */
  children: string;
  /** Short plain-language explanation shown on hover/focus. */
  text: string;
}

/**
 * A jargon term that reveals a short explanation on hover/focus. The dotted
 * underline signals there's more to read; the shared Tooltip handles the
 * bubble, keyboard focus, and ARIA wiring.
 */
export default function JargonLabel({ children, text }: Props) {
  return (
    <Tooltip text={text}>
      <span className="border-b border-dotted border-slate-400">{children}</span>
    </Tooltip>
  );
}
