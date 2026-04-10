interface Props {
  locale: string;
}

export default async function PolicyPage({ locale: _locale }: Props) {

  return (
    <>
      <div className="page-wrapper">

          <div className="inner-page-hero">
            <div className="container-medium-761px">
              <div className="text-center">
                <div className="color-white">
                  <h1 className="color-white">Acceptable Use Policy</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-default w-container"></div>
            <div className="container-medium-761px">
              <div className="ds-richtext-prose rich-text w-richtext">
                <p>Your use of the Service is subject to this Acceptable Use Policy. If you are found to be in violation of our policies at any given time and as determined by Authgear in its sole discretion, we may warn you or suspend or terminate your account. Please note that we may change our Acceptable Use Policy at any time. Pursuant to the <a href="/terms">Terms</a>, it is your responsibility to keep up-to-date with and adhere to the policies posted here. All capitalized terms used herein have the meanings stated in the Terms, unless stated otherwise.</p>
                <h3>Prohibited Content</h3>
                <p>The Content displayed and/or processed through your Application or other web site utilizing the Service shall not contain any of the following types of content:</p>
                <ul role="list">
                  <li>Content that infringes a third party’s rights (i.e., copyright) according to applicable law</li>
                  <li>Excessively profane content</li>
                  <li>Hate-related or violent content</li>
                  <li>Content advocating racial or ethnic intolerance</li>
                  <li>Content intended to advocate or advance computer hacking or cracking</li>
                  <li>Gambling</li>
                  <li>Other illegal activities, including but not limited to, illegal export of controlled substances or illegal software</li>
                  <li>Drug paraphernalia</li>
                  <li>Phishing</li>
                  <li>Malicious content</li>
                  <li>Other materials, products, or services that violate or encourage conduct that would violate any criminal laws, any other applicable laws, or any third-party rights<br /></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="section cta">
            <div className="container-default w-container">
              <div className="cta-wrapper">
                <div className="animation-div">
                  <a href="/pricing" className="split-content cta-left w-inline-block">
                    <h2 className="title cta-split-content-left">Get Started for free</h2>
                    <p className="paragraph cta-split-content-left">Authgear.com is free for apps unlimited MAUs (Monthly Active Users) with Authgear branding. It is also open source and always free!</p>
                    <div className="link-wrapper white">
                      <div>Get Started</div>
                      <div className="underline-wrapper white">
                        <div className="underline white"></div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="animation-div">
                  <a href="/schedule-demo" className="split-content cta-right w-inline-block">
                    <h2 className="title cta-split-content-right">Talk with our sales team</h2>
                    <p className="paragraph cta-split-content-right">If you are looking for volume discounts, custom support plans, SLA, or have a different compliance requirements, feel free to contact us!</p>
                    <div className="link-wrapper cta-right">
                      <div>Contact Us</div>
                      <div className="underline-wrapper">
                        <div className="underline"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-default w-container">
            <div className="divider"></div>
          </div>

        </div>

    </>
  );
}
