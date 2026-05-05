import { useState } from 'react';
import type { Algorithm } from './types';
import type { TabKey } from './components/tabs';
import TabNavigation from './components/TabNavigation';
import HashGeneration from './components/HashGeneration';
import HashVerification from './components/HashVerification';
import './password-hash.css';

export default function PasswordHashWidget() {
  const [activeTab, setActiveTab] = useState<TabKey>('generate');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('argon2id');

  return (
    <div className="password-hasher" data-testid="password-hash-widget">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        <div style={{ display: activeTab === 'generate' ? 'block' : 'none' }}>
          <HashGeneration
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
        </div>
        <div style={{ display: activeTab === 'verify' ? 'block' : 'none' }}>
          <HashVerification />
        </div>
      </div>
    </div>
  );
}
