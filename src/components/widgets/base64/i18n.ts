import { createContext, useContext } from 'react';
import { t as tFn } from '@/i18n';

// Locale context for the widget; set by the page once at the root.
// Children consume via useT() and look up keys under
// `Tools.base64.widget.*`.
export const LocaleContext = createContext<string>('en');

export function useT(): (key: string) => string {
  const locale = useContext(LocaleContext);
  return (key: string) => tFn(locale, `Tools.base64.widget.${key}`);
}
