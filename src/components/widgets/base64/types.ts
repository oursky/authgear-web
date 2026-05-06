// Supported text-charset names for the encoder/decoder. Stored as
// lowercase strings so they can be used as <option value> directly.
export type Charset =
  | 'auto'
  | 'utf-8'
  | 'ascii'
  | 'iso-8859-1'
  | 'iso-8859-2'
  | 'iso-8859-6'
  | 'iso-8859-15'
  | 'windows-1252'
  | 'utf-16';
