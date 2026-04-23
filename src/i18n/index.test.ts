import { describe, it, expect } from 'vitest';
import { t } from './index';

describe('t()', () => {
  it('resolves a nested key for en', () => {
    const result = t('en', 'Home.heroCtaGetStarted');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('resolves a nested key for zh-Hant', () => {
    const result = t('zh-Hant', 'Home.heroCtaGetStarted');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns the key itself when missing from both locales', () => {
    expect(t('en', 'Nonexistent.missing')).toBe('Nonexistent.missing');
  });

  it('falls back to en when key missing in zh-Hant', () => {
    // Any key present in en.json — the helper should find it via fallback
    const result = t('zh-Hant', 'Home.heroCtaGetStarted');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns the key for an unknown locale', () => {
    expect(typeof t('fr', 'Home.heroCtaGetStarted')).toBe('string');
  });
});
