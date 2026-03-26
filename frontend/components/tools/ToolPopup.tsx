import PlausibleLink from '@/components/PlausibleLink';

export default function ToolPopup() {
  return (
    <div className="tool-popup">
      <h1 className="dev-tool-popup-heading">This Dev Tool is crafted by Authgear</h1>
      <p className="paragraph-20">Open source Auth0/Clerk/Firebase alternative. Passkeys, SSO, MFA, passwordless, biometric login.</p>
      <div className="tool-popup-wrapper">
        <PlausibleLink href="https://portal.authgear.com/" target="_blank" className="tool-popup-button w-inline-block" eventName="tool-popup-signup-click">
          <div>Start building for Free</div>
        </PlausibleLink>
        <PlausibleLink href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary w-inline-block" eventName="tool-github-click">
          <div>Star us on</div>
          <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
        </PlausibleLink>
      </div>
      <div className="tool-popup-close-button-wrapper">
        <PlausibleLink href="#" className="tool-popup-close-button w-button" eventName="popup-close-click">Close</PlausibleLink>
      </div>
    </div>
  );
}
