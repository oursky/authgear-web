import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function JwkGeneratorPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="JWK Generator — Convert PEM to JWK & Generate JWKS"
        description="Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption."
      />
      <ToolWidget
        src="https://authgear.github.io/authgear-widget-jwk-generator/"
        iframeTitle="JWK Generator Widget"
        height="800px"
        policy={<>Our lightweight <strong>JWK generator</strong> runs entirely in your browser — no keys leave your machine. Use it to convert <strong>PEM to JWK</strong>, convert <strong>JWK to PEM</strong>, or generate new keys and export a <strong>JWKS</strong> for your <code>jwks_uri</code> endpoint. Learn more: <a href="#">What is JWKS</a> <br />See source code: <a href="https://github.com/authgear/authgear-widget-jwk-generator" target="_blank">https://github.com/authgear/authgear-widget-jwk-generator</a></>}
      />
      <MoreDevTools currentSlug="jwk-generator" />
      <ToolFeatureCards
        gridClass="_3-card-grid"
        cards={[
          { icon: <img src="/images/tools-encode-jwt.svg" loading="lazy" alt="" />, title: 'PEM to JWK', description: <>Paste a PEM-encoded key or X.509 certificate, set <code>kid</code>, choose <code>alg</code> and <code>use</code> (sig / enc), then click <strong>Generate JWK</strong>. This converts PEM → JWK in the standard <strong>jwk format</strong> so you can add the JWK to a <strong>JWKS</strong> or plug it directly into JOSE libraries (Node <code>jose</code>, Python <code>jwcrypto</code>, etc.).</> },
          { icon: <img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" />, title: 'JWK to PEM', description: <>Paste a JWK JSON object and export a PEM formatted key for CLIs, servers, or legacy tooling. Use <strong>JWK to PEM</strong> when you need a PEM public key for OpenSSL or server-side libraries while maintaining <code>kid</code>, <code>alg</code>, and <code>use</code> metadata in your JWK set.</> },
          { icon: <img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" />, title: 'Generate JWK', description: <>Create new keys with the <strong>JWK generator</strong> mode. Choose key <strong>use</strong> (signature <code>sig</code> or encryption <code>enc</code>), key <strong>type</strong> (RSA, EC, OKP, or <code>oct</code>), and configure size/curve/parameters. The generator suggests <code>alg</code> values and auto-generates a <code>kid</code> you can edit. Output options include a single JWK or a full <strong>JWKS</strong> (<code>jwks.json</code>) ready to host.</> },
        ]}
      />
      <ToolHowItWorks
        sectionTitle="How the JWK Generator Works"
        steps={[
          {
            step: 'Step 1.', title: 'Convert Between PEM and JWK:',
            items: [
              'Paste your PEM key to convert it into a JSON Web Key format or vice versa.',
              'Copy the converted key for use in your applications.',
              <>Why use PEM → JWK? Many libraries and identity platforms expect JWK/JWKS. Converting PEM to JWK makes your keys consumable by JWT verification flows and by any service that reads a <code>jwks.json</code> at a <code>jwks_uri</code>.</>,
            ],
          },
          {
            step: 'Step 2.', title: 'Generate New Keys:',
            items: [
              'Select whether you want a key for signature or encryption tasks.',
              'Choose the key type suitable for your security needs, such as symmetric (oct), RSA, or elliptic curve (EC or OKP).',
              'Pick the cryptographic algorithm to match your system requirements (e.g., RS256 for RSA signature).',
              'Receive the generated keys:Symmetric:',
              'a. Secret key string + JWK JSON.',
              'b. Asymmetric: PEM-formatted private and public keys + corresponding JWK objects for private and public key parts.',
            ],
          },
          {
            step: 'Step 3.', title: 'Use Your Keys Securely:',
            items: [
              'Implement these keys to sign or encrypt JWTs.',
              'Host JWK sets on your authorization servers for key discovery.',
              'Rotate and manage keys easily for robust security posture.',
            ],
          },
        ]}
      />
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={<><a href="/post/what-is-jwks">What is a JWK</a> (JSON Web Key)?</>}>
            <div className="tools-faq-content">A JWK is a JSON data structure that represents a cryptographic key. A JWKS (JSON Web Key Set) is an object with a <code>keys</code> array of JWKs. JWKS is the standard format used by identity providers to publish public keys at a <code>jwks_uri</code> so clients can validate JWT tokens (see RFC 7517). If you searched &quot;what is jwks&quot; or &quot;jwks uri&quot;, this is the format you need.</div>
            <ToolFaqCheckItem>Machine-friendly JSON format, easy to use across web APIs</ToolFaqCheckItem>
            <ToolFaqCheckItem>Supports all key types—symmetric and asymmetric</ToolFaqCheckItem>
            <ToolFaqCheckItem>Facilitates key rotation and management for modern applications</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What is PEM">
            <div className="tools-faq-content">PEM (Privacy Enhanced Mail) is the base64-encoded format commonly used to store and share cryptographic keys and certificates. Use <strong>PEM to JWK</strong> conversions to make PEM keys consumable by JWKS endpoints and modern JOSE libraries.</div>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title="Best Practices">
          <ToolFaqCheckItem><strong>Never use generated private keys in production.</strong> For production, generate and store private keys in a secure HSM or KMS.</ToolFaqCheckItem>
          <ToolFaqCheckItem><strong>Use appropriate key sizes and modern algorithms</strong> (e.g., Ed25519 when supported).</ToolFaqCheckItem>
          <ToolFaqCheckItem><strong>Host JWKS over HTTPS</strong> at a stable <code>jwks_uri</code> and rotate keys regularly — publish new keys with new <code>kid</code> values and remove deprecated keys safely.</ToolFaqCheckItem>
          <ToolFaqCheckItem><strong>Include <code>kid</code> and <code>alg</code> metadata</strong> in your JWKs so clients can select the right key when verifying JWTs.</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
