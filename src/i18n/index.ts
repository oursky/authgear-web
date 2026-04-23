import en from './en.json';
import zhHant from './zh-Hant.json';
import { toolsMessagesEn } from '@/lib/tools/messages/en';
import { toolsMessagesZhHant } from '@/lib/tools/messages/zh-Hant';

const messages: Record<string, Record<string, unknown>> = {
  en: { ...en, Tools: toolsMessagesEn },
  'zh-Hant': { ...zhHant, Tools: toolsMessagesZhHant },
};

function lookup(bag: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split('.');
  let cur: unknown = bag;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function t(locale: string, key: string): string {
  const loc = locale in messages ? locale : 'en';
  return lookup(messages[loc], key) ?? lookup(messages.en, key) ?? key;
}

export type TranslationKey = string;
