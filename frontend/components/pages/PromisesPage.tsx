interface Props {
  locale: string;
}

export default async function PromisesPage({ locale: _locale }: Props) {

  return (
    <>
      <div className="page-wrapper">

          <div className="inner-page-hero">
            <div className="container-medium-761px">
              <div className="text-center">
                <div className="color-white">
                  <h1 className="color-white">Ours Promises</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-default w-container"></div>
            <div className="container-medium-761px">
              <div className="ds-richtext-prose rich-text w-richtext">
                <ol  role="list">
                  <li>You own your code and data, not us.</li>
                  <li>We won’t lock you in from other vendors.</li>
                  <li>We will do everything we can to achieve 100% uptime.</li>
                  <li>We will never achieve 100% uptime, but when we fall short, we’ll explain why and how we’ll do better next time.</li>
                </ol>
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
