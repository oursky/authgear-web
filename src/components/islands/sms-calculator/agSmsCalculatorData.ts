import raw from './agSmsCalculatorData.json';

export type AgCountryRow = {
  iso: string;
  country: string;
  sms_price: number;
  whatsapp_price: number;
  popular: boolean;
};

export const AG_DATA = raw as AgCountryRow[];
