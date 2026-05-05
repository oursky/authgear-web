import type { ChangeEvent } from 'react';
import type { Algorithm, SaltEncoding } from '../../types';
import { SALT_ENCODING_OPTIONS } from '../../lib/constants';
import { supportsSaltFormat } from '../../lib/algorithmUtils';

interface Props {
  saltInput: string;
  saltEncoding: SaltEncoding;
  saltByteLength: number;
  validationError: string;
  selectedAlgorithm: Algorithm;
  onSaltChange: (value: string) => void;
  onSaltEncodingChange: (encoding: SaltEncoding) => void;
  onGenerateSalt: () => void;
}

export default function SaltConfiguration({
  saltInput,
  saltEncoding,
  saltByteLength,
  validationError,
  selectedAlgorithm,
  onSaltChange,
  onSaltEncodingChange,
  onGenerateSalt,
}: Props) {
  const handleSaltChange = (e: ChangeEvent<HTMLInputElement>) => onSaltChange(e.target.value);
  const handleSaltEncodingChange = (e: ChangeEvent<HTMLInputElement>) =>
    onSaltEncodingChange(e.target.value as SaltEncoding);

  const showSaltFormat = supportsSaltFormat(selectedAlgorithm);

  return (
    <div className="salt-config-card">
      <div className="salt-value-section">
        <label className="salt-value-label">Salt Value</label>
        <div className="salt-value-container">
          <input
            type="text"
            className={`salt-value-input ${validationError ? 'error' : ''}`}
            value={saltInput}
            onChange={handleSaltChange}
            placeholder="Enter salt value or generate one..."
          />
          <div className="salt-value-info">
            <span className="salt-length-display">
              {saltInput ? `${saltByteLength} bytes` : '0 bytes'}
            </span>
          </div>
        </div>
        {validationError && <div className="salt-validation-error">⚠️ {validationError}</div>}
      </div>

      <div className="salt-controls-inline">
        <div className="salt-control-item">
          <label className="salt-control-label-inline">Length (bytes)</label>
          <input
            type="number"
            className="salt-length-input-inline"
            value={16}
            min={8}
            max={64}
            step={1}
            disabled
            readOnly
          />
        </div>

        {showSaltFormat && (
          <div className="salt-control-item">
            <label className="salt-control-label-inline">Format</label>
            <div className="salt-format-radio-group-inline">
              {SALT_ENCODING_OPTIONS.map((option) => (
                <label key={option.value} className="salt-format-radio-option-inline">
                  <input
                    type="radio"
                    name="saltEncoding"
                    value={option.value}
                    checked={saltEncoding === option.value}
                    onChange={handleSaltEncodingChange}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="salt-control-item">
          <button type="button" className="salt-generate-btn-inline" onClick={onGenerateSalt}>
            Generate New Salt
          </button>
        </div>
      </div>
    </div>
  );
}
