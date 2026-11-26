import { describe, expect, it } from 'vitest';
import { resolveCampaign, toolFromPath, CAMPAIGN_STARTS, CAMPAIGN_ENDS } from './toolCampaign';

const IN = new Date('2026-12-20T12:00:00Z');
const base = { pathname: '/tools/password-hash-generator/', locale: 'en', timeZone: 'Europe/London', now: IN };

describe('toolFromPath', () => {
  it('reads the slug from English and prefixed tool paths', () => {
    expect(toolFromPath('/tools/base64-decode-encode/')).toBe('base64-decode-encode');
    expect(toolFromPath('/de/tools/totp-authenticator/')).toBe('totp-authenticator');
    expect(toolFromPath('/tools/')).toBeNull();
    expect(toolFromPath('/post/x/')).toBeNull();
  });
});

describe('resolveCampaign', () => {
  it('shows group A to a London visitor on the password hash tool', () => {
    const c = resolveCampaign(base)!;
    expect(c.group).toBe('A');
    expect(c.groupCopy.href).toBe('/sovereignty-self-check/');
  });

  it.each([
    ['totp-authenticator', 'B'],
    ['jwt-jwe-debugger', 'C'],
    ['passkey-demo', 'C'],
    ['oidc-discovery-endpoint', 'C'],
    ['base64-decode-encode', 'D'],
    ['sms-cost-calculator', 'D'],
    ['uuidv7-generator', 'D'],
  ])('%s is group %s', (tool, group) => {
    expect(resolveCampaign({ ...base, pathname: `/tools/${tool}/` })?.group).toBe(group);
  });

  it('skips visitors outside the campaign time zones', () => {
    expect(resolveCampaign({ ...base, timeZone: 'America/New_York' })).toBeNull();
    expect(resolveCampaign({ ...base, timeZone: undefined })).toBeNull();
  });

  it('covers every campaign country', () => {
    for (const tz of ['Europe/Dublin', 'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Copenhagen', 'Europe/Oslo', 'Europe/Helsinki', 'Europe/Berlin', 'Europe/Paris']) {
      expect(resolveCampaign({ ...base, timeZone: tz })).not.toBeNull();
    }
  });

  it('only runs between the start and end dates, inclusive', () => {
    expect(resolveCampaign({ ...base, now: new Date(`${CAMPAIGN_STARTS}T00:00:00Z`) })).not.toBeNull();
    expect(resolveCampaign({ ...base, now: new Date(`${CAMPAIGN_ENDS}T23:59:00Z`) })).not.toBeNull();
    expect(resolveCampaign({ ...base, now: new Date('2026-12-13T23:59:00Z') })).toBeNull();
    expect(resolveCampaign({ ...base, now: new Date('2027-01-18T00:00:00Z') })).toBeNull();
  });

  it('keeps today’s version on locales without reviewed copy', () => {
    for (const locale of ['de', 'fr', 'es', 'ja', 'zh-Hant']) {
      expect(resolveCampaign({ ...base, locale, pathname: `/${locale}/tools/password-hash-generator/` })).toBeNull();
    }
  });

  it('can be forced on or off for previews', () => {
    expect(resolveCampaign({ ...base, timeZone: 'Asia/Tokyo', now: new Date('2026-11-26'), force: 'on' })?.group).toBe('A');
    expect(resolveCampaign({ ...base, force: 'off' })).toBeNull();
  });

  it('does nothing off the tool pages', () => {
    expect(resolveCampaign({ ...base, pathname: '/pricing/' })).toBeNull();
  });
});
