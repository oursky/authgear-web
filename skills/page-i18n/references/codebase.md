# Codebase i18n Reference

## File locations

| File | Purpose |
|------|---------|
| `frontend/messages/en.json` | English message strings |
| `frontend/messages/zh-TW.json` | Traditional Chinese strings (must have identical keys to en.json) |
| `frontend/i18n/request.ts` | next-intl server config — reads locale from `x-locale` header |
| `frontend/components/pages/features/` | Feature page components |
| `frontend/components/pages/solutions/` | Solutions page components |

## Namespace insertion point

Both JSON files have the same structure. Insert new namespaces **after `Features`, before `Compare`**:

```json
  "Features": {
    "startForFree": "Start for Free",
    "getDemo": "Get a Demo",
    "scheduleDemo": "Schedule Demo",
    "freePlanDescription": "Free plan includes unlimited MAUs"
  },
  ← INSERT NEW NAMESPACE HERE
  "Compare": {
```

Verify after editing: `cd frontend && node -e "require('./messages/en.json'); console.log('valid')"`

## Shared `Features` namespace strings

These already exist in both locale files — reuse instead of adding duplicates:

| Key | English | zh-TW |
|-----|---------|-------|
| `startForFree` | Start for Free | 免費開始 |
| `getDemo` | Get a Demo | 預約示範 |
| `scheduleDemo` | Schedule Demo | 預約示範 |
| `freePlanDescription` | Free plan includes unlimited MAUs | 免費方案包含無限 MAU |

Use `tFeatures('startForFree')` etc. in the component.

## How locale is resolved

`frontend/i18n/request.ts` reads the `x-locale` header (set by `frontend/proxy.ts`):
- Unprefixed URLs (`/features/attack-protection`) → `x-locale: en`
- `/zh-TW/...` URLs → `x-locale: zh-TW`

`useTranslations` picks this up automatically. The `locale: string` prop on feature page components is a structural requirement (passed by the route) and is **not** what drives translations.

## Namespace naming convention

PascalCase, matching the page's concept:

| Page | Namespace |
|------|-----------|
| `AttackProtectionPage.tsx` | `AttackProtection` |
| `SingleSignOnPage.tsx` | `SingleSignOn` |
| `PasskeysPage.tsx` | `Passkeys` |
| `MultiFactorAuthenticationPage.tsx` | `MultiFactorAuthentication` |

## zh-TW translation notes

- Use Traditional Chinese (繁體中文), not Simplified (簡體)
- Keep English product names/terms unchanged: `Authgear`, `Passkey`, `WebAuthn`, `CAPTCHA`, `MFA`, `OTP`, `SDK`, `API`, `JWT`, `JWKS`, `SSO`
- Common terms:
  - "Start for Free" → 免費開始
  - "Get a Demo" / "Schedule Demo" → 預約示範
  - "Free plan includes" → 免費方案包含
  - "unlimited MAUs" → 無限 MAU
  - "Learn more" → 了解更多
  - "Read more" → 閱讀更多
  - "Get started" → 立即開始
  - "Contact us" → 聯絡我們
