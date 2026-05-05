import type { TabKey } from './tabs';

interface Props {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: Props) {
  return (
    <div className="header-section">
      <div className="tabs">
        <button
          type="button"
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Password Hash
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          Verify Password Hash
        </button>
      </div>
    </div>
  );
}
