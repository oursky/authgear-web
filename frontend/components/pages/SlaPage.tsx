interface Props {
  locale: string;
}

export default async function SlaPage({ locale: _locale }: Props) {

  return (
    <>
      <div className="page-wrapper">

          <div className="inner-page-hero">
            <div className="container-medium-761px">
              <div className="text-center">
                <div className="color-white">
                  <h1 className="color-white">Service Level Agreement</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-default w-container"></div>
            <div className="container-medium-761px">
              <div className="rich-text w-richtext">
                <p>We understand that service interruptions hinder productivity and disrupt your operation.<br />We’ve set a high bar for service uptime because we believe that you should be able to depend on Authgear and run your business without hassles.</p>
                <h3>The Basics</h3>
                <p>Our paid plan SLA guarantees a 99.95% monthly uptime, excluding scheduled downtimes described below.<br /><br />Authgear also promises these to our users:</p>
                <ul role="list">
                  <li>You own your code, not us.</li>
                  <li>We won’t lock you in (your business is our privilege, not our right).</li>
                  <li>We will use commercially reasonable efforts to achieve 100% uptime.</li>
                  <li>If we fall short of our 99.95% uptime guarantee (scheduled downtime excluded), we’ll refund customers on the paid plan 10% of the amount you paid within the month Authgear was down.</li>
                </ul>
                <h3>Scheduled Downtime</h3>
                <p>Occasionally, we need to perform maintenance to keep Authgear working as smoothly as possible. If scheduled downtime is necessary, we’ll give you 48 hours' advance notice. In a calendar year, there will be no more than 12 hours of scheduled downtime.</p>
                <h3>Downtime</h3>
                <p>Downtime means the hosted server of Authgear was unavailable for use excluding the period of scheduled maintenance. We use server monitoring software to monitor when Authgear is down. Downtime does not include the period of time when Authgear is not available as a result of scheduled downtime.</p>
                <h3>Service Credit</h3>
                <p>In a calendar month during which the SLA is not met as defined in the Service Commitment, and as confirmed by Authgear in its sole discretion, Authgear will provide the customer’s account with a nontransferable Service Credit equaling to 10% of the fees paid by customer in the applicable calendar month. Service Credit will be issued for future use only and must be requested by Customer. No refunds of cash value will be provided.</p>
                <h3>SLA Exclusions</h3>
                <p>The SLA does not apply to any of the following:</p>
                <ul role="list">
                  <li>Features designated as beta, early access, free trial, limited preview, or preview</li>
                  <li>Downtime caused by any of the following:<ul role="list">
                      <li>Factors outside of Authgear's reasonable control</li>
                      <li>Force majeure events</li>
                      <li>Customer’s software or hardware or third-party software or hardware under the customer’s control, or both</li>
                      <li>Abuses or other behaviors that violate the Agreement</li>
                    </ul>
                  </li>
                </ul>
                <h3>Security Vulnerability Report Response</h3>
                <p>Please refer to <a href="https://github.com/authgear/authgear-server/blob/main/SECURITY.md" target="_blank">https://github.com/authgear/authgear-server/blob/main/SECURITY.md</a><br /></p>
                <h3><strong>Security Breach Notification</strong></h3>
                <p>In the event of a security breach, we will without undue delay and ,where feasible, not later than 72 hours after having become aware of it, notify affected clients by email. Where the notification to affected clients is not made within 72 hours, it shall be accompanied by reasons for the delay.<br /></p>
                <h3>Change Notification</h3>
                <p>If changes were planned that will potentially affect current clients, the change will be communicated to clients by email 14 days prior to taking effect. The notification will include the following information (if applicable):</p>
                <ul role="list">
                  <li>Affected feature(s)</li>
                  <li>Migration path</li>
                  <li>Grace period</li>
                  <li>Planned downtime<br /></li>
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
