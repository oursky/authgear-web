import { useState } from 'react';
import type { Algorithm, SaltEncoding } from '../types';
import { useHashGeneration } from '../hooks/useHashGeneration';
import { useSaltManagement } from '../hooks/useSaltManagement';
import { useAlgorithmConfig } from '../hooks/useAlgorithmConfig';
import PasswordInput from './forms/PasswordInput';
import AlgorithmSelector from './forms/AlgorithmSelector';
import SaltConfiguration from './forms/SaltConfiguration';
import EncodingSelector from './forms/EncodingSelector';
import HashResults from './results/HashResults';
import ResultsPanel from './layout/ResultsPanel';

interface Props {
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (alg: Algorithm) => void;
}

export default function HashGeneration({ selectedAlgorithm, setSelectedAlgorithm }: Props) {
  const [saltEncoding, setSaltEncoding] = useState<SaltEncoding>('hex');
  const [hashEncoding, setHashEncoding] = useState<SaltEncoding>('hex');

  const { parameters, warnings, handleParameterChange } = useAlgorithmConfig(selectedAlgorithm);
  const {
    saltInput,
    saltByteLength,
    validationError: saltValidationError,
    handleSaltChange,
    handleGenerateSalt,
  } = useSaltManagement({ selectedAlgorithm, parameters, saltEncoding });

  const {
    password,
    isGenerating,
    result,
    error,
    validationErrors,
    showAdditionalInfo,
    handlePasswordChange,
    handleSaltChange: handleSaltChangeFromHook,
    handleGenerate,
    setShowAdditionalInfo,
    setResult,
  } = useHashGeneration({
    selectedAlgorithm,
    parameters,
    saltInput,
    saltEncoding,
    hashEncoding,
  });

  const handleSaltChangeCombined = (value: string) => {
    handleSaltChange(value);
    handleSaltChangeFromHook(value);
  };

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setResult(null);
  };

  const handleSaltEncodingChange = (encoding: SaltEncoding) => {
    setSaltEncoding(encoding);
    setResult(null);
  };

  const handleHashEncodingChange = (encoding: SaltEncoding) => {
    setHashEncoding(encoding);
    setResult(null);
  };

  return (
    <div className="hash-generation">
      <div className="hash-generation-layout">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Plaintext Password</label>
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password to hash..."
              validationError={validationErrors.password}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Algorithm Configuration</label>
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              parameters={parameters}
              onParameterChange={handleParameterChange}
              warnings={warnings}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salt Configuration</label>
            <SaltConfiguration
              saltInput={saltInput}
              saltEncoding={saltEncoding}
              saltByteLength={saltByteLength}
              validationError={validationErrors.salt || saltValidationError}
              selectedAlgorithm={selectedAlgorithm}
              onSaltChange={handleSaltChangeCombined}
              onSaltEncodingChange={handleSaltEncodingChange}
              onGenerateSalt={handleGenerateSalt}
            />
          </div>

          <EncodingSelector
            selectedAlgorithm={selectedAlgorithm}
            hashEncoding={hashEncoding}
            onHashEncodingChange={handleHashEncodingChange}
          />

          <button
            type="button"
            className="btn generate-btn"
            onClick={handleGenerate}
            disabled={isGenerating || !password.trim() || !saltInput.trim()}
          >
            {isGenerating ? 'Generating...' : 'Generate Password Hash'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        <ResultsPanel>
          <HashResults
            result={result}
            selectedAlgorithm={selectedAlgorithm}
            saltEncoding={saltEncoding}
            hashEncoding={hashEncoding}
            showAdditionalInfo={showAdditionalInfo}
            onToggleAdditionalInfo={() => setShowAdditionalInfo(!showAdditionalInfo)}
          />
        </ResultsPanel>
      </div>
    </div>
  );
}
