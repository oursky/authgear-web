export default function ToolPopup() {
  return (
    <div className="tool-popup">
      <h1 className="dev-tool-popup-heading">This Dev Tool is crafted by Authgear</h1>
      <p className="paragraph-20">Open source Auth0/Clerk/Firebase alternative. Passkeys, SSO, MFA, passwordless, biometric login.</p>
      <div className="tool-popup-wrapper">
        <a href="https://portal.authgear.com/" target="_blank" className="tool-popup-button plausible-event-name--tool-popup-signup-click w-inline-block">
          <div>Start building for Free</div>
        </a>
        <a href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary plausible-event-name--tool-github-click w-inline-block">
          <div>Star us on</div>
          <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
        </a>
      </div>
      <div className="tool-popup-close-button-wrapper">
        <a href="#" className="tool-popup-close-button plausible-event-name--popup-close-click w-button">Close</a>
      </div>
    </div>
  );
}
