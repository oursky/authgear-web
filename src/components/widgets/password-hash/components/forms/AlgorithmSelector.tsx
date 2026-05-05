import type { ChangeEvent } from 'react';
import type { Algorithm } from '../../types';
import { HASHING_ALGORITHMS } from '../../lib/constants';
import { getParameterDescription } from '../../lib/algorithmUtils';

interface Props {
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  parameters: Record<string, number>;
  onParameterChange: (paramKey: string, value: number) => void;
  warnings: string[];
}

export default function AlgorithmSelector({
  selectedAlgorithm,
  onAlgorithmChange,
  parameters,
  onParameterChange,
  warnings,
}: Props) {
  const algorithmConfig = Object.values(HASHING_ALGORITHMS).find(
    (alg) => alg.value === selectedAlgorithm,
  );

  const handleAlgorithmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onAlgorithmChange(e.target.value as Algorithm);
  };

  const handleParameterChange =
    (paramKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
      onParameterChange(paramKey, parseInt(e.target.value, 10));
    };

  return (
    <div className="algorithm-config-card">
      <div className="algorithm-selection">
        <label className="algorithm-label">Algorithm</label>
        <select
          className="algorithm-select"
          value={selectedAlgorithm}
          onChange={handleAlgorithmChange}
        >
          {Object.values(HASHING_ALGORITHMS).map((alg) => (
            <option key={alg.value} value={alg.value}>
              {alg.label} - {alg.description}
            </option>
          ))}
        </select>
      </div>

      {algorithmConfig && (
        <div className="algorithm-parameters">
          <label className="parameters-label">Parameters</label>
          <div className="parameters-grid">
            {Object.keys(algorithmConfig.parameters)
              .map((paramKey) => {
                if (paramKey === 'saltLength') return null;
                const param = algorithmConfig.parameters[paramKey];
                return (
                  <div key={paramKey} className="parameter-group">
                    <label className="parameter-label tooltip-label">
                      {param.label}
                      <div className="tooltip">{getParameterDescription(paramKey)}</div>
                    </label>
                    <input
                      type="number"
                      className="parameter-input"
                      value={parameters[paramKey] ?? param.default}
                      onChange={handleParameterChange(paramKey)}
                      min={param.min}
                      max={param.max}
                      step={param.step}
                    />
                  </div>
                );
              })
              .filter(Boolean)}
          </div>
          {warnings.length > 0 && (
            <div className="parameter-warnings">
              {warnings.map((warning) => (
                <div key={warning} className="warning-message">
                  ⚠️ {warning}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
