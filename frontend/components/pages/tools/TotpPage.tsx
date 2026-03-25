import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function TotpPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="TOTP Authenticator — Online one-time password generator (RFC 6238)"
        description={<>Generate and copy Time-based One-Time Passwords (TOTP) instantly for testing, debugging, and QA. Configure algorithm (SHA-1 / SHA-256 / SHA-512), digit length (6 or 8), and see live codes that refresh every 30 seconds per <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">RFC 6238</a>.</>}
      />
      <ToolWidget
        src="https://totp-mini-tool-authgear.vercel.app/"
        iframeTitle="TOTP Authenticator - One-time Password Generator"
        height="600px"
        iframeStyle={{ borderRadius: '16px', border: '1px solid #DBDBDB', width: '100%', height: '600px', minHeight: '600px' }}
        policy={<>Your data security is our top priority. All TOTP code generation and application management happen entirely in your browser.<br />This tool does not store or transmit your secret keys or codes outside of your browser.</>}
      />
      <MoreDevTools currentSlug="totp-authenticator" />
      <ToolHowItWorks
        containerClass="tools-step-totp horizon-step"
        steps={[
          { step: 'Step 1.', title: "Enter Your Application's Secret Key", body: "Paste the shared TOTP secret (base32) from your app's 2FA setup screen." },
          { step: 'Step 2.', title: 'Customise Algorithm and Digit Length', body: <>{`Choose `}<code>SHA-1</code>, <code>SHA-256</code>, or <code>SHA-512</code>, and pick <code>6</code> or <code>8</code> digits. SHA-1 + 6 digits is the common default; use stronger hashes if your integration requires it.</> },
          { step: 'Step 3.', title: 'Generate One-Time Password', body: 'The current OTP is generated and updates automatically on a 30-second timestep (default per RFC 6238). Save up to 10 different application secrets for quick testing.' },
          { step: 'Step 4.', title: 'Copy and use the One-Time Password for authentication', body: 'Click/tap the code to copy it to your clipboard and paste it into your app\'s login flow.' },
        ]}
        afterSteps={
          <div className="tools-policy">
            <p className="paragraph-18"><span className="text-span-43">{'⚠️'} Caution:</span> All code generation and storage happen in your browser memory only.<br />And therefore, when your browser cache is cleared or if you reinstall your browser, all data saved for this tool will be permanently deleted.</p>
          </div>
        }
      />
      <ToolReadyTo
        title="Secure Your Accounts Seamlessly with Authgear"
        subtitle="Authgear gives you scalable identity management, secure authentication, and easy integration."
      />
      <ToolHowItWorks
        sectionTitle="Troubleshooting"
        steps={[
          { title: "Codes don't match?", items: ['Check server and client clocks — TOTP depends on accurate time; allow a verification window (±1 timestep) during testing.'] },
          { title: 'Wrong secret format?', items: [<>Ensure the secret is base32. If you have a QR code, scan it or extract the <code>secret=</code> parameter from the otpauth URI.</>] },
          { title: '"Algorithm mismatch" errors', items: [<>Verify that both the server and authenticator are using the <em>same</em> algorithm (SHA-1/256/512), digit length, and timestep.</>] },
          { title: 'Intermittent failures in tests', items: ['Confirm you\'re not reusing a secret in multiple environments (e.g., same secret across staging & prod can cause confusion)'] },
        ]}
      />
      <ToolFaq>
        <div className="container-default-inner px-0 gap-0">
          <h2 className="title features-page-v2">FAQ</h2>
        </div>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="What is TOTP?">
            <div className="tools-faq-content">TOTP (Time-Based One-Time Password) is an industry-standard algorithm for generating temporary, single-use codes based on the current time and a shared secret. TOTP is defined by the official IETF standard RFC 6238, which specifies how these codes are calculated to provide short-lived OTP values for secure two-factor authentication across websites, applications, and services.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="Why TOTP?">
            <ToolFaqCheckItem>Strengthens security with two-factor authentication (2FA)</ToolFaqCheckItem>
            <ToolFaqCheckItem>Widely adopted by major platforms (Google, Microsoft, GitHub, etc.)</ToolFaqCheckItem>
            <ToolFaqCheckItem>Tokens expire quickly, minimising the risk of code reuse</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard title="How long is a TOTP valid?">
            <div className="tools-faq-content">By default 30 seconds (RFC 6238 recommends 30s). Server verification often allows a one-step grace window for clock skew.</div>
          </ToolFaqCard>
          <ToolFaqCard title="Which algorithm should I use — SHA-1, SHA-256 or SHA-512?">
            <div className="tools-faq-content">SHA-1 is widely supported and used by most authenticator apps; SHA-256/512 are more robust if you control both the client and server and want stricter hashing. Ensure all sides use the same algorithm.</div>
          </ToolFaqCard>
          <ToolFaqCard title="Should I use 6 or 8 digits?">
            <div className="tools-faq-content">6 digits is the common standard (balances usability and security). 8 digits provide slightly more entropy but are less common for consumer authenticators.</div>
          </ToolFaqCard>
          <ToolFaqCard title="How do I extract a secret from an otpauth:// URI?">
            <div className="tools-faq-content">The <code>secret=</code> parameter in the <code>otpauth://</code> URL is the base32 secret.</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
