import { useEffect, useRef, useState } from 'react';
import IntlTelInput from 'intl-tel-input/react';
import type { IntlTelInputRef } from 'intl-tel-input/react';
import type { Iso2 } from 'intl-tel-input/data';
import 'intl-tel-input/build/css/intlTelInput.css';
import { trackEvent } from '@/lib/plausible';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Locale = 'en' | 'zh-TW';

interface Props {
  /** Page locale — drives user-facing copy. Payload field names stay locale-neutral. */
  locale?: string;
  /** Optional: override the POST target (default `/api/contact`). */
  action?: string;
}

/**
 * User-facing strings for the ContactForm. Kept colocated with the component
 * since none of this copy is shared elsewhere. Submission payload field names
 * (Name, Email, Phone, …) are NOT translated — those are protocol, not UI.
 */
const MESSAGES = {
  en: {
    labelFullName: 'Full Name',
    labelWorkEmail: 'Work Email',
    labelPhoneNumber: 'Phone Number',
    labelCompanyName: 'Company Name',
    labelHowHear: 'How did you hear about us?',
    labelAnythingElse: 'Anything else?',
    useCasePlaceholder: 'Tell us more about your project, needs, timeline',
    howHearSelectOne: 'Select one',
    howHearSearch: 'Search Engine',
    howHearLLM: 'AI Tools (e.g. ChatGPT, Gemini, etc)',
    howHearGitHub: 'GitHub',
    howHearOther: 'Others',
    invalidPhone: 'Invalid phone number',
    submitError: 'Oops! Something went wrong while submitting the form.',
    submit: 'Submit',
    submitting: 'Submitting…',
    successTitle: 'Thanks — we got it.',
    successBody: "We'll be in touch within one business day.",
  },
  'zh-TW': {
    labelFullName: '姓名',
    labelWorkEmail: '公司電子郵件',
    labelPhoneNumber: '電話號碼',
    labelCompanyName: '公司名稱',
    labelHowHear: '您是從哪裡得知我們的?',
    labelAnythingElse: '還有什麼想讓我們知道的?',
    useCasePlaceholder: '告訴我們您的專案、需求與時程',
    howHearSelectOne: '請選擇',
    howHearSearch: '搜尋引擎',
    howHearLLM: 'AI 工具(例如 ChatGPT、Gemini 等)',
    howHearGitHub: 'GitHub',
    howHearOther: '其他',
    invalidPhone: '電話號碼格式不正確',
    submitError: '哎呀!表單送出時發生錯誤,請再試一次。',
    submit: '送出',
    submitting: '送出中⋯',
    successTitle: '感謝您!我們已收到。',
    successBody: '我們將於一個工作日內與您聯繫。',
  },
} as const satisfies Record<Locale, Record<string, string>>;

function getQueryParam(key: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(key) ?? '';
}

function getSubmissionPage(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname + window.location.search;
}

export default function ContactForm({ locale = 'en', action = '/api/contact' }: Props) {
  const l: Locale = locale === 'zh-TW' ? 'zh-TW' : 'en';
  const t = MESSAGES[l];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [howHear, setHowHear] = useState('');
  const [useCase, setUseCase] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const itiRef = useRef<IntlTelInputRef | null>(null);

  useEffect(() => {
    setName(getQueryParam('name'));
    setEmail(getQueryParam('email'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('contact-form-submit');
    if (phone && !phoneValid) return;
    setStatus('submitting');
    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone || undefined,
          Country: country || undefined,
          Company: company,
          'how-hear': howHear,
          'Use-Case': useCase || undefined,
          utm_source: getQueryParam('utm_source') || undefined,
          utm_medium: getQueryParam('utm_medium') || undefined,
          utm_campaign: getQueryParam('utm_campaign') || undefined,
          page: getSubmissionPage() || undefined,
          locale: l,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-block ds-form">
        <div className="ds-form-success" role="status">
          <svg
            className="ds-form-success__icon"
            aria-hidden="true"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="22" fill="#d1fae5" />
            <path
              d="M15 25 L22 32 L34 18"
              stroke="#047857"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className="ds-form-success__title">{t.successTitle}</h3>
          <p className="ds-form-success__body">{t.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-block ds-form">
      <form onSubmit={handleSubmit} className="ds-form__form">
        <div className="ds-form__field">
          <label htmlFor="cf-name" className="ds-form-label">
            {t.labelFullName}<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-name"
            className="ds-form-input"
            maxLength={256}
            name="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-email" className="ds-form-label">
            {t.labelWorkEmail}<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-email"
            className="ds-form-input"
            maxLength={256}
            name="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-phone" className="ds-form-label">
            {t.labelPhoneNumber}<span className="ds-form-label__required">*</span>
          </label>
          <IntlTelInput
            ref={itiRef}
            initOptions={{
              initialCountry: 'auto',
              geoIpLookup: (success, failure) => {
                fetch('https://ipapi.co/json')
                  .then((r) => r.json())
                  .then((data: { country_code?: string }) =>
                    success((data.country_code ?? 'hk') as Iso2)
                  )
                  .catch(() => failure());
              },
              countryOrder: (['hk', 'sg', 'au'] as const) as unknown as Iso2[],
              placeholderNumberType: 'MOBILE',
              nationalMode: true,
            }}
            onChangeNumber={setPhone}
            onChangeValidity={setPhoneValid}
            onChangeCountry={() => {
              const data = itiRef.current?.getInstance()?.getSelectedCountryData();
              setCountry(data?.name ?? '');
            }}
            inputProps={{
              id: 'cf-phone',
              className:
                'ds-form-input' +
                (phone && !phoneValid ? ' ds-form-input--error' : ''),
              required: true,
              name: 'Phone',
              'aria-invalid': phone && !phoneValid ? true : undefined,
              'aria-describedby':
                phone && !phoneValid ? 'cf-phone-error' : undefined,
            }}
          />
          {phone && !phoneValid && (
            <span id="cf-phone-error" className="ds-form-field-error">
              {t.invalidPhone}
            </span>
          )}
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-company" className="ds-form-label">
            {t.labelCompanyName}<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-company"
            className="ds-form-input"
            maxLength={256}
            name="Company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-how-hear" className="ds-form-label">
            {t.labelHowHear}
            <span className="ds-form-label__required">*</span>
          </label>
          <select
            id="cf-how-hear"
            name="how-hear"
            required
            className="ds-form-input"
            value={howHear}
            onChange={(e) => setHowHear(e.target.value)}
          >
            <option value="" disabled>
              {t.howHearSelectOne}
            </option>
            <option value="organic-search">{t.howHearSearch}</option>
            <option value="llm">{t.howHearLLM}</option>
            <option value="github">{t.howHearGitHub}</option>
            <option value="others">{t.howHearOther}</option>
          </select>
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-use-case" className="ds-form-label">
            {t.labelAnythingElse}
          </label>
          <textarea
            id="cf-use-case"
            placeholder={t.useCasePlaceholder}
            maxLength={500}
            name="Use-Case"
            className="ds-form-input"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="ds-form-error" role="alert">
            {t.submitError}
          </div>
        )}

        <button
          type="submit"
          className="ds-btn ds-btn-primary ds-form__submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? t.submitting : t.submit}
          {status !== 'submitting' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ds-btn__icon-arrow"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
