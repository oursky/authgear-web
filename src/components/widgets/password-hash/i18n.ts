import { createContext, useContext } from 'react';
import { t as tFn } from '@/i18n';

// Locale context for the widget. Set by the page component once at the
// root; child components consume via useT() and look up keys under
// `Tools.passwordHash.widget.*`.
export const LocaleContext = createContext<string>('en');

export function useT(): (key: string) => string {
  const locale = useContext(LocaleContext);
  return (key: string) => tFn(locale, `Tools.passwordHash.widget.${key}`);
}
