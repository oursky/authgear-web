import { getTranslations } from 'next-intl/server';
import PageScripts from '@/components/PageScripts';

interface Props {
  locale: string;
}

const pageScripts: string[] = [
  `// disable first option from dropdown
  let selectionDropdown = document.getElementById("how-hear");
  let selectionOptions = selectionDropdown.getElementsByTagName("option");
  selectionOptions[0].disabled = true;`
];

export default async function DataPrivacyPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'DataPrivacy' });
  void t;

  return (
    <>
      <div className="page-wrapper">

          <div className="inner-page-hero">
            <div className="container-medium-761px">
              <div className="text-center">
                <div className="color-white">
                  <h1 className="color-white">Data Privacy Policy</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-default w-container"></div>
            <div className="container-medium-761px">
              <div className="rich-text w-richtext">
                <h4><strong>Who we are</strong>‍</h4>
                <p>When we refer to “Authgear,” “we,” or “us” in this policy, we mean SkyMakers Digital Limited, which controls the information Authgear collects when you use Authgear&#x27;s Services. Authgear owns and operates a number of websites.<br />‍<br />This Privacy Policy applies to our customers, prospective customers, our customers’ customers/users and visitors to <a href="https://www.authgear.com/">www.authgear.com</a>, an authentication as a service owned by Authgear. We refer to Authgear and its related services as “Services” in this policy.<strong>‍</strong></p>
                <h4>What information we collect about you?</h4>
                <p><em>Account and profile information<br /></em><br />While using our Services, we may ask you for certain personal information that can be used to contact and identify you, such as your name, email address, social media accounts, phone numbers, and payment information. When you contact our support team, we may also collect information such as contact information, documentation, or other information that will be helpful in solving the issue.<br /><br /><em>Content you provide through our products</em><strong><br /><br />‍</strong>To effectively deliver the Services to you, we need to be able to handle the content you provide to our products. Examples of content we collect and store include, but are not limited to, name of your account, database record, files, content you uploaded, or inputs to the Services.<br /><br /><em>Your activity</em><br /><br />We collect information about your activity when using our products to help us improve the product. The information we collect include, but are not limited to, your API usage, production logs of your app, the actions you carry out at the dashboard, the pages you visit, and the time you stay on the dashboard.<br /><br /><em>Cookies and other tracking technologies</em><br /><br />We and our analytics partners collect information about your visits to our websites, together with information such as your IP address, cookies, and other tracking technologies. You can control or opt out of these cookies and tracking technologies.<br /><br /><em>Support channels</em><strong><br /><br />‍</strong>As we may use third-party platforms to provide support to you, we may collect public information of your third-party platform account that we believe is necessary to providing you support.</p>
                <h4>How we use information we collect</h4>
                <p><em>To provide the Services<br />‍</em><strong>‍<br />‍</strong>We use your information because it is necessary to provide the Services to you. Examples include, but are not limited to, authenticating you when you log in to our platform, providing customer support, and operating and maintaining our services.<br /><br /><em>For research and development</em><strong><br /><br />‍</strong>We are constantly looking for ways to make our Services faster, smarter, and more secure to you. The information we collect help us understand how people use our Service and identify trends, usage, activity patterns, and areas for improvement. For example, we use information collected about how users navigate the software to design a more intuitive and straightforward interface where users can discover the information they need more easily.<br /><br /><em>To market, promote, and drive engagement with the Services</em><strong><br /><br />‍</strong>We use your contact information and information about how you use the Services to send promotional communication that may be of specific interest to you. These communications are aimed to maximize what you get out of the services. Communication includes, but is not limited to, new feature updates, newsletters, surveys, and payment invoices. You can control whether or not to receive these communications at the moment you sign up or in your account settings.<br /><br /><em>To provide customer support</em><strong><br /><br />‍</strong>We use information about you to resolve technical issues you encounter.<br /><br /><em>To protect our legitimate business interests and legal rights</em><strong><br /><br />‍</strong>Where required by law or where we believe it is necessary to protect our legal rights and interests and the interests of others, we use information about you in connection with legal claims, compliance, regulatory, and audit functions, and disclosures related to the acquisition, merger, or sale of a business.<br /><br /><em>Legal bases for processing for EEA users</em><strong><br /><br />‍</strong>If you are from the European Economic Area (EEA), our legal basis for collecting and using the personal information described in this Privacy Policy depends on the Services you use and how you use them. This means we collect and use your information only when:<br />- We need to provide you the Services<br />- You have given us the permission to do so<br />- It satisfies a legitimate interest, which is not overridden by your data protection interest<br />- Needed for payment processing purposes<br />- To comply with the law</p>
                <h4>How we share information we collection<br /></h4>
                <p>‍<em>Sharing with other Service users</em><strong><br /><br />‍</strong>Our Services allow you to add collaborators to your app. Once given the permission, collaborators will be able to access, edit, copy, and download the information of your app. They will also see the contact information of other collaborators of the app.<br /><br /><em>Sharing with third parties</em><strong><br /><br />‍</strong>We work with third-party service providers to provide website and application development, hosting, maintenance, backup, storage, virtual infrastructure, payment processing, analysis, and other services for us, which may require them to access or use information about you. If a service provider needs to access information about you to perform services on our behalf, they will only have the access to the necessary information to perform those tasks and are obligated not to disclose or use it for any other purpose.</p>
                <h4><strong>How we store and secure information we collect</strong>‍</h4>
                <p>We use data hosting service providers in the United States to host the information we collect, and we use technical measures to secure your data. However, no security system is impenetrable due to the inherent nature of the internet. We cannot guarantee that data, during transmission through the internet or while stored on our systems, is absolutely safe from intrusion by others. We will respond to requests about this within a reasonable time frame.</p>
                <h4>How long we keep your information</h4>
                <p>We will keep your information as long as it is necessary for the purposes set out in this Privacy Policy. After such time, we will either delete or anonymize your information.<br /><br />- Account information: We retain your account information until you delete your account. If you wish to delete your account, contact us at <a href="mailto:support@authgear.com">support@authgear.com</a>.<br />- Information you share on the Services: When you delete your account, all the information you share on the Services will be removed at the same time. However, for information that are shared with other users (i.e., you own an app that have collaborators), it will be retained to allow other users to make full use of the Services. If you want to also delete shared information when you delete your account, please contact us at <a href="mailto:support@authgear.com">support@authgear.com</a>.<br />- Marketing information: If you receive marketing emails from us, we retain information about your marketing preferences unless you delete your account or specifically ask us to delete such information. For information derived from cookies and other tracking technologies, we retain such information for a reasonable period of time from the date it was created.</p>
                <h4>How we transfer information we collect</h4>
                <p>‍<strong>‍</strong>Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country or other governmental jurisdiction where data protection laws may differ than those from your jurisdiction.<br /><br />We primarily store information we collect in the United State and transfer, process, and store wherever we or our third-party service providers operate for the purpose of providing you the Services. Whenever we transfer your information, we take steps to protect it.</p>
                <h4>Your data protection rights under General Data Protection Regulation (GDPR)</h4>
                <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights under GDPR. We take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data. If you wish to be informed what personal data we hold about you and if you want it to be removed from our systems, please contact us at <a href="http://support@authgear.com/">support@authgear.com</a>.<br /><br />In certain circumstances, you have the following data protection rights:<br />- The right to access, update, or to delete the information we have on you. Whenever possible, you can access, update, or request deletion of your personal data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.<br />- The right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete.<br />- The right to object. You have the right to object to our processing of your personal data.<br />- The right of restriction.<strong> </strong>You have the right to request that we restrict the processing of your personal information.<br />- The right to data portability.<strong> </strong>You have the right to be provided with a copy of the information we have on you in a structured, machine-readable, and commonly used format.<br />- The right to withdraw consent.<strong> </strong>You also have the right to withdraw your consent at any time where Authgear relies on your consent to process your personal information.<br /><br />Please note that we may ask you to verify your identity before responding to such requests. You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</p>
                <h4><strong>Children’s privacy</strong>‍</h4>
                <p>The Services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 provided us with personal information, we will take steps to delete such information. If you are a parent or guardian and you are aware that your children have provided us with personal data, please contact us at <a href="http://support@authgear.com/">support@authgear.com.</a><strong>‍</strong></p>
                <h4>Changes to this privacy policy</h4>
                <p><strong>‍</strong>We may update our privacy policy from time to time. We will notify you of any changes by posting them on this page. We will let you know via email and/or a prominent notice on our Service prior to implementing the changes, and update the “effective date” at the top of this privacy policy. You are advised to review this privacy policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                <h4>Contact us</h4>
                <p>‍If you have any questions about the privacy policy, please contact our Data Protection Officer at <a href="mailto:support@authgear.com">support@authgear.com</a>.<br /></p>
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

      <PageScripts scripts={pageScripts} />
    </>
  );
}
