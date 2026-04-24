import { describe, it, expect } from 'vitest';
import { isHoneypotFilled } from './_contact-helpers';

describe('isHoneypotFilled', () => {
  it('returns false when `website` is absent', () => {
    expect(isHoneypotFilled({ Name: 'A', Email: 'a@b.co' })).toBe(false);
  });

  it('returns false when `website` is an empty string', () => {
    expect(isHoneypotFilled({ website: '' })).toBe(false);
  });

  it('returns false when `website` is whitespace-only', () => {
    expect(isHoneypotFilled({ website: '   ' })).toBe(false);
  });

  it('returns false when `website` is a non-string (e.g. number)', () => {
    expect(isHoneypotFilled({ website: 0 as unknown as string })).toBe(false);
  });

  it('returns true when `website` is a non-empty string', () => {
    expect(isHoneypotFilled({ website: 'http://bot.example' })).toBe(true);
  });
});
