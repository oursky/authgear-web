// src/components/widgets/passkey-demo/StringsContext.tsx
import { createContext, useContext } from 'react';
import { EN, type WidgetStrings } from './strings';

// Defaults to EN so components render sensibly even outside the provider
// (tests, Storybook-style isolation).
const StringsContext = createContext<WidgetStrings>(EN);

export const StringsProvider = StringsContext.Provider;

export function useStrings(): WidgetStrings {
  return useContext(StringsContext);
}
