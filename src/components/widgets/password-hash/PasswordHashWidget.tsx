import { useState } from 'react';
import type { Algorithm } from './types';
import type { TabKey } from './components/tabs';
import HashGeneration from './components/HashGeneration';
import HashVerification from './components/HashVerification';
import { LocaleContext, useT } from './i18n';
import './password-hash.css';

interface Props {
  locale?: string;
}

export default function PasswordHashWidget({ locale = 'en' }: Props) {
  return (
    <LocaleContext.Provider value={locale}>
      <Shell />
    </LocaleContext.Provider>
  );
}

function Shell() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<TabKey>('generate');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('argon2id');

  return (
    <div
      data-testid="password-hash-widget"
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans text-slate-800"
    >
      <div role="tablist" aria-label={t('ariaLabel')} className="flex border-b border-slate-200">
        <TabButton active={activeTab === 'generate'} onClick={() => setActiveTab('generate')}>
          {t('tabGenerate')}
        </TabButton>
        <TabButton active={activeTab === 'verify'} onClick={() => setActiveTab('verify')}>
          {t('tabVerify')}
        </TabButton>
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === 'generate' ? (
          <HashGeneration
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
        ) : (
          <HashVerification />
        )}
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        'flex-1 px-6 py-4 text-sm font-medium transition-colors ' +
        'focus:outline-none focus-visible:bg-slate-50 ' +
        (active
          ? 'text-blue-700 border-b-2 border-blue-600 -mb-px'
          : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent -mb-px')
      }
    >
      {children}
    </button>
  );
}
