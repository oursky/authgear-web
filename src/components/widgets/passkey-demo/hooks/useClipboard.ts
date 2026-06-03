import { useRef, useState } from 'react';

export function useClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), resetMs);
    } catch {
      // Clipboard blocked — ignore; the value is selectable by hand.
    }
  };

  return { copied, copy };
}
