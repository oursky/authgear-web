import en from './en.json';
import zhHant from './zh-Hant.json';
import ja from './ja.json';
import es from './es.json';
import de from './de.json';
import fr from './fr.json';
import { toolsMessagesEn } from '@/lib/tools/messages/en';
import { toolsMessagesZhHant } from '@/lib/tools/messages/zh-Hant';
import { toolsMessagesEs } from '@/lib/tools/messages/es';
import { toolsMessagesDe } from '@/lib/tools/messages/de';
import { toolsMessagesFr } from '@/lib/tools/messages/fr';
import { toolsMessagesJa } from '@/lib/tools/messages/ja';

// `ja`, `es`, `de` and `fr` ship as partial bundles (market test): home page, nav
// labels, pricing, the auth-toolkit hub and every tool. Any missing key falls
// back to English via `t()` below.
const messages: Record<string, Record<string, unknown>> = {
  en: { ...en, Tools: toolsMessagesEn },
  'zh-Hant': { ...zhHant, Tools: toolsMessagesZhHant },
  ja: { ...ja, Tools: toolsMessagesJa },
  es: { ...es, Tools: toolsMessagesEs },
  de: { ...de, Tools: toolsMessagesDe },
  fr: { ...fr, Tools: toolsMessagesFr },
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
