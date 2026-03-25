import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function PasswordHashPage(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title={<>Password Hash Generator and Verifier<br />(Argon2id, bcrypt, scrypt, PBKDF2)</>}
        description="Client-side tool to generate/verify password hashes with realistic parameters. Helpful for debugging integrations and understanding how salts, memory, and iterations affect cost. Runs locally—no passwords leave your browser."
      />
      <ToolWidget
        src="https://authgear.github.io/authgear-widget-password-hash/"
        iframeTitle="Password Hash Generator"
        height="1000px"
        policy={<>Your data security is our top priority. All hashing and verification happen in this browser. This tool does not store or send your password nor hashes outside of the browser. See source code in: <a href="#">https://github.com/authgear/authgear-widget-password-hash</a></>}
      />
      <MoreDevTools currentSlug="password-hash-generator" />
      <ToolFeatureCards
        sectionTitle="Supported Password Hashing Functions"
        gridClass="_4-card-grid-tools hashing"
        cards={[
          { title: 'Argon2id Generator & Parameters', description: <>Argon2id is a modern, memory-hard function that raises the attacker&apos;s cost on GPUs/ASICs. Tune <em>memory</em>, <em>iterations (t)</em>, and <em>parallelism (p)</em> until your authentication path lands around <strong>250–500ms</strong> on production hardware. Use a unique random salt per password (16–32 bytes).</> },
          { title: 'bcrypt Generator (cost/rounds)', description: <>bcrypt is battle-tested and widely available. Increase <em>cost</em> to slow brute-force attempts, while keeping login UX responsive. We output the <code>$2b$</code> format for broad compatibility.</> },
          { title: 'scrypt Generator (N, r, p)', description: <>scrypt adds memory-hardness. Increase <em>N</em> (e.g., 2<sup>15</sup>–2<sup>19</sup>) to raise attacker cost; adjust <em>r</em> and <em>p</em> to balance memory and parallelism.</> },
          { title: 'PBKDF2 Generator (SHA-256 / SHA-512)', description: 'PBKDF2 remains a compatibility workhorse. Use high iteration counts (hundreds of thousands or more) and revisit yearly as hardware improves.' },
          {
            title: 'Salts (and Optional Pepper)',
            description: <>
              The tool generates cryptographically secure salts and lets you set length and encoding (Hex/Base64). Some deployments also add a <em>pepper</em> (site-wide server secret) that&apos;s not stored in the hash. Use peppers carefully and manage them like other secrets.
              <br />Read more:<br />
              <a href="https://www.authgear.com/post/password-hashing-salting-function-and-algorithm-explained" target="_blank">Password hashing &amp; salting explained</a>{'  •  '}<a href="https://www.authgear.com/post/password-hashing-how-to-pick-the-right-hashing-function" target="_blank">How to pick the right hashing function</a>
            </>,
          },
        ]}
      />
      <ToolHowItWorks
        sectionTitle="How to use the Password Hash Generator"
        steps={[
          { step: 'Step 1.', title: 'Enter a password', items: [<>Open the <strong>Generate</strong> tab and type a demo password (avoid real credentials).</>] },
          { step: 'Step 2.', title: 'Select an algorithm', items: [<>For new systems, <strong>Argon2id</strong> is generally recommended.</>] },
          {
            step: 'Step 3.', title: 'Set parameters:',
            items: [
              <><strong>Argon2id</strong>: Memory (MiB), Iterations (t), Parallelism (p).</>,
              <><strong>bcrypt</strong>: Cost (2<sup>cost</sup> rounds).</>,
              <><strong>scrypt</strong>: N (power of two), r, p.</>,
              <><strong>PBKDF2</strong>: Iterations and digest (SHA-256/512).</>,
            ],
          },
          { step: 'Step 4.', title: 'Generate Password Hash', items: [<>Click <strong>Generate Password Hash</strong>. Copy the encoded string.</>] },
          { step: 'Step 5.', title: 'Verify Password Hash', items: [<>Switch to <strong>Verify Password Hash</strong> to test a password + encoded hash pair.</>] },
        ]}
      />
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="Is it safe to use this with real passwords?">
            <div className="tools-faq-content">All hashing happens locally in your browser. For your own safety, avoid using production secrets in any online tool.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="Which hashing function should I use?">
            <div className="tools-faq-content">For new systems, Argon2id is generally recommended. bcrypt and scrypt are widely deployed; PBKDF2 is a compatibility fallback. Always benchmark and choose parameters that meet your latency targets.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-best-practice.svg" title="How long should hashing take?">
            <div className="tools-faq-content">Many teams target ~250–500ms in the authentication path. Pick the slowest settings that still keep UX smooth on your production hardware.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="Why won't my framework verify the hash?">
            <div className="tools-faq-content">Common issues: whitespace/line endings, encoding mismatch (hex vs Base64), bcrypt prefix differences (<code>$2a$</code> vs <code>$2b$</code>), or forgetting a pepper.</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What salt length should I use?">
            <div className="tools-faq-content">16–32 bytes of random data is standard. The tool defaults to secure randomness and shows length and encoding.</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
