import { useCallback, useEffect, useRef, useState } from 'react';

export function useClipboard(timeout = 2000): [boolean, (text: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          timeoutRef.current = setTimeout(() => setCopied(false), timeout);
          return true;
        }
      } catch {
        // fall through to false
      }
      return false;
    },
    [timeout],
  );

  return [copied, copy];
}
