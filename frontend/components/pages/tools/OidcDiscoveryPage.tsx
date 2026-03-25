import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

function OidcIcon1() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M29.5874 31.3508C28.9512 31.9248 28.5872 32.7402 28.5872 33.5964V37.5038C28.5872 38.7414 27.8342 39.8526 26.6842 40.3118L22.9868 41.783C21.002 42.573 18.8458 41.1116 18.8458 38.975V32.6408C18.8458 31.841 18.5286 31.0724 17.9604 30.5042L9.38458 22.8684C7.99518 21.4808 7.21484 19.5972 7.21484 17.6317V13.6036C7.21484 10.6925 9.57528 8.33203 12.4884 8.33203" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36.4331 8.33203C39.3443 8.33203 41.7047 10.6925 41.7047 13.6036V16.2832C41.7047 18.3809 40.8153 20.3814 39.2585 21.7844L34.4219 26.5676" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4584 17.8489V6M29.0618 13.2308L24.4616 17.8505L19.8633 13.2308" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function OidcIcon2() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16.5 23.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.5006 35.9883H40.5014M16.5 35.9883H22.5004" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 11.9883H28.5006M34.501 11.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 11.9628V12.0907M9.03921 11.9903C9.03921 12.2783 8.80553 12.5118 8.51749 12.5118C8.22947 12.5118 7.99609 12.2783 7.99609 11.9903C7.99609 11.7022 8.22947 11.4688 8.51749 11.4688C8.80553 11.4688 9.03921 11.7022 9.03921 11.9903Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 24.2245V24.3525M9.03921 24.2521C9.03921 24.5401 8.80553 24.7737 8.51749 24.7737C8.22947 24.7737 7.99609 24.5401 7.99609 24.2521C7.99609 23.9641 8.22947 23.7305 8.51749 23.7305C8.80553 23.7305 9.03921 23.9641 9.03921 24.2521Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 35.9627V36.0908M9.03921 35.9902C9.03921 36.2784 8.80553 36.5117 8.51749 36.5117C8.22947 36.5117 7.99609 36.2784 7.99609 35.9902C7.99609 35.7022 8.22947 35.4688 8.51749 35.4688C8.80553 35.4688 9.03921 35.7022 9.03921 35.9902Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function OidcIcon3() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M14.2139 17.5703L6.5 23.9978L14.2139 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34.7852 17.5703L42.499 23.9978L34.7852 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4986 24L19.3555 38.1434" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.6419 9.85938L27.0703 16.9311" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function OidcDiscoveryPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="OpenID Connect Discovery Explorer"
        description="Enter any OIDC issuer URL to fetch its discovery endpoint. Instantly inspect the full .well-known/openid-configuration endpoints, supported scopes, signing algorithms, and JWKS, no login required."
      />
      <ToolWidget
        src="https://authgear.github.io/discovery-endpoint-explorer/"
        iframeTitle="OIDC Discover Endpoint Explorer"
        height="800px"
        policy={<>Your data security is our top priority. Everything runs locally in your browser.<br />The tool fetches the discovery document directly from the OIDC provider using your browser. Authgear never sees or logs your requests.</>}
      />
      <MoreDevTools />
      <ToolFeatureCards
        gridClass="_3-card-grid"
        cards={[
          { icon: <OidcIcon1 />, title: 'OpenID Configuration Fetching', description: <>Automatically fetch the OpenID Connect discovery document from<br />/.well-known/openid-configuration based on the issuer URL you provide.</> },
          { icon: <OidcIcon2 />, title: 'Key Endpoints Summary', description: 'Quickly view essential endpoints and identifiers, including the issuer, authorization endpoint, token endpoint, JWKS URI, and other commonly used configuration fields.' },
          { icon: <OidcIcon3 />, title: 'JSON Discovery Output', description: <>Inspect the full discovery document in a syntax-highlighted JSON view.<br />Easily copy the entire response or individual fields for debugging or documentation.</> },
        ]}
      />
      <ToolHowItWorks
        steps={[
          { step: 'Step 1.', title: <>Enter the Discovery URL (for example: <strong>https://accounts.google.com/.well-known/openid-configuration</strong> or <strong>https://project.authgear.cloud/.well-known/openid-configuration</strong>) and click Fetch.</> },
          { step: 'Step 2.', title: 'Review the parsed metadata, core endpoints, and provider capabilities.' },
          { step: 'Step 3.', title: 'Copy individual fields with one click, inspect raw JSON, or see the JWKS.' },
        ]}
      />
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="What is the discovery endpoint in OIDC?">
            <div className="tools-faq-content">The OIDC discovery endpoint is a standardized URL at <span className="code-label">{'{issuer}'}/.well-known/openid-configuration</span> that returns a JSON document describing the provider&apos;s configuration. It lists the authorization endpoint, token endpoint, JWKS URI, supported scopes, response types, signing algorithms, and other capabilities. Clients can use it to configure themselves automatically without hardcoding endpoint URLs.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="Do all OIDC providers support discovery?">
            <div className="tools-faq-content">Most modern, compliant OIDC providers support discovery. It is required by the OpenID Connect specification for providers that want to support automatic client configuration. Some older or proprietary identity systems may not expose a <span className="code-label">/.well-known/openid-configuration</span> endpoint — in that case, you&apos;ll need to configure endpoints manually. If a fetch in this tool fails, the provider either doesn&apos;t support discovery or has access restrictions on the endpoint.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What is the actual OpenID discovery URL?">
            <div className="tools-faq-content">The discovery URL format is <span className="code-label">{'{issuer}'}/.well-known/openid-configuration</span>, where {'{issuer}'} is the base URL of your OpenID Connect provider. <br />For example: Google uses <span className="code-label">https://accounts.google.com/.well-known/openid-configuration</span>, Okta uses <span className="code-label">{'https://{yourOktaDomain}/.well-known/openid-configuration'}</span>, and Authgear uses <span className="code-label">{'https://{your-project}.authgear.cloud/.well-known/openid-configuration'}</span>. Enter any issuer URL above and this tool will fetch it automatically.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What is a discovery endpoint?">
            <div className="tools-faq-content">A discovery endpoint is a well-known URL that a service exposes to describe its capabilities and configuration. In OpenID Connect, the discovery endpoint follows the path <span className="code-label">/.well-known/openid-configuration</span> (defined in RFC 8414). It allows client applications to dynamically discover the provider&apos;s endpoints and supported features without manual configuration.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="Do OIDC providers from the same vendor (Okta, Azure, Keycloak) have different discovery URLs?">
            <div className="tools-faq-content">Yes. The discovery URL format is consistent (/.well-known/openid-configuration), but the base issuer URL differs. For Azure AD, it&apos;s typically &quot;{'https://login.microsoftonline.com/{tenant-id}/v2.0'}&quot;. For Keycloak, it&apos;s &quot;{'https://{host}/realms/{realm}'}&quot;. For Okta, it&apos;s &quot;{'https://{yourOktaDomain}'}&quot;. Enter the issuer URL for your provider above and the tool resolves the full discovery URL automatically.</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
