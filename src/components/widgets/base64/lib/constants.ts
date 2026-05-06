import type { Charset } from '../types';

// Supported text charsets, in dropdown order. The label is the
// human-readable form; the value matches the lowercase Charset literal.
export const CHARSETS: { value: Charset; label: string }[] = [
  { value: 'utf-8', label: 'UTF-8' },
  { value: 'ascii', label: 'ASCII' },
  { value: 'iso-8859-1', label: 'ISO-8859-1' },
  { value: 'iso-8859-2', label: 'ISO-8859-2' },
  { value: 'iso-8859-6', label: 'ISO-8859-6' },
  { value: 'iso-8859-15', label: 'ISO-8859-15' },
  { value: 'windows-1252', label: 'Windows-1252' },
  { value: 'utf-16', label: 'UTF-16' },
];

export const DEFAULT_CHARSET: Charset = 'utf-8';
