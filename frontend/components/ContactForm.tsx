'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePlausible } from 'next-plausible';
import IntlTelInput from 'intl-tel-input/react';
import type { IntlTelInputRef } from 'intl-tel-input/react';
import type { Iso2 } from 'intl-tel-input/data';
import 'intl-tel-input/build/css/intlTelInput.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const plausible = usePlausible();
  const [name, setName] = useState(searchParams.get('name') ?? '');
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [howHear, setHowHear] = useState('');
  const [useCase, setUseCase] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const itiRef = useRef<IntlTelInputRef | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    plausible('contact-form-submit');
    if (phone && !phoneValid) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
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
          utm_source: searchParams.get('utm_source') ?? undefined,
          utm_medium: searchParams.get('utm_medium') ?? undefined,
          utm_campaign: searchParams.get('utm_campaign') ?? undefined,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="success-message w-form-done" style={{ display: 'block' }}>
        <div>Thank you! Your submission has been received!</div>
      </div>
    );
  }

  return (
    <div className="form-block w-form">
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Full Name */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Full Name<span className="text-span-7">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Work Email */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Work Email<span className="text-span-8">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number with country picker */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Phone Number<span className="text-span-9">*</span>
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
              className: 'getdemo-field w-input',
              required: true,
              name: 'Phone',
            }}
          />
          {phone && !phoneValid && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
              Invalid phone number
            </span>
          )}
        </div>

        {/* Company Name */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Company Name<span className="text-span-10">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* How did you hear */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            How did you hear about us?<span className="text-span-10">*</span>
          </label>
          <select
            name="how-hear"
            required
            className="getdemo-field w-select"
            value={howHear}
            onChange={(e) => setHowHear(e.target.value)}
          >
            <option value="" disabled>Select one</option>
            <option value="organic-search">Search Engine</option>
            <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
            <option value="github">GitHub</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Anything else */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">Anything else?</label>
          <textarea
            placeholder="Tell us more about your project, needs, timeline"
            maxLength={500}
            name="Use-Case"
            className="get-demo-form-field w-input"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="error-message w-form-fail" style={{ display: 'block' }}>
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        )}

        <div className="margin-vertical margin-medium">
          <input
            type="submit"
            className="getdemo-submit w-button"
            value={status === 'submitting' ? 'Please wait...' : 'Submit'}
            disabled={status === 'submitting'}
          />
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
