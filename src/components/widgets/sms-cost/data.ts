import raw from './data.json';

export type Provider = 'twilio' | 'bird' | 'plivo';

export type SmsCountryRow = {
  iso: string;
  country: string;
  popular: boolean;
  providers: Record<Provider, number>;
  whatsapp_price: number;
};

export const PROVIDERS: { id: Provider; label: string }[] = [
  { id: 'twilio', label: 'Twilio' },
  { id: 'bird', label: 'Bird' },
  { id: 'plivo', label: 'Plivo' },
];

export const SMS_COST_DATA = raw as SmsCountryRow[];

/** Per-message SMS rates snapshot date, shown to users and refreshed quarterly. */
export const RATES_AS_OF = 'July 2026';
