import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

import { toolsMessagesEn } from '@/lib/tools/messages/en';
import { toolsMessagesZhTW } from '@/lib/tools/messages/zh-TW';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';

  const base = (await import(`../messages/${locale}.json`)).default;
  const toolsMessages = locale === 'zh-TW' ? toolsMessagesZhTW : toolsMessagesEn;

  return {
    locale,
    messages: {
      ...base,
      Tools: toolsMessages,
    },
  };
});
