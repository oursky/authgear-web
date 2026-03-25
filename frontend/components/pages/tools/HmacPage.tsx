import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function HmacPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="HMAC Signature Generator/Verifier"
        description="Securely generate and verify HMAC signatures for your payloads"
      />
      <ToolWidget
        src="https://authgear.github.io/authgear-widget-hmac-tool/"
        iframeTitle="HMAC Signature Generator/Verifier"
        height="800px"
        policy={<>Your data security is our top priority. All signature generation and verification happen entirely in your browser. This tool does not store or transmit your payloads, secrets, or signatures outside of the browser. See source code in: <a href="https://github.com/authgear/authgear-widget-hmac-tool" target="_blank">https://github.com/authgear/authgear-widget-hmac-tool</a></>}
      />
      <MoreDevTools currentSlug="hmac-signature-generator-verifier" />
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">How the HMAC Signature Generator Works</h2>
            </div>
            <div className="tools-step horizon-step">
              {[
                { n: 1, title: 'Enter Payload:', body: 'Input the exact message or payload content you want to sign or verify.' },
                { n: 2, title: 'Provide Webhook Secret:', body: 'Insert the shared secret key used for HMAC generation, typically known only to you and your webhook provider.' },
                { n: 3, title: 'Select HMAC Algorithm:', body: <>Pick from HS256, HS384, or HS512 according to your application&apos;s configuration.</> },
                { n: 4, title: 'Generate Signature:', body: 'Click to compute the HMAC signature for your payload and secret using the selected algorithm.' },
                { n: 5, title: 'Paste Received Signature to Verify:', body: 'Paste the signature you received from an external system/webhook to compare against your own generated signature.' },
              ].map(({ n, title, body }) => (
                <div key={n} className="w-layout-vflex tools-step-card">
                  <div className="tools-step-step">Step {n}.</div>
                  <div className="tools-step-title">{title}</div>
                  <div className="text-block-84">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0 horizon-container">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2 margin-bottom-16 align-left">Supported Algorithms</h2>
              <p className="tools-description align-left">Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption.</p>
            </div>
            <div className="w-layout-hflex flex-block-80">
              {['HS256', 'HS384', 'HS512'].map((alg, i) => (
                <div key={alg} className="w-layout-vflex algorithms-card">
                  <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                  <div>{alg}</div>
                  <div className="algorithms-description">HMAC + SHA-{[256, 384, 512][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="What is HMAC?">
            <div className="tools-faq-content">HMAC (Hash-Based Message Authentication Code) is a mechanism that uses a cryptographic hash function and a secret key to produce a signature for a message or payload. This signature provides both data integrity and authentication, ensuring that the message has not been tampered with and is genuinely from the claimed sender.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="Why HMAC?">
            <ToolFaqCheckItem>Verifies authenticity of messages, especially in webhook or API callbacks</ToolFaqCheckItem>
            <ToolFaqCheckItem>Prevents tampering or replay attacks by ensuring message integrity</ToolFaqCheckItem>
            <ToolFaqCheckItem>Simple and widely-used cryptographic technique supported by most platforms</ToolFaqCheckItem>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title="Best Practices">
          <ToolFaqCheckItem>Keep your webhook secret confidential and avoid sharing it publicly.</ToolFaqCheckItem>
          <ToolFaqCheckItem>Always verify incoming webhook signatures before processing payloads.</ToolFaqCheckItem>
          <ToolFaqCheckItem>Use a secure algorithm compatible with your platform.</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
