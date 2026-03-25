import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function Base64Page(_props: { locale: string }) {
  return (
    <>
      <ToolHero
        title="Base64 Decode & Encode"
        description="Easily decode or encode Base64 strings directly in your browser."
      />
      <ToolWidget
        src="https://base64-encoder-decoder-authgear.vercel.app/"
        iframeTitle="Base64 Encoder & Decoder"
        height="640px"
        policy="Your data security is our top priority. All encoding and decoding happen locally in your browser. This tool does not store or send any data outside of your device."
      />
      <MoreDevTools currentSlug="base64-decode-encode" />
      <ToolFeatureCards
        cards={[
          { icon: <img src="/images/tools-base64-simple.svg" loading="lazy" alt="" />, title: 'Simple & Fast', description: 'Encode or decode any text or Base64 string instantly with a single click.' },
          { icon: <img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" />, title: '100% Client-Side', description: 'No data is sent to any server. Everything runs safely within your browser.' },
          { icon: <img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" />, title: 'Developer-friendly.', description: 'Easy to use this tool to encode or decode Base64 data accurately and efficiently.' },
          { icon: <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />, title: 'Supports Base64URL', description: <>Decrypt a JWE token to retrieve the original JWT—including the payload—for analysis.</> },
        ]}
      />
      <ToolHowItWorks
        steps={[
          { step: 'Step 1.', title: 'Choose a character set', items: ['Select the character set you want to use, such as UTF-8. This determines how your text is converted before encoding or after decoding.'] },
          { step: 'Step 2.', title: 'Encode plain text', items: ['In the Decoded Text section, type or paste your text and click Encode. The Base64 result will appear in the output area of the same section.'] },
          { step: 'Step 3.', title: 'Decode Base64', items: ['In the Encoded Text section, enter your Base64 string and click Decode. The decoded text will be displayed in that section.'] },
        ]}
      />
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title="What Is Base64 Encoding?">
            <div className="tools-faq-content">Base64 is a binary to text encoding format that represents binary data using ASCII characters.<br />It allows binary content to be included safely inside formats such as JSON, XML, or HTTP headers.<br />Example:<br />Authgear → QXV0aGdlYXI=</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title="What Is the Difference Between Base64 and Base64URL?">
            <div className="tools-faq-content">Base64URL is a version of Base64 designed for URLs and token formats. It replaces the characters + with - and / with _, and padding characters (=) are often removed for URL safety.<br />This format is commonly used in JWTs, OAuth tokens, and OpenID Connect.</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
