interface Props {
  showSupportedFormats: boolean;
  onToggleSupportedFormats: () => void;
}

export default function SupportedFormats({ showSupportedFormats, onToggleSupportedFormats }: Props) {
  return (
    <>
      <div className="supported-formats-toggle">
        <button
          type="button"
          className={`toggle-btn ${showSupportedFormats ? 'expanded' : ''}`}
          onClick={onToggleSupportedFormats}
        >
          <span className="arrow">▶</span>
          Supported Password Hash Formats
        </button>
      </div>

      {showSupportedFormats && (
        <div className="supported-formats-section">
          <div className="format-examples-compact">
            <div className="format-example-compact">
              <span className="format-name-compact">Argon2id</span>
              <code className="format-code-compact">$argon2id$v=19$m=19456,t=2,p=1$...</code>
            </div>
            <div className="format-example-compact">
              <span className="format-name-compact">scrypt</span>
              <code className="format-code-compact">$scrypt$ln=14,r=8,p=1$...</code>
            </div>
            <div className="format-example-compact">
              <span className="format-name-compact">bcrypt</span>
              <code className="format-code-compact">$2b$12$...</code>
            </div>
            <div className="format-example-compact">
              <span className="format-name-compact">PBKDF2</span>
              <code className="format-code-compact">$pbkdf2-sha256$600000$...</code>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
