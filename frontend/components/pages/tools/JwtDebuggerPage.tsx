import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function JwtDebuggerPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="JWT & JWE Debugger"
        description="Decode, verify, sign, encrypt, and decrypt JSON Web Tokens. Our JWT debugger helps you inspect JWT headers and claims, verify signatures, and convert tokens to/from encrypted JWE form."
      />
      <ToolWidget
        src="https://authgear.github.io/authgear-widget-jwt-debugger/"
        iframeTitle="JWT & JWE Debugger"
        height="800px"
        policy={<>Your data security is our top priority. All encoding, decoding, encryption and decryption happen in this browser. This tool does not store or send your JWT and JWE outside of the browser. See source code in: <a href="https://github.com/authgear/authgear-widget-jwt-debugger" target="_blank">https://github.com/authgear/authgear-widget-jwt-debugger</a></>}
      />
      <MoreDevTools currentSlug="jwt-jwe-debugger" />
      <ToolFeatureCards
        cards={[
          { icon: <img src="/images/tools-encode-jwt.svg" loading="lazy" alt="" />, title: 'Encode/Decode JWT', description: 'Quickly create and inspect JWTs. Paste a JWT to decode the header and payload, or craft your own for testing.' },
          { icon: <img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" />, title: 'Sign & Verify JWT', description: 'Generate cryptographic signatures when creating JWTs, and verify existing JWT signatures to confirm token authenticity and integrity.' },
          { icon: <img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" />, title: 'JWE Encryption', description: 'Encrypt any JWT into a JWE using a public key, ensuring data remains confidential during transmission.' },
          { icon: <img src="/images/tools-jwt-decryption.svg" loading="lazy" alt="" />, title: 'JWE Decryption', description: 'Decrypt a JWE token to retrieve the original JWT—including the payload—for analysis.' },
        ]}
      />
      <ToolHowItWorks
        sectionTitle="How the JWT & JWE Debugger Works"
        steps={[
          { step: 'Step 1.', title: 'Paste or Generate a JWT:', items: ['Input your JWT to see its decoded header and payload instantly.', <>The tool can verify the JWT&apos;s signature to confirm authenticity and integrity, highlighting whether the token is valid or has been tampered with.</>] },
          { step: 'Step 2.', title: 'Verify signature (JWT verification):', items: [<>Supply a JWK or JWKS (jwk format / jwks.json) or paste a PEM public key to verify a token&apos;s signature and confirm integrity. The debugger shows <code>kid</code>, <code>alg</code>, and verification status.</>] },
          { step: 'Step 3.', title: 'Sign / Create a JWT:', items: [<>Build a signed JWT by choosing algorithm (<code>RS256</code>, <code>ES256</code>, <code>HS256</code>, etc.) and a signing key. This is useful for testing <code>jwt authentication</code> flows and experimenting with jwt best practices.</>] },
          { step: 'Step 4.', title: 'Encrypt JWT to JWE:', items: [<>Encrypt a signed JWT into a JWE (JSON Web Encryption) using a public key to produce confidential tokens. Use JWE when you need payload confidentiality in addition to signature integrity. (See &quot;<a href="/post/jwe-vs-jwt" target="_blank">JWE vs JWT</a>&quot; in our guide for when to use each.)</>] },
          { step: 'Step 5.', title: 'Decrypt JWE:', items: ['Paste a JWE and provide the private key to decrypt and retrieve the original JWT. The tool supports common JWE algorithms and shows header fields and enc parameters.'] },
          { step: 'Step 6.', title: 'Inspect claims & debug', items: [<>View claims, check <code>exp</code>/<code>iat</code>/<code>nbf</code> logic, and see human-friendly warnings (expired, not yet valid). Use copy buttons to export tokens or keys for local testing</>] },
        ]}
      />
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={<><a href="/post/jwt-authentication-a-secure-scalable-solution-for-modern-applications">What is a JWT</a> (JSON Web Token)?</>}>
            <div className="tools-faq-content">A JWT (JSON Web Token) is an open standard (RFC 7519) for transmitting information securely between parties as a compact, URL-safe JSON object. <a href="/post/web-application-authentication-guide">JWTs are widely used in authentication systems</a>, enabling stateless session management and API security. A standard JWT has three parts:</div>
            <ToolFaqCheckItem>Header: Specifies the token type and hashing algorithm.</ToolFaqCheckItem>
            <ToolFaqCheckItem>Payload: Contains claims—statements about the user and additional metadata.</ToolFaqCheckItem>
            <ToolFaqCheckItem>Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn&apos;t changed along the way.</ToolFaqCheckItem>
            <div className="tools-faq-content">Common Use Cases:</div>
            <ToolFaqCheckItem>User authentication and single sign-on (SSO)</ToolFaqCheckItem>
            <ToolFaqCheckItem>Secure API authentication and authorization</ToolFaqCheckItem>
            <ToolFaqCheckItem>Information exchange between applications</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What is a JWE (JSON Web Encryption)?">
            <div className="tools-faq-content">A JWE (JSON Web Encryption) is another open standard (RFC 7516) for encrypting content, providing confidentiality for transmitted information. JWE wraps content—such as a signed JWT—in an encrypted format that only intended parties can decrypt and read. A standard JWE structure:</div>
            <ToolFaqCheckItem>Protected Header</ToolFaqCheckItem>
            <ToolFaqCheckItem>Encrypted Key</ToolFaqCheckItem>
            <ToolFaqCheckItem>Initialization Vector</ToolFaqCheckItem>
            <ToolFaqCheckItem>Ciphertext (the actual encrypted content)</ToolFaqCheckItem>
            <ToolFaqCheckItem>Authentication Tag</ToolFaqCheckItem>
            <div className="tools-faq-content">Common Use Cases:</div>
            <ToolFaqCheckItem>Protect sensitive JWT payloads in transit</ToolFaqCheckItem>
            <ToolFaqCheckItem>Secure confidential data exchange between services</ToolFaqCheckItem>
            <ToolFaqCheckItem>Layer additional security on top of standard JWTs</ToolFaqCheckItem>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title="JWT & JWE Debugger Best Practices">
          <ToolFaqCheckItem>Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn&apos;t changed along the way.</ToolFaqCheckItem>
          <ToolFaqCheckItem>Payload: Contains claims—statements about the user and additional metadata.</ToolFaqCheckItem>
          <ToolFaqCheckItem>Header: Specifies the token type and hashing algorithm.</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
