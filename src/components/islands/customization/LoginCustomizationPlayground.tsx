import { t as tFn } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import { trackEvent } from '@/lib/plausible';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import './LoginCustomizationPlayground.css';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

type PlaygroundFirstAction =
  | 'preset'
  | 'logo'
  | 'background'
  | 'alignment'
  | 'color'
  | 'radius'
  | 'link-decoration'
  | 'accordion';

/** Mirrors portal `Alignment` / `AllAlignments` (themeAuthFlowV2.ts). */
type Alignment = 'start' | 'center' | 'end';

/** Mirrors portal `BorderRadiusStyleType` (themeAuthFlowV2.ts — primary button). */
type BorderRadiusStyleType = 'none' | 'rounded' | 'rounded-full';

type DemoPresetId =
  | 'your-brand'
  | 'finance'
  | 'healthcare'
  | 'retail'
  | 'technology'
  | 'food-beverage';

interface DemoPreset {
  id: DemoPresetId;
  brandName: string;
  logoHeightLight: number;
  logoImageDataUrl?: string;
  logoImageScale?: number;
  backgroundImageDataUrl?: string;
  pageBgLight: string;
  primaryBgLight: string;
  primaryLabelLight: string;
  linkColorLight: string;
}

interface Props {
  locale: string;
}

type LogoDevSearchResult = { name: string; domain: string };

/** Remember customised org + logo when switching away from "Your brand" and back. */
type YourBrandDraft = {
  brandName: string;
  logoLookup: string;
  logoImageDataUrl: string;
  logoImageScale: number;
};

/** Defaults aligned with portal `DEFAULT_LIGHT_THEME` (themeAuthFlowV2.ts). */
const DEFAULTS = {
  brandName: 'Your brand',
  logoHeightLight: 80,
  cardAlignment: 'center' as Alignment,
  pageBgLight: '#cbd5e1',
  backgroundImageDataUrl: '' as string,
  primaryBgLight: '#176df3',
  primaryLabelLight: '#ffffff',
  buttonRadiusType: 'rounded' as BorderRadiusStyleType,
  buttonRadiusValue: '0.875em',
  inputRadiusType: 'rounded' as BorderRadiusStyleType,
  inputRadiusValue: '0.875em',
  linkColorLight: '#176df3',
  linkDecoration: 'none' as 'none' | 'underline',
};

/** Preview-only palettes — organisation name + colors for the auth UI demo. */
const DEMO_PRESETS: readonly DemoPreset[] = [
  {
    id: 'your-brand',
    brandName: DEFAULTS.brandName,
    logoHeightLight: DEFAULTS.logoHeightLight,
    logoImageDataUrl: '',
    pageBgLight: DEFAULTS.pageBgLight,
    primaryBgLight: DEFAULTS.primaryBgLight,
    primaryLabelLight: DEFAULTS.primaryLabelLight,
    linkColorLight: DEFAULTS.linkColorLight,
  },
  {
    id: 'finance',
    brandName: 'Union Zenith Holding',
    logoHeightLight: 48,
    logoImageDataUrl: '/images/demo-playground-finance-logo.png',
    backgroundImageDataUrl: '/images/demo-playground-finance-bg.webp',
    pageBgLight: '#e8ecf4',
    primaryBgLight: '#09BC8A',
    primaryLabelLight: '#ffffff',
    linkColorLight: '#2563eb',
  },
  {
    id: 'healthcare',
    brandName: 'Wellness Healthcare',
    logoHeightLight: 56,
    logoImageDataUrl: '/images/demo-playground-healthcare-logo.png',
    backgroundImageDataUrl: '/images/demo-playground-healthcare-bg.webp',
    pageBgLight: '#e8f6f6',
    primaryBgLight: '#18BAB8',
    primaryLabelLight: '#ffffff',
    linkColorLight: '#18BAB8',
  },
  {
    id: 'retail',
    brandName: 'wisemart',
    logoHeightLight: 80,
    logoImageDataUrl: '/images/demo-playground-retail-logo.png',
    backgroundImageDataUrl: '/images/demo-playground-retail-bg.webp',
    pageBgLight: '#eef6fb',
    primaryBgLight: '#005DAA',
    primaryLabelLight: '#ffffff',
    linkColorLight: '#005DAA',
  },
  {
    id: 'technology',
    brandName: 'Molto Tech.',
    logoHeightLight: 64,
    logoImageDataUrl: '/images/demo-playground-tech-logo.png',
    pageBgLight: '#eef2ff',
    primaryBgLight: '#7041FF',
    primaryLabelLight: '#ffffff',
    linkColorLight: '#7041FF',
  },
  {
    id: 'food-beverage',
    brandName: 'Crispy Cheese',
    logoHeightLight: 48,
    logoImageDataUrl: '/images/demo-playground-fnb-logo.png',
    backgroundImageDataUrl: '/images/demo-playground-fnb-bg.webp',
    pageBgLight: '#FFF5EA',
    primaryBgLight: '#EA422D',
    primaryLabelLight: '#ffffff',
    linkColorLight: '#EA422D',
  },
];

const DEMO_PRESET_LABEL_KEYS: Record<DemoPresetId, string> = {
  'your-brand': 'presetYourBrand',
  finance: 'presetIndustryFinance',
  healthcare: 'presetIndustryHealthcare',
  retail: 'presetIndustryRetail',
  technology: 'presetIndustryTechnology',
  'food-beverage': 'presetIndustryFoodBeverage',
};

// Note: portal supports logo + background image upload; we simulate via file -> data URL.

function normalizeHex(s: string): string {
  const v = s.trim();
  if (!v) return '';
  const withHash = v.startsWith('#') ? v : `#${v}`;
  if (/^#[0-9a-fA-F]{6}$/.test(withHash)) return withHash.toLowerCase();
  return withHash;
}

/** Unified color + hex row (matches background `ag-login-play__color-field`). */
function ColorHexField({
  inputId,
  value,
  onValueChange,
  ariaLabel,
  pickerFallback = '#cbd5e1',
}: {
  inputId: string;
  value: string;
  onValueChange: (next: string) => void;
  ariaLabel: string;
  pickerFallback?: string;
}) {
  const pickerValue = /^#[0-9a-fA-F]{6}$/.test(value) ? value : pickerFallback;
  return (
    <div className="ag-login-play__color-field">
      <div className="ag-login-play__color-swatch-wrap">
        <input
          className="ag-login-play__color ag-login-play__color--in-field"
          type="color"
          value={pickerValue}
          onChange={(e) => onValueChange(e.target.value)}
          aria-label={ariaLabel}
          title={ariaLabel}
        />
      </div>
      <input
        id={inputId}
        className="ag-login-play__color-hex-input"
        type="text"
        value={value}
        onChange={(e) => onValueChange(normalizeHex(e.target.value))}
        placeholder={pickerFallback}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

function primaryButtonBorderRadius(
  t: BorderRadiusStyleType,
  roundedValue: string,
): number | string {
  if (t === 'none') return 0;
  if (t === 'rounded') return roundedValue || '0.875em';
  return 9999;
}

function AccordionSection({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const headingId = `ag-acc-${id}-h`;
  const panelId = `ag-acc-${id}-p`;
  return (
    <div className="ag-login-play__accordion">
      <button
        type="button"
        className="ag-login-play__accordion-trigger"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="ag-login-play__accordion-title">{title}</span>
        <span className="ag-login-play__accordion-chevron" aria-hidden />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!open}
        className="ag-login-play__accordion-panel"
      >
        <div className="ag-login-play__accordion-body">{children}</div>
      </div>
    </div>
  );
}

/** Border-radius style preset row — same chrome as card alignment (`ag-login-play__align`). */
function RadiusStyleToggle({
  value,
  onChange,
  groupAriaLabel,
  t,
}: {
  value: BorderRadiusStyleType;
  onChange: (next: BorderRadiusStyleType) => void;
  groupAriaLabel: string;
  t: (key: string) => string;
}) {
  return (
    <div className="ag-login-play__align" role="group" aria-label={groupAriaLabel}>
      <button
        type="button"
        className="ag-login-play__align-btn"
        data-active={value === 'none'}
        aria-pressed={value === 'none'}
        aria-label={t('radius_none')}
        onClick={() => onChange('none')}
      >
        <svg className="ag-login-play__radius-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="4"
            y="8"
            width="16"
            height="8"
            rx="0"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
      <button
        type="button"
        className="ag-login-play__align-btn"
        data-active={value === 'rounded'}
        aria-pressed={value === 'rounded'}
        aria-label={t('radius_rounded')}
        onClick={() => onChange('rounded')}
      >
        <svg className="ag-login-play__radius-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="4"
            y="8"
            width="16"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
      <button
        type="button"
        className="ag-login-play__align-btn"
        data-active={value === 'rounded-full'}
        aria-pressed={value === 'rounded-full'}
        aria-label={t('radius_rounded_full')}
        onClick={() => onChange('rounded-full')}
      >
        <svg className="ag-login-play__radius-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="4"
            y="8"
            width="16"
            height="8"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}

function LoginCustomizationPlaygroundInstance({ locale }: { locale: string }) {
  const instanceId = 'a';
  const fid = (name: string) => `ag-login-play-${instanceId}-${name}`;
  const t = (key: string) => tFn(locale, `CustomizationPlayground.${key}`);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);
  const logoDevToken = import.meta.env.PUBLIC_LOGO_DEV_TOKEN ?? '';
  const logoDevSearchAbortRef = useRef<AbortController | null>(null);

  // One-shot engagement event: fires once per session on the first meaningful
  // interaction with the playground. `first_action` records which control
  // category drew the user in (see PlaygroundFirstAction).
  const interactedRef = useRef(false);
  const markInteract = (action: PlaygroundFirstAction) => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    trackEvent('playground-interact', { first_action: action });
  };
  const sheetOpenedRef = useRef(false);
  const markSheetOpen = () => {
    if (sheetOpenedRef.current) return;
    sheetOpenedRef.current = true;
    trackEvent('playground-sheet-open');
  };
  const isNarrow = !useMediaQuery('(min-width: 900px)');
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetId = `ag-login-play-${instanceId}-sheet`;
  const openSheet = () => {
    markSheetOpen();
    setSheetOpen(true);
  };
  const closeSheet = () => setSheetOpen(false);
  const yourBrandDraftRef = useRef<YourBrandDraft | null>(null);

  const [selectedPresetId, setSelectedPresetId] = useState<DemoPresetId>('your-brand');
  const [brandName, setBrandName] = useState(DEFAULTS.brandName);
  const [logoHeightLight, setLogoHeightLight] = useState(DEFAULTS.logoHeightLight);
  const [logoImageDataUrl, setLogoImageDataUrl] = useState('');
  const [logoLookup, setLogoLookup] = useState('');
  const [logoDevResults, setLogoDevResults] = useState<LogoDevSearchResult[]>([]);
  const [logoDevSearchState, setLogoDevSearchState] = useState<
    'idle' | 'loading' | 'done'
  >('idle');
  const [logoImageScale, setLogoImageScale] = useState(1);
  const [cardAlignment, setCardAlignment] = useState<Alignment>(DEFAULTS.cardAlignment);
  const [pageBgLight, setPageBgLight] = useState(DEFAULTS.pageBgLight);
  const [backgroundImageDataUrl, setBackgroundImageDataUrl] = useState(
    DEFAULTS.backgroundImageDataUrl,
  );
  const [primaryBgLight, setPrimaryBgLight] = useState(DEFAULTS.primaryBgLight);
  const [primaryLabelLight, setPrimaryLabelLight] = useState(DEFAULTS.primaryLabelLight);
  const [buttonRadiusType, setButtonRadiusType] = useState<BorderRadiusStyleType>(
    DEFAULTS.buttonRadiusType,
  );
  const [buttonRadiusValue, setButtonRadiusValue] = useState(DEFAULTS.buttonRadiusValue);
  const [inputRadiusType, setInputRadiusType] = useState<BorderRadiusStyleType>(
    DEFAULTS.inputRadiusType,
  );
  const [inputRadiusValue, setInputRadiusValue] = useState(DEFAULTS.inputRadiusValue);
  const [linkColorLight, setLinkColorLight] = useState(DEFAULTS.linkColorLight);

  const [accBgOpen, setAccBgOpen] = useState(true);
  const [accLogoOpen, setAccLogoOpen] = useState(false);
  const [accCardOpen, setAccCardOpen] = useState(false);
  const [accColorsOpen, setAccColorsOpen] = useState(false);
  const [accInputOpen, setAccInputOpen] = useState(false);
  const [linkDecoration, setLinkDecoration] = useState(DEFAULTS.linkDecoration);
  const isDark = false;
  const logoHeightPx = logoHeightLight;
  const logoMaxHeightPx = logoImageDataUrl
    ? Math.round(logoHeightPx * (Number.isFinite(logoImageScale) ? logoImageScale : 1))
    : logoHeightPx;
  const primaryBg = primaryBgLight;
  const primaryLabel = primaryLabelLight;
  const linkColor = linkColorLight;

  const previewBgStyle = useMemo(() => {
    if (backgroundImageDataUrl) {
      return {
        backgroundColor: pageBgLight,
        backgroundImage: `url("${backgroundImageDataUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      } as const;
    }
    return {
      backgroundColor: pageBgLight,
      backgroundImage: 'none',
    } as const;
  }, [backgroundImageDataUrl, pageBgLight]);

  const applyDemoPreset = (preset: DemoPreset) => {
    markInteract('preset');
    if (selectedPresetId === 'your-brand' && preset.id !== 'your-brand') {
      yourBrandDraftRef.current = {
        brandName,
        logoLookup,
        logoImageDataUrl,
        logoImageScale: Number.isFinite(logoImageScale) ? logoImageScale : 1,
      };
    }

    setSelectedPresetId(preset.id);

    if (preset.id === 'your-brand') {
      const draft = yourBrandDraftRef.current;
      if (draft) {
        setBrandName(draft.brandName.trim() ? draft.brandName : DEFAULTS.brandName);
        setLogoLookup(draft.logoLookup);
        setLogoImageDataUrl(draft.logoImageDataUrl || '');
        setLogoImageScale(Number.isFinite(draft.logoImageScale) ? draft.logoImageScale : 1);
      } else {
        setBrandName(preset.brandName);
        setLogoLookup('');
        setLogoImageDataUrl(preset.logoImageDataUrl || '');
        setLogoImageScale(typeof preset.logoImageScale === 'number' ? preset.logoImageScale : 1);
      }
    } else {
      setBrandName(preset.brandName);
      setLogoLookup(preset.brandName);
      setLogoImageDataUrl(preset.logoImageDataUrl || '');
      setLogoImageScale(typeof preset.logoImageScale === 'number' ? preset.logoImageScale : 1);
    }

    setLogoHeightLight(preset.logoHeightLight);
    setBackgroundImageDataUrl(preset.backgroundImageDataUrl || '');
    setPageBgLight(preset.pageBgLight);
    setPrimaryBgLight(preset.primaryBgLight);
    setPrimaryLabelLight(preset.primaryLabelLight);
    setLinkColorLight(preset.linkColorLight);
    setLogoDevResults([]);
    setLogoDevSearchState('idle');
  };

  /** Matches authui `layout.css`: `.layout--common` + `[alignment-card]` uses flex-col + items-* */
  const cardAlignItems: Record<Alignment, 'flex-start' | 'center' | 'flex-end'> =
    useMemo(
      () => ({
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
      }),
      [],
    );

  const btnR = primaryButtonBorderRadius(buttonRadiusType, buttonRadiusValue);
  const inputR = primaryButtonBorderRadius(inputRadiusType, inputRadiusValue);

  const linkTextDecoration = linkDecoration === 'underline' ? 'underline' : 'none';
  const linkDecorationDashFill = /^#[0-9a-fA-F]{6}$/.test(normalizeHex(linkColorLight))
    ? normalizeHex(linkColorLight)
    : '#176df3';

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!isNarrow) return;
    if (sheetOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isNarrow, sheetOpen]);

  useEffect(() => {
    if (!isNarrow || !sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isNarrow, sheetOpen]);

  const onPickBackgroundImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    markInteract('background');
    const reader = new FileReader();
    reader.onload = () => setBackgroundImageDataUrl(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const onPickLogoImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    markInteract('logo');
    const reader = new FileReader();
    reader.onload = () => setLogoImageDataUrl(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const onChangeLogoLookup: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const next = e.target.value;
    markInteract('logo');
    setLogoLookup(next);
    setLogoDevResults([]);
    setLogoDevSearchState('idle');

    // When a demo preset is selected, keep its preset logo/background.
    // Company name editing should not replace the preset logo.
    if (selectedPresetId !== 'your-brand') {
      setBrandName(next.trim() ? next : DEFAULTS.brandName);
      return;
    }
    // For "Your brand", typing is only for searching.
    // Keep the preview logo as-is (default placeholder until a result is chosen).
    setBrandName(next.trim() ? next : DEFAULTS.brandName);
  };

  const onSubmitLogoDevSearch: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key !== 'Enter') return;
    if (selectedPresetId !== 'your-brand') return;
    const q = logoLookup.trim();
    if (!q) return;

    e.preventDefault();
    logoDevSearchAbortRef.current?.abort();
    const ac = new AbortController();
    logoDevSearchAbortRef.current = ac;

    setLogoDevSearchState('loading');
    setLogoDevResults([]);
    try {
      const url = new URL('/api/logo-dev/search/', window.location.origin);
      url.searchParams.set('q', q);
      const resp = await fetch(url.toString(), { method: 'GET', signal: ac.signal });
      if (!resp.ok) {
        // Fail silently on 401/403 (config), 429 (quota), 5xx (upstream).
        // The user can still upload a logo manually below.
        setLogoDevSearchState('idle');
        return;
      }
      const data = (await resp.json()) as unknown;
      const arr = Array.isArray(data) ? data : [];
      const results: LogoDevSearchResult[] = arr
        .map((x) => {
          if (!x || typeof x !== 'object') return null;
          const name = (x as any).name;
          const domain = (x as any).domain;
          if (typeof name !== 'string' || typeof domain !== 'string') return null;
          return { name, domain };
        })
        .filter(Boolean) as LogoDevSearchResult[];
      setLogoDevResults(results);
      setLogoDevSearchState('done');
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return;
      setLogoDevSearchState('idle');
    }
  };

  const onPickLogoDevResult = (r: LogoDevSearchResult) => {
    markInteract('logo');
    setLogoLookup(r.name);
    setBrandName(r.name);
    setLogoDevResults([]);
    setLogoDevSearchState('idle');

    const params = new URLSearchParams({
      token: logoDevToken,
      format: 'webp',
      size: '256',
      retina: 'true',
    });
    setLogoImageDataUrl(`https://img.logo.dev/${r.domain}?${params.toString()}`);
  };

  return (
    <div className="ag-login-play__instance">
      <div
        className="ag-login-play__preset-row"
        role="toolbar"
        aria-label={t('presetToolbarAria')}
      >
        {DEMO_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="ag-login-play__preset-btn"
            data-active={selectedPresetId === preset.id}
            aria-pressed={selectedPresetId === preset.id}
            onClick={() => applyDemoPreset(preset)}
          >
            {t(DEMO_PRESET_LABEL_KEYS[preset.id])}
          </button>
        ))}
      </div>

      <div className="ag-login-play__surface">
          <div className="ag-login-play__surface-main">
            <p className="ag-login-play__preview-label">{t('previewLabel')}</p>
            <div className="ag-login-play__preview-wrap">
              <div
                className="ag-login-play__preview"
                style={{
                  ...previewBgStyle,
                  alignItems: cardAlignItems[cardAlignment],
                }}
              >
                {/* Structure mirrors authui authflowv2: layout--common + widget + widget-content + screen-logo-layout */}
                <div
                  className={`ag-login-play__widget ag-login-play__widget--${isDark ? 'dark' : 'light'}`}
                >
                  <div className="ag-login-play__screen-logo-layout">
                    <div className="ag-login-play__brand-row">
                      {logoImageDataUrl ? (
                        <img
                          className="ag-login-play__brand-img"
                          src={logoImageDataUrl}
                          alt={brandName.trim() || t('brandPlaceholder')}
                          style={{ maxHeight: `${logoMaxHeightPx}px` }}
                        />
                      ) : (
                        <div
                          className="ag-login-play__brand ag-login-play__brand--color-block"
                          style={{
                            width: `${logoHeightPx}px`,
                            height: `${logoHeightPx}px`,
                          }}
                          role="img"
                          aria-label={brandName.trim() || t('brandPlaceholder')}
                        />
                      )}
                    </div>
                    <div className="ag-login-play__screen-title-description">
                      <h2 className="ag-login-play__screen-title">{t('welcomeTitle')}</h2>
                      <p className="ag-login-play__screen-description">
                        {t('welcomeSubtitle').replace(
                          '{brand}',
                          brandName.trim() || t('brandPlaceholder'),
                        )}
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="ag-login-play__input ag-login-play__input--authui"
                    readOnly
                    tabIndex={-1}
                    aria-label={t('emailPlaceholder')}
                    placeholder={t('emailPlaceholder')}
                    style={{ borderRadius: inputR }}
                  />
                  <button
                    type="button"
                    className="ag-login-play__btn ag-login-play__btn--authui"
                    style={{
                      backgroundColor: primaryBg,
                      color: primaryLabel,
                      borderRadius: btnR,
                    }}
                  >
                    {t('primaryCta')}
                  </button>
                  <span
                    className={`ag-login-play__link ag-login-play__link--authui ag-login-play__link--${isDark ? 'dark' : 'light'}`}
                  >
                    <span className="ag-login-play__link-lead">{t('secondaryLinkLead')}</span>
                    <span
                      className="ag-login-play__link-action"
                      style={{
                        color: linkColor,
                        textDecoration: linkTextDecoration,
                        textUnderlineOffset: linkDecoration === 'underline' ? '2px' : undefined,
                      }}
                    >
                      {t('secondaryLinkAction')}
                    </span>
                  </span>
                  <div className="ag-login-play__divider" aria-hidden>
                    <span className="ag-login-play__divider-line" />
                    <span className="ag-login-play__divider-text">{t('or')}</span>
                    <span className="ag-login-play__divider-line" />
                  </div>
                  <div className="ag-login-play__social-stack">
                    <button
                      type="button"
                      className="ag-login-play__social-btn"
                      style={{ borderRadius: btnR }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="ag-login-play__social-ic" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.792 18.7035C21.429 19.542 20.9994 20.3139 20.5016 21.0235C19.8231 21.9908 19.2676 22.6605 18.8395 23.0323C18.1758 23.6426 17.4647 23.9552 16.7032 23.973C16.1566 23.973 15.4973 23.8175 14.73 23.5019C13.9601 23.1878 13.2525 23.0323 12.6056 23.0323C11.9271 23.0323 11.1994 23.1878 10.4211 23.5019C9.64153 23.8175 9.01355 23.9819 8.53342 23.9982C7.80322 24.0293 7.07539 23.7078 6.3489 23.0323C5.88521 22.6279 5.30523 21.9345 4.61043 20.9524C3.86498 19.9035 3.25211 18.6872 2.77198 17.3006C2.25777 15.8029 2 14.3526 2 12.9484C2 11.3401 2.34754 9.95284 3.04367 8.79035C3.59076 7.8566 4.31859 7.12003 5.22953 6.57931C6.14046 6.03858 7.12473 5.76304 8.18469 5.74541C8.76467 5.74541 9.52524 5.92481 10.4704 6.27739C11.4129 6.63116 12.0181 6.81056 12.2834 6.81056C12.4817 6.81056 13.154 6.60079 14.2937 6.18258C15.3714 5.79474 16.281 5.63415 17.0262 5.69741C19.0454 5.86037 20.5624 6.65634 21.5712 8.09037C19.7654 9.18456 18.8721 10.7171 18.8898 12.6831C18.9061 14.2145 19.4617 15.4888 20.5535 16.5006C21.0483 16.9703 21.6009 17.3332 22.2156 17.591C22.0823 17.9776 21.9416 18.348 21.792 18.7035Z" fill="currentColor"/>
                          <path d="M17.161 0.480381C17.161 1.68066 16.7225 2.80135 15.8484 3.83865C14.7937 5.0718 13.5179 5.78437 12.1343 5.67193C12.1167 5.52793 12.1065 5.37638 12.1065 5.21713C12.1065 4.06487 12.6081 2.83172 13.4989 1.82345C13.9436 1.31295 14.5092 0.888472 15.1951 0.54986C15.8796 0.216299 16.5269 0.0318332 17.1358 0.000244141C17.1536 0.160702 17.161 0.32117 17.161 0.480365V0.480381Z" fill="currentColor"/>
                        </svg>
                      </span>
                      <span>{t('signInWithApple')}</span>
                    </button>
                    <button
                      type="button"
                      className="ag-login-play__social-btn"
                      style={{ borderRadius: btnR }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="ag-login-play__social-ic" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z" fill="#0866FF"/>
                          <path d="M16.7002 15.6672L17.3737 12H13.454V10.703C13.454 8.76526 14.2143 8.01982 16.1818 8.01982C16.7929 8.01982 17.2849 8.0347 17.5681 8.06446V4.74046C17.0314 4.59118 15.7196 4.44238 14.9593 4.44238C10.9493 4.44238 9.10087 6.3355 9.10087 10.4198V12H6.62646V15.6672H9.10087V23.6467C10.0292 23.8771 11.0002 24 11.9996 24C12.4916 24 12.9769 23.9697 13.4535 23.9121V15.6672H16.6997H16.7002Z" fill="white"/>
                        </svg>
                      </span>
                      <span>{t('loginWithFacebook')}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ag-login-play__preview-mask">
                <a
                  className="ds-btn ds-btn-secondary"
                  href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=playground-preview-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('signup', { location: 'playground-preview-hover' })}
                >
                  {t('previewHoverMaskCta')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ds-btn__icon-arrow"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden={true}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
              {isNarrow ? (
                <a
                  className="ag-login-play__signup-chip"
                  href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=playground-mobile-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEvent('signup', { location: 'playground-mobile-chip' });
                  }}
                >
                  {t('getStartedCta')} →
                </a>
              ) : null}
            </div>
          </div>

          {isNarrow ? (
            <button
              type="button"
              className="ag-login-play__sheet-backdrop"
              aria-label={t('closeSheetAria')}
              onClick={closeSheet}
              tabIndex={-1}
              hidden={!sheetOpen}
            />
          ) : null}
          <aside
            className="ag-login-play__panel"
            aria-label={isNarrow ? undefined : t('configAria')}
            aria-labelledby={isNarrow ? `${sheetId}-title` : undefined}
            role={isNarrow ? 'dialog' : undefined}
            aria-modal={isNarrow ? false : undefined}
            id={sheetId}
            data-open={isNarrow ? sheetOpen : undefined}
            aria-hidden={isNarrow && !sheetOpen ? true : undefined}
          >
            <div className="ag-login-play__sheet-top">
              {isNarrow ? (
                <div className="ag-login-play__sheet-handle" aria-hidden />
              ) : null}
              <div className="ag-login-play__panel-header">
                <p id={`${sheetId}-title`} className="ag-login-play__panel-intro">{t('panelIntro')}</p>
                {isNarrow ? (
                  <button
                    type="button"
                    ref={closeButtonRef}
                    className="ag-login-play__sheet-close"
                    aria-label={t('closeSheetAria')}
                    onClick={closeSheet}
                  >
                    ×
                  </button>
                ) : null}
              </div>
            </div>
            {/* Organisation — portal DesignScreen OrganisationConfiguration */}
            <fieldset className="ag-login-play__fieldset ag-login-play__fieldset--organisation">
              <label className="ag-login-play__label" htmlFor={fid('brand')}>
                {t('organisationNameLabel')}
              </label>
              <div className="ag-login-play__logo-search-wrap">
                <input
                  id={fid('brand')}
                  className="ag-login-play__text-input"
                  type="text"
                  value={logoLookup}
                  onChange={onChangeLogoLookup}
                  onKeyDown={onSubmitLogoDevSearch}
                  placeholder={t('logoLookupPlaceholder')}
                  maxLength={80}
                  autoComplete="off"
                  spellCheck={false}
                />
                {selectedPresetId === 'your-brand' ? (
                  <div className="ag-login-play__logo-search">
                    {logoDevSearchState !== 'idle' ? (
                      <div className="ag-login-play__logo-search-list" role="listbox">
                        {logoDevResults.length > 0 ? (
                          logoDevResults.map((r) => (
                            <button
                              key={`${instanceId}-${r.domain}-${r.name}`}
                              type="button"
                              className="ag-login-play__logo-search-item"
                              onClick={() => onPickLogoDevResult(r)}
                            >
                              <img
                                className="ag-login-play__logo-search-img"
                                src={`https://img.logo.dev/${r.domain}?token=${encodeURIComponent(
                                  logoDevToken,
                                )}&format=webp&retina=true&size=64`}
                                alt=""
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.visibility = 'hidden';
                                }}
                              />
                              <span className="ag-login-play__logo-search-text">
                                <span className="ag-login-play__logo-search-name">{r.name}</span>
                                <span className="ag-login-play__logo-search-domain">
                                  {r.domain}
                                </span>
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="ag-login-play__logo-search-empty">
                            {logoDevSearchState === 'loading'
                              ? t('logoSearchLoading')
                              : t('logoSearchNoResults')}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {!logoDevToken ? (
                <p className="ag-login-play__hint" style={{ marginTop: '0.75rem' }}>
                  {t('logoLookupMissingTokenHint')}
                </p>
              ) : null}
            </fieldset>

            {/* Logo — portal AppLogoConfiguration (text stand-in for uploaded logo) */}
            <AccordionSection
              id={`${instanceId}-logo`}
              title={t('logoSection')}
              open={accLogoOpen}
              onToggle={() => { markInteract('accordion'); setAccLogoOpen((v) => !v); }}
            >
              <label className="ag-login-play__label" htmlFor={fid('logo-file')}>
                {t('logoImage')}
              </label>
              <div className="ag-login-play__upload-row">
                <div className="ag-login-play__upload-thumb" aria-hidden>
                  {logoImageDataUrl ? (
                    <img
                      className="ag-login-play__upload-thumb-img ag-login-play__upload-thumb-img--logo"
                      src={logoImageDataUrl}
                      alt=""
                      onError={() => setLogoImageDataUrl('')}
                    />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 5.5C4 4.67157 4.67157 4 5.5 4H18.5C19.3284 4 20 4.67157 20 5.5V18.5C20 19.3284 19.3284 20 18.5 20H5.5C4.67157 20 4 19.3284 4 18.5V5.5Z" stroke="#94A3B8" strokeWidth="1.5"/>
                      <path d="M8 15L11 12L14 15L16 13L20 17" stroke="#94A3B8" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M9 9.25C9 9.94036 8.44036 10.5 7.75 10.5C7.05964 10.5 6.5 9.94036 6.5 9.25C6.5 8.55964 7.05964 8 7.75 8C8.44036 8 9 8.55964 9 9.25Z" fill="#94A3B8"/>
                    </svg>
                  )}
                </div>
                <input
                  id={fid('logo-file')}
                  ref={logoFileInputRef}
                  className="ag-login-play__file ag-login-play__file--hidden"
                  type="file"
                  accept="image/*"
                  onChange={onPickLogoImage}
                />
                <button
                  type="button"
                  className={
                    logoImageDataUrl
                      ? 'ag-login-play__upload-btn ag-login-play__upload-btn--danger'
                      : 'ag-login-play__upload-btn'
                  }
                  onClick={() => {
                    if (logoImageDataUrl) {
                      setLogoImageDataUrl('');
                      if (logoFileInputRef.current) logoFileInputRef.current.value = '';
                      return;
                    }
                    logoFileInputRef.current?.click();
                  }}
                >
                  {logoImageDataUrl ? t('remove') : t('upload')}
                </button>
              </div>
              <p className="ag-login-play__hint">{t('logoImageUploadHint')}</p>
              <label className="ag-login-play__label" htmlFor={fid('logo-h-light')} style={{ marginTop: '0.75rem' }}>
                {t('logoHeightLight')}
              </label>
              <div className="ag-login-play__range-row">
                <input
                  id={fid('logo-h-light')}
                  className="ag-login-play__range"
                  type="range"
                  min={40}
                  max={120}
                  value={logoHeightLight}
                  onChange={(e) => setLogoHeightLight(Number(e.target.value))}
                />
                <span className="ag-login-play__range-val">{logoHeightLight}px</span>
              </div>
            </AccordionSection>

            {/* Card — portal AlignmentConfiguration */}
            <AccordionSection
              id={`${instanceId}-card`}
              title={t('cardSection')}
              open={accCardOpen}
              onToggle={() => { markInteract('accordion'); setAccCardOpen((v) => !v); }}
            >
              <span className="ag-login-play__label">{t('cardAlignmentLabel')}</span>
              <div className="ag-login-play__align" role="group" aria-label={t('cardAlignmentLabel')}>
                <button
                  type="button"
                  className="ag-login-play__align-btn"
                  data-active={cardAlignment === 'start'}
                  aria-pressed={cardAlignment === 'start'}
                  aria-label={t('alignStart')}
                  onClick={() => { markInteract('alignment'); setCardAlignment('start'); }}
                >
                  <svg className="ag-login-play__align-svg" viewBox="0 0 16 14" aria-hidden>
                    <rect x="0.75" y="0.75" width="14.5" height="12.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="2.5" y="5" width="4" height="4" rx="0.5" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="ag-login-play__align-btn"
                  data-active={cardAlignment === 'center'}
                  aria-pressed={cardAlignment === 'center'}
                  aria-label={t('alignCenter')}
                  onClick={() => { markInteract('alignment'); setCardAlignment('center'); }}
                >
                  <svg className="ag-login-play__align-svg" viewBox="0 0 16 14" aria-hidden>
                    <rect x="0.75" y="0.75" width="14.5" height="12.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="6" y="5" width="4" height="4" rx="0.5" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="ag-login-play__align-btn"
                  data-active={cardAlignment === 'end'}
                  aria-pressed={cardAlignment === 'end'}
                  aria-label={t('alignEnd')}
                  onClick={() => { markInteract('alignment'); setCardAlignment('end'); }}
                >
                  <svg className="ag-login-play__align-svg" viewBox="0 0 16 14" aria-hidden>
                    <rect x="0.75" y="0.75" width="14.5" height="12.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="9.5" y="5" width="4" height="4" rx="0.5" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </AccordionSection>

            {/* Background — portal BackgroundConfiguration */}
            <AccordionSection
              id={`${instanceId}-bg`}
              title={t('backgroundSection')}
              open={accBgOpen}
              onToggle={() => { markInteract('accordion'); setAccBgOpen((v) => !v); }}
            >
              <label className="ag-login-play__label" htmlFor={fid('bg-color')}>
                {t('backgroundColorLight')}
              </label>
              <ColorHexField
                inputId={fid('bg-color')}
                value={pageBgLight}
                onValueChange={(next) => {
                  markInteract('color');
                  setPageBgLight(next);
                }}
                ariaLabel={t('backgroundColorLight')}
                pickerFallback="#cbd5e1"
              />
              <label
                className="ag-login-play__label"
                style={{ marginTop: '0.75rem' }}
              >
                {t('backgroundImage')}
              </label>
              <div className="ag-login-play__upload-row">
                <div className="ag-login-play__upload-thumb" aria-hidden>
                  {backgroundImageDataUrl ? (
                    <img className="ag-login-play__upload-thumb-img" src={backgroundImageDataUrl} alt="" />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 5.5C4 4.67157 4.67157 4 5.5 4H18.5C19.3284 4 20 4.67157 20 5.5V18.5C20 19.3284 19.3284 20 18.5 20H5.5C4.67157 20 4 19.3284 4 18.5V5.5Z" stroke="#94A3B8" strokeWidth="1.5"/>
                      <path d="M8 15L11 12L14 15L16 13L20 17" stroke="#94A3B8" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M9 9.25C9 9.94036 8.44036 10.5 7.75 10.5C7.05964 10.5 6.5 9.94036 6.5 9.25C6.5 8.55964 7.05964 8 7.75 8C8.44036 8 9 8.55964 9 9.25Z" fill="#94A3B8"/>
                    </svg>
                  )}
                </div>
                <input
                  ref={bgFileInputRef}
                  className="ag-login-play__file ag-login-play__file--hidden"
                  type="file"
                  accept="image/*"
                  onChange={onPickBackgroundImage}
                />
                <button
                  type="button"
                  className={
                    backgroundImageDataUrl
                      ? 'ag-login-play__upload-btn ag-login-play__upload-btn--danger'
                      : 'ag-login-play__upload-btn'
                  }
                  onClick={() => {
                    if (backgroundImageDataUrl) {
                      setBackgroundImageDataUrl('');
                      if (bgFileInputRef.current) bgFileInputRef.current.value = '';
                      return;
                    }
                    bgFileInputRef.current?.click();
                  }}
                >
                  {backgroundImageDataUrl ? t('remove') : t('upload')}
                </button>
              </div>
              <p className="ag-login-play__hint">{t('backgroundImageUploadHint')}</p>
            </AccordionSection>

            {/* Colors: buttons + links — portal ButtonConfiguration + LinkConfiguration */}
            <AccordionSection
              id={`${instanceId}-colors`}
              title={t('colorsSection')}
              open={accColorsOpen}
              onToggle={() => { markInteract('accordion'); setAccColorsOpen((v) => !v); }}
            >
            <fieldset className="ag-login-play__fieldset ag-login-play__fieldset--in-accordion">
              <legend className="ag-login-play__legend">{t('buttonsSection')}</legend>
              <label className="ag-login-play__label" htmlFor={fid('primary-bg')}>
                {t('primaryButtonLight')}
              </label>
              <ColorHexField
                inputId={fid('primary-bg')}
                value={primaryBgLight}
                onValueChange={(next) => { markInteract('color'); setPrimaryBgLight(next); }}
                ariaLabel={t('primaryButtonLight')}
                pickerFallback="#176df3"
              />
              <label
                className="ag-login-play__label"
                style={{ marginTop: '0.65rem' }}
                htmlFor={fid('primary-label')}
              >
                {t('primaryButtonLabelLight')}
              </label>
              <ColorHexField
                inputId={fid('primary-label')}
                value={primaryLabelLight}
                onValueChange={(next) => { markInteract('color'); setPrimaryLabelLight(next); }}
                ariaLabel={t('primaryButtonLabelLight')}
                pickerFallback="#ffffff"
              />
              <span className="ag-login-play__label" style={{ marginTop: '0.65rem' }}>
                {t('buttonBorderRadiusLabel')}
              </span>
              <RadiusStyleToggle
                value={buttonRadiusType}
                onChange={(next) => { markInteract('radius'); setButtonRadiusType(next); }}
                groupAriaLabel={t('buttonBorderRadiusLabel')}
                t={t}
              />
              {buttonRadiusType === 'rounded' ? (
                <>
                  <label className="ag-login-play__label" htmlFor={fid('btn-radius')}>
                    {t('borderRadiusValueLabel')}
                  </label>
                  <input
                    id={fid('btn-radius')}
                    className="ag-login-play__text-input"
                    type="text"
                    value={buttonRadiusValue}
                    onChange={(e) => { markInteract('radius'); setButtonRadiusValue(e.target.value); }}
                    placeholder="0.875em"
                    autoComplete="off"
                  />
                </>
              ) : null}
            </fieldset>

            <fieldset className="ag-login-play__fieldset ag-login-play__fieldset--in-accordion">
              <legend className="ag-login-play__legend">{t('linksSection')}</legend>
              <label className="ag-login-play__label" htmlFor={fid('link-color')}>
                {t('linkColorLight')}
              </label>
              <ColorHexField
                inputId={fid('link-color')}
                value={linkColorLight}
                onValueChange={(next) => { markInteract('color'); setLinkColorLight(next); }}
                ariaLabel={t('linkColorLight')}
                pickerFallback="#176df3"
              />
              <span className="ag-login-play__label" style={{ marginTop: '0.65rem' }}>
                {t('linkDecoration')}
              </span>
              <div
                className="ag-login-play__link-decoration"
                role="group"
                aria-label={t('linkDecoration')}
              >
                <button
                  type="button"
                  className="ag-login-play__link-decoration-btn"
                  data-active={linkDecoration === 'none'}
                  aria-pressed={linkDecoration === 'none'}
                  aria-label={t('decorationNone')}
                  onClick={() => { markInteract('link-decoration'); setLinkDecoration('none'); }}
                >
                  <svg
                    className="ag-login-play__link-dec-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="5"
                      y="10.75"
                      width="14"
                      height="2.5"
                      rx="1.25"
                      fill={linkDecorationDashFill}
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="ag-login-play__link-decoration-btn"
                  data-active={linkDecoration === 'underline'}
                  aria-pressed={linkDecoration === 'underline'}
                  aria-label={t('decorationUnderline')}
                  onClick={() => { markInteract('link-decoration'); setLinkDecoration('underline'); }}
                >
                  <svg
                    className="ag-login-play__link-dec-svg ag-login-play__link-dec-svg--underline"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 5v5a4 4 0 0 0 8 0V5"
                      stroke="#0f172a"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 19.5h11"
                      stroke="#0f172a"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </fieldset>
            </AccordionSection>

            {/* Input field — portal InputConfiguration (border radius style) */}
            <AccordionSection
              id={`${instanceId}-input`}
              title={t('inputSection')}
              open={accInputOpen}
              onToggle={() => setAccInputOpen((v) => !v)}
            >
              <span className="ag-login-play__label">{t('inputBorderRadiusLabel')}</span>
              <RadiusStyleToggle
                value={inputRadiusType}
                onChange={(next) => { markInteract('radius'); setInputRadiusType(next); }}
                groupAriaLabel={t('inputBorderRadiusLabel')}
                t={t}
              />
              {inputRadiusType === 'rounded' ? (
                <>
                  <label className="ag-login-play__label" htmlFor={fid('input-radius')}>
                    {t('borderRadiusValueLabel')}
                  </label>
                  <input
                    id={fid('input-radius')}
                    className="ag-login-play__text-input"
                    type="text"
                    value={inputRadiusValue}
                    onChange={(e) => { markInteract('radius'); setInputRadiusValue(e.target.value); }}
                    placeholder="0.875em"
                    autoComplete="off"
                  />
                </>
              ) : null}
            </AccordionSection>
          </aside>
          {isNarrow ? (
            <button
              type="button"
              ref={triggerRef}
              className="ag-login-play__trigger-pill"
              aria-expanded={sheetOpen}
              aria-controls={sheetId}
              onClick={openSheet}
              hidden={sheetOpen}
            >
              {t('customizeCta')}
            </button>
          ) : null}
        </div>
    </div>
  );
}

export default function LoginCustomizationPlayground({ locale }: Props) {
  const loginGalleryHref = localizedPath(locale, '/login-gallery');
  const t = (key: string) => tFn(locale, `CustomizationPlayground.${key}`);
  return (
    <div className="ag-login-play-root">
      <div className="ag-login-play">
        <LoginCustomizationPlaygroundInstance locale={locale} />
        <div className="ag-login-play__below">
          <a
            className="ds-btn ds-btn-outline-light ag-login-play__gallery-btn plausible-event-name--playground-cta"
            href={loginGalleryHref}
          >
            {t('exploreLoginGalleryCta')}
          </a>
        </div>
      </div>
    </div>
  );
}
