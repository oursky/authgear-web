import type { Algorithm, HashResult, SaltEncoding } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';
import { showsExecutionTimeHint } from '../../lib/algorithmUtils';

interface Props {
  result: HashResult | null;
  selectedAlgorithm: Algorithm;
  saltEncoding: SaltEncoding;
  hashEncoding: SaltEncoding;
  showAdditionalInfo: boolean;
  onToggleAdditionalInfo: () => void;
}

export default function HashResults({
  result,
  selectedAlgorithm,
  saltEncoding,
  showAdditionalInfo,
  onToggleAdditionalInfo,
}: Props) {
  const [copiedSalt, copySalt] = useClipboard();
  const [copiedEncodedHash, copyEncodedHash] = useClipboard();

  if (!result) {
    return (
      <div className="results-placeholder">
        <h3>Password Hash Results</h3>
        <p>Enter a password and click "Generate Password Hash" to see the results here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="result-item result-item-primary">
        <div className="result-header">
          <label className="result-label-primary">Encoded Hash</label>
          <button
            type="button"
            className="copy-btn copy-btn-primary"
            onClick={() => copyEncodedHash(result.encodedHash)}
            disabled={copiedEncodedHash}
          >
            {copiedEncodedHash ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="result-content result-content-primary">
          <code className="result-code-primary">{result.encodedHash}</code>
        </div>
      </div>

      <div className="result-item result-item-secondary">
        <label className="result-label-secondary">Algorithm</label>
        <div className="result-content result-content-secondary">
          <code className="result-code-secondary">{result.algorithm.toUpperCase()}</code>
        </div>
      </div>

      <div className="result-item result-item-tertiary">
        <label className="result-label-tertiary">Execution Time</label>
        <div className="result-content result-content-tertiary">
          <code className="result-code-tertiary">{result.executionTime}ms</code>
          {showsExecutionTimeHint(selectedAlgorithm) && (
            <div className="execution-time-hint">
              💡 Try adjusting the parameters to make the time around 500ms
            </div>
          )}
        </div>
      </div>

      <div className="additional-info-toggle">
        <button
          type="button"
          className={`toggle-btn ${showAdditionalInfo ? 'expanded' : ''}`}
          onClick={onToggleAdditionalInfo}
        >
          <span className="arrow">▶</span>
          Additional Info
        </button>
      </div>

      {showAdditionalInfo && (
        <div className="additional-info-section">
          <div className="result-item result-item-tertiary">
            <div className="result-header">
              <label className="result-label-tertiary">Salt ({saltEncoding.toUpperCase()})</label>
              <button
                type="button"
                className="copy-btn copy-btn-tertiary"
                onClick={() => copySalt(result.salt)}
                disabled={copiedSalt}
              >
                {copiedSalt ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="result-content result-content-tertiary">
              <code className="result-code-tertiary">{result.salt}</code>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
