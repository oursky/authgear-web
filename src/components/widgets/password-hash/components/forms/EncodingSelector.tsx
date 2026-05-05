import type { ChangeEvent } from 'react';
import type { Algorithm, SaltEncoding } from '../../types';
import { HASH_ENCODING_OPTIONS } from '../../lib/constants';
import { supportsOutputEncoding } from '../../lib/algorithmUtils';

interface Props {
  selectedAlgorithm: Algorithm;
  hashEncoding: SaltEncoding;
  onHashEncodingChange: (encoding: SaltEncoding) => void;
}

export default function EncodingSelector({
  selectedAlgorithm,
  hashEncoding,
  onHashEncodingChange,
}: Props) {
  if (!supportsOutputEncoding(selectedAlgorithm)) return null;

  const handleHashEncodingChange = (e: ChangeEvent<HTMLInputElement>) => {
    onHashEncodingChange(e.target.value as SaltEncoding);
  };

  return (
    <div className="form-group">
      <label className="form-label">Output Encoding</label>
      <div className="encoding-radio-group">
        {HASH_ENCODING_OPTIONS.map((option) => (
          <label key={option.value} className="encoding-radio-option">
            <input
              type="radio"
              name="hashEncoding"
              value={option.value}
              checked={hashEncoding === option.value}
              onChange={handleHashEncodingChange}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
