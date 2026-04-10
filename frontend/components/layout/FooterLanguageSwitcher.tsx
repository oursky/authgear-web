'use client';

import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { localizedPath, LOCALES } from '@/lib/i18n';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
};

function getBasePath(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
    if (pathname === `/${locale}`) {
      return '/';
    }
  }
  return pathname;
}

export default function FooterLanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const basePath = getBasePath(pathname);

  return (
    <div className="ds-footer-lang-switcher" ref={ref}>
      <button
        type="button"
        className="ds-footer-lang-switcher__btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <GlobeAltIcon className="ds-footer-lang-switcher__icon" aria-hidden />
        <span>{LOCALE_LABELS[locale] ?? 'Language'}</span>
        <ChevronDownIcon
          className={`ds-footer-lang-switcher__chevron${open ? ' ds-footer-lang-switcher__chevron--open' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="ds-footer-lang-switcher__dropdown" role="listbox">
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <a
                href={localizedPath(l, basePath)}
                className={`ds-footer-lang-switcher__option${l === locale ? ' ds-footer-lang-switcher__option--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {LOCALE_LABELS[l]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
