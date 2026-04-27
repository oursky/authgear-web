/** Blog category JSON shape (`blog-categories` collection). */
export type BlogCategoryDisplayFields = {
  name: string;
  nameZhHant?: string | null;
};

export function blogCategoryDisplayName(
  locale: string,
  cat: BlogCategoryDisplayFields,
): string {
  if (locale === 'zh-Hant') {
    const zh = cat.nameZhHant?.trim();
    if (zh) return zh;
  }
  return cat.name;
}
