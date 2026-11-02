import { useEffect, useRef, useState } from 'react';
import IntlTelInput from 'intl-tel-input/react';
import type { IntlTelInputRef } from 'intl-tel-input/react';
import type { Iso2 } from 'intl-tel-input/data';
import 'intl-tel-input/build/css/intlTelInput.css';
import { trackEvent } from '@/lib/plausible';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const NETLIFY_FORM_NAME = 'help-desk';

/**
 * "What is the purpose of your enquiry?" — `value` is the stable slug sent
 * over the wire and accepted in the `?purpose=` query string; `label` is what
 * the Notion form called the option, kept verbatim so support staff recognise
 * it. (Notion allowed several; here it is one answer.)
 */
const PURPOSES = [
  { value: 'project-limit', label: 'Increase number of projects limit' },
  { value: 'sms-otp', label: 'Enable SMS/WhatsApp OTP in the project' },
  { value: 'resume-suspended', label: 'Resume suspended project' },
  // Paid plans are vetted by the team before they are enabled.
  { value: 'upgrade-plan', label: 'Request a paid plan for the project' },
  { value: 'other', label: 'Other' },
] as const;

type Purpose = (typeof PURPOSES)[number]['value'];

/** Target countries are only needed when OTP delivery is in scope. */
const SMS_OTP = 'sms-otp';

function encodeFormData(data: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(data)) {
    if (v) params.append(k, v);
  }
  return params.toString();
}

function getQueryParam(key: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(key) ?? '';
}

function getSubmissionPage(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname + window.location.search;
}

/** `?purpose=sms-otp` → the slug, if we recognise it. */
function parsePurposeParam(raw: string): Purpose | '' {
  const match = PURPOSES.find((p) => p.value === raw.trim());
  return match ? match.value : '';
}

/** `example.com` → `https://example.com`, so `type="url"` stops rejecting it. */
function withScheme(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function HelpDeskForm() {
  const [purpose, setPurpose] = useState<Purpose | ''>('');
  const [projectName, setProjectName] = useState('');
  const [company, setCompany] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [targetUsersError, setTargetUsersError] = useState(false);
  const itiRef = useRef<IntlTelInputRef | null>(null);

  // The portal deep-links into this page with what it already knows.
  useEffect(() => {
    setProjectName(getQueryParam('project'));
    setEmail(getQueryParam('email'));
    setName(getQueryParam('name'));
    const prefilled = parsePurposeParam(getQueryParam('purpose'));
    if (prefilled) setPurpose(prefilled);
  }, []);

  const needsTargetUsers = purpose === SMS_OTP;

  // Moving off the OTP option retires its conditional requirement.
  useEffect(() => {
    if (purpose !== SMS_OTP) setTargetUsersError(false);
  }, [purpose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Target countries are only mandatory once OTP delivery is in scope, which
    // no native `required` attribute can express. Everything else is native.
    const missingTargetUsers = purpose === SMS_OTP && targetUsers.trim() === '';
    setTargetUsersError(missingTargetUsers);
    if (missingTargetUsers) return;

    trackEvent('help-desk-form-submit');

    const iti = itiRef.current?.getInstance?.();
    const rawInput = e.currentTarget.elements.namedItem('phone');
    const rawPhone = rawInput instanceof HTMLInputElement ? rawInput.value.trim() : '';
    const dialCode = iti?.getSelectedCountryData?.()?.dialCode ?? '';
    const phoneToSend =
      iti?.getNumber?.() ||
      (rawPhone && !rawPhone.startsWith('+') && dialCode
        ? `+${dialCode}${rawPhone.replace(/^0+/, '')}`
        : rawPhone);

    setStatus('submitting');
    try {
      // Netlify Forms accepts URL-encoded POSTs to any path on the site;
      // the body must include `form-name` matching the registered form.
      // Field names here MUST stay in sync with public/__forms.html.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': NETLIFY_FORM_NAME,
          // Send the human-readable label, so the webhook payload and the
          // Netlify archive read the same as the Notion form did.
          purpose: PURPOSES.find((o) => o.value === purpose)?.label ?? '',
          'project-name': projectName,
          company,
          'company-website': companyWebsite,
          'project-description': projectDescription,
          'target-users': targetUsers,
          name,
          email,
          phone: phoneToSend,
          notes,
          utm_source: getQueryParam('utm_source'),
          utm_medium: getQueryParam('utm_medium'),
          utm_campaign: getQueryParam('utm_campaign'),
          page: getSubmissionPage(),
          locale: 'en',
          source: 'help-desk',
          website: honeypot,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="ds-form">
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
          <h3 className="ds-form-success__title">Thanks — we got your request.</h3>
          <p className="ds-form-success__body">
            Our support team will reply by email, usually within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-form">
      <form
        name={NETLIFY_FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="website"
        onSubmit={handleSubmit}
        className="ds-form__form"
      >
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <fieldset className="ds-form__field ds-form-fieldset">
          <legend className="ds-form-label">
            What is the purpose of your enquiry?<span className="ds-form-label__required">*</span>
          </legend>
          <div className="ds-form-radio-group">
            {PURPOSES.map(({ value, label }) => (
              <label key={value} className="ds-form-radio" htmlFor={`hd-purpose-${value}`}>
                <input
                  id={`hd-purpose-${value}`}
                  type="radio"
                  name="purpose"
                  value={value}
                  required
                  checked={purpose === value}
                  onChange={() => setPurpose(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="ds-form__field">
          <label htmlFor="hd-project-name" className="ds-form-label">
            What is your Authgear project name?<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="hd-project-name"
            className="ds-form-input"
            maxLength={256}
            name="project-name"
            type="text"
            required
            aria-describedby="hd-project-name-hint"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <p id="hd-project-name-hint" className="ds-form-hint">
            You can copy it from the portal header.
          </p>
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-company" className="ds-form-label">
            What is your company name?<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="hd-company"
            className="ds-form-input"
            maxLength={256}
            name="company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-company-website" className="ds-form-label">
            What is the website of your company?<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="hd-company-website"
            className="ds-form-input"
            maxLength={512}
            name="company-website"
            type="url"
            inputMode="url"
            placeholder="https://example.com"
            required
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            onBlur={(e) => setCompanyWebsite(withScheme(e.target.value))}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-project-description" className="ds-form-label">
            Please describe your project<span className="ds-form-label__required">*</span>
          </label>
          <textarea
            id="hd-project-description"
            className="ds-form-input"
            placeholder="What kind of apps are you building?"
            maxLength={1000}
            name="project-description"
            required
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-target-users" className="ds-form-label">
            Where are your target users based in?
            {needsTargetUsers && <span className="ds-form-label__required">*</span>}
          </label>
          <input
            id="hd-target-users"
            className={`ds-form-input${targetUsersError ? ' ds-form-input--error' : ''}`}
            maxLength={256}
            name="target-users"
            type="text"
            aria-describedby="hd-target-users-hint"
            aria-invalid={targetUsersError || undefined}
            value={targetUsers}
            onChange={(e) => {
              setTargetUsers(e.target.value);
              if (e.target.value.trim() !== '') setTargetUsersError(false);
            }}
          />
          <p id="hd-target-users-hint" className="ds-form-hint">
            Which countries are you sending SMS/WhatsApp OTPs to? Required if you want to enable
            SMS/WhatsApp OTP in the project.
          </p>
          {targetUsersError && (
            <p className="ds-form-field-error" role="alert">
              Tell us the target countries so we can enable OTP delivery.
            </p>
          )}
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-name" className="ds-form-label">
            What is your name?<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="hd-name"
            className="ds-form-input"
            maxLength={256}
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-email" className="ds-form-label">
            What is your email address?<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="hd-email"
            className="ds-form-input"
            maxLength={256}
            name="email"
            type="email"
            required
            aria-describedby="hd-email-hint"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p id="hd-email-hint" className="ds-form-hint">
            Business email if applicable.
          </p>
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-phone" className="ds-form-label">
            What is your phone number?
          </label>
          <IntlTelInput
            ref={itiRef}
            initOptions={{
              initialCountry: 'auto',
              geoIpLookup: (success) => {
                // geojs.io is CORS-enabled for all origins and free — same
                // lookup the contact form uses.
                fetch('https://get.geojs.io/v1/ip/country.json')
                  .then((r) => r.json())
                  .then((data: { country?: string }) =>
                    success((data.country ?? 'gb').toLowerCase() as Iso2)
                  )
                  .catch(() => success('gb' as Iso2));
              },
              countryOrder: (['gb', 'hk', 'sg', 'tw'] as const) as unknown as Iso2[],
              placeholderNumberType: 'MOBILE',
              nationalMode: true,
            }}
            inputProps={{
              id: 'hd-phone',
              className: 'ds-form-input',
              name: 'phone',
            }}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="hd-notes" className="ds-form-label">
            Is there other things regarding your enquiry we should know about?
          </label>
          <textarea
            id="hd-notes"
            className="ds-form-input"
            maxLength={1000}
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="ds-form-error" role="alert">
            Oops! Something went wrong while submitting the form.
          </div>
        )}

        <button
          type="submit"
          className="ds-btn ds-btn-primary ds-form__submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit'}
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
