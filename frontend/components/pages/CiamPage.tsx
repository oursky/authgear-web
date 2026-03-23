import { getTranslations } from 'next-intl/server';
import PageScripts from '@/components/PageScripts';

interface Props {
  locale: string;
}

const pageScripts: string[] = [
  `// disable first option from dropdown
  let selectionDropdown = document.getElementById("how-hear");
  let selectionOptions = selectionDropdown.getElementsByTagName("option");
  selectionOptions[0].disabled = true;`,
  `$(".code-block .code-snippet")
	.each((i,ele)=>{
  	CodeMirror.fromTextArea(ele,{
    	mode: "javascript",
      lineNumbers: true,
      theme: "material-ocean",
      readOnly: true
    })
	})
$(".section-about-app-tab-link").click((evt) => {
    const tab = $(evt.target.closest('.section-about-app-tab-link')).attr("data-w-tab")
    const tabPane = $(\`.section-about-app-tab-pane[data-w-tab='\${tab}']\`)
    tabPane.each((i, pane) => {
      $(pane).find(".CodeMirror")
      	.each((j,cm)=>{
          setTimeout(function(){ cm.CodeMirror.refresh(); }, 400);
      })
    })
})
let showAnnouncement = function(){
	$(".page-wrapper").addClass("announcement")
  $(".announcement-bar").slideDown(100)
}
$(document).ready(()=>{
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const from = urlParams.get("from")
  if(from == "skygear") showAnnouncement()
})`
];

export default async function CiamPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Ciam' });
  void t;

  return (
    <>
      <div className="page-wrapper">

          <div className="section home-hero ads">
            <div className="container-1440">
              <div className="home-hero-wrapper">
                <div className="container-medium-908px home-hero">
                  <a href="https://www.authgear.com/features/passkeys" className="home-newfeaturetag w-inline-block">
                    <div className="home-newfeaturetag home-newfeaturetag-label">🎉 Now supports Passkeys</div>
                  </a>
                  <h1 className="heading herotag">Plug and Play Secure Auth for Growth</h1>
                  <p className="paragraph-large home-hero">Secure auth and user management that converts more users for your apps.</p>
                </div>
                <div className="home-hero-img-wrapper">
                  <a href="#" className="home-hero-kv-container w-inline-block">
                    <div style={{"WebkitTransform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "MozTransform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "msTransform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "transformStyle": "preserve-3d"}} className="home-kv-loginbox">
                      <div className="home-kv-loginbox-lock"><img src="/images/authgear-ld-a-1.svg" loading="lazy" alt="" className="home-kv-loginbox-lock-img" /></div>
                      <h6 className="home-kv-loginbox-title">Login to continue</h6>
                      <div className="home-kv-loginbox-loginbtn loginbtn--apple">
                        <div className="home-kv-loginbox-loginbtn-label">Apple ID</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/authgear-ld-a-2.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                      </div>
                      <div className="home-kv-loginbox-loginbtn loginbtn--google">
                        <div className="home-kv-loginbox-loginbtn-label">Google</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/authgear-ld-a-3.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                      </div>
                      <div className="home-kv-loginbox-loginbtn loginbtn--ad">
                        <div className="home-kv-loginbox-loginbtn-label">Azure AD</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/authgear-ld-a-4.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                      </div>
                      <div className="home-kv-loginbox-loginbtn loginbtn--wtsapp">
                        <div className="home-kv-loginbox-loginbtn-label">WhatsApp OTP</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/authgear-ld-a-5.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                      </div>
                      <div className="home-kv-loginbox-loginbtn loginbtn--authn">
                        <div className="home-kv-loginbox-loginbtn-label">Biometric Login</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/authgear-ld-a-6.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                      </div>
                      <div className="home-kv-loginbox-loginbtn loginbtn--passkey">
                        <div className="home-kv-loginbox-loginbtn-label">Login with Passkey</div>
                        <div className="home-kv-loginbox-icon"><img src="/images/passkey.png" loading="lazy" alt="" className="home-kv-loginbox-icon-img" /></div>
                        <div className="home-hero-new-badge">NEW</div>
                      </div>
                    </div>
                    <div className="home-kv-loginbox-bg"></div>
                  </a>
                </div>
              </div>
            </div>
            <div className="container-default w-container">
              <div className="images-wrapper home-hero">
                <div className="image-wrapper home-hero">
                  <div className="home-lottie" data-animation-type="lottie" data-src="/documents/data.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="7.74107409244067" data-duration="0"></div><img src="/images/hero-mobile.png" alt="" className="image home-hero sm" />
                </div>
              </div>
              <div className="w-layout-grid companies-grid home">
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d88-fd09c472" className="animation-div">
                  <a href="https://www.hkpc.org/en" target="_blank" className="image-wrapper company bg-white hero-company home w-inline-block"><img src="/images/compare-customer-logo-buppa2x.webp" alt="" className="image company hero-company" /></a>
                </div>
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d8b-fd09c472" className="animation-div">
                  <a href="https://www.cimic.com.au/" target="_blank" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/authgear_logos_CIMIC.webp" alt="" width="Auto" className="image company hero-company" /></a>
                </div>
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d8e-fd09c472" className="animation-div">
                  <a href="https://www.facebook.com/REESforGamers/" target="_blank" className="image-wrapper company bg-white hero-company home w-inline-block"><img src="/images/compare-customer-logo-HKL2x.webp" alt="" className="image company" /></a>
                </div>
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d91-fd09c472" className="animation-div">
                  <a href="https://formx.ai/" target="_blank" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/compare-customer-logo-hkpc2x.webp" alt="" className="image company" /></a>
                </div>
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d94-fd09c472" className="animation-div">
                  <a href="#" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/authgear_logos_k11.webp" alt="" className="image company home" /></a>
                </div>
                <div id="w-node-_52f02a2b-be28-9776-f18d-787becdc1d97-fd09c472" className="animation-div">
                  <a href="#" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/compare-customer-logo-mtr2x.webp" alt="" className="image company" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-default w-container">
            <div className="divider"></div>
          </div>
          <div className="section section-about-app">
            <div className="container--homefeaturecard container--homefeaturecard--title w-container">
              <h2 className="home-feature-largetitle"><span>All-in-one <br /></span><span className="text-span">Auth Solution</span></h2>
            </div>
            <div className="container--homefeaturecard w-container">
              <div className="home-feature-card">
                <h3 className="home-feature-card-title">Self-Service Settings</h3>
                <p className="home-feature-card-paragraph">Prebuilt account setting page for users to change passwords, set up 2FA, revoke signed in sessions, or edit profile information, without having to contact the support team.<br /><br />Don&#x27;t have to worry about complex APIs or SDKs, just use the pre-built UI with customisable brands.</p><img sizes="(max-width: 548px) 100vw, 548px" srcSet="/images/Settings-page-p-500.png 500w, /images/Settings-page.png 548w" src="/images/Settings-page.png" alt="" className="image home-feature-card-img home-feature-card-img--profile" />
              </div>
              <div className="home-feature-card home-feature-card--passwordless">
                <h3 className="home-feature-card-title">Passwordless</h3>
                <p className="home-feature-card-paragraph">Now support Passkeys, Single Sign-on, Social Login, Two-Factor Authentication, Biometrics, and more.</p><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Security-features-p-500.png 500w, /images/Security-features.png 1140w" src="/images/Security-features.png" alt="" className="image home-feature-card-img" />
              </div>
              <div className="home-feature-card home-feature-card-signupui">
                <h3 className="home-feature-card-title">Signup Page</h3>
                <p className="home-feature-card-paragraph">Use prebuilt Signup and Login page for frictionless user experience. Designed for high conversion rate without compromising security.</p><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 900px" height="" src="/images/Signup-Page.png" srcSet="/images/Signup-Page-p-500.png 500w, /images/Signup-Page-p-800.png 800w, /images/Signup-Page.png 900w" alt="" className="image home-feature-card-img" />
              </div>
              <div className="home-feature-card home-feature-card--admin">
                <h3 className="home-feature-card-title">Admin Portals</h3>
                <p className="home-feature-card-paragraph">User Management for your admin or customer support to create, remove, disable or revoke users&#x27; sessions with a few clicks.<br /><br />Built-in users analytics and audit log for marketing and security purposes.</p><img alt="" src="/images/Admin-Portal.png" className="image home-feature-card-img" />
              </div>
            </div>
            <div className="container-default w-container"></div>
          </div>
          <div className="container-default w-container"></div>
          <div className="section--lottiespinner">
            <div data-is-ix2-target="1" className="lottie-animation" data-animation-type="lottie" data-src="/documents/lottiebanner.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="1.1344677549266498" data-duration="0"></div>
          </div>
          <div className="section features">
            <div className="container-default w-container">
              <div className="top-content features">
                <h2 className="title features">Make it easy for developers to meet complex auth requirements</h2>
              </div>
              <div className="w-layout-grid feature-grid-3x2">
                <div className="feature-wrapper"><img src="/images/sso.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">SSO &amp; Social Login</h3>
                  <p>Login in to multiple apps at once; Sign in with Google, Apple, Facebook and more.</p>
                </div>
                <div className="feature-wrapper"><img src="/images/otp.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">Two-Factor Authentication</h3>
                  <p>Add 2FA support (SMS, WhatsApp, email OTP or TOTP Authenticator) to your app in minutes.</p>
                </div>
                <div className="feature-wrapper"><img src="/images/passkeys.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">Passkeys &amp; Biometrics</h3>
                  <p>Don&#x27;t bother with password anymore and go Passwordless with Passkeys, SMS/Email or Biometrics.</p>
                </div>
                <div className="feature-wrapper"><img src="/images/migration.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">Azure AD/LDAP Supported</h3>
                  <p>Need integration with your legacy or existing WIAM? We got your back!</p>
                </div>
                <div className="feature-wrapper"><img src="/images/password-policies.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">Password Policies</h3>
                  <p>Customizable Password Policies to fulfilling your corporate security requirements.</p>
                </div>
                <div className="feature-wrapper"><img src="/images/session-management.svg" alt="" className="image icon-feature" />
                  <h3 className="h3-title-small">Sessions Alert and Revoke</h3>
                  <p>Empower your users to ensure their account&#x27;s security by listing their sessions and terminate unknown one.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default w-container">
              <div className="cta-wrapper">
                <div className="cta-v2">
                  <h2 className="title cta-split-content-left">Passkeys &amp; <br />2FA out of the box</h2>
                  <p className="cta-v2-paragraph">Build your app not another login</p>
                  <a href="https://www.authgear.com/schedule-demo" target="_blank" className="w-inline-block">
                    <div className="cta-v2-ctabtn button-primary">Request Demo</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-medium-651px section-platform">
              <h2>Start building with our SDKs</h2>
              <p className="paragraph section-about-app-top">Plug-and-play authentication for your web or mobile apps</p>
            </div>
            <div className="container-default w-container">
              <div className="w-layout-grid platforms-grid">
                <a href="https://docs.authgear.com/get-started/ios" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/iOS.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">iOS Swift</h3>
                </a>
                <a href="https://docs.authgear.com/get-started/android" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/Android.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">Android</h3>
                </a>
                <a href="https://docs.authgear.com/get-started/react-native" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/React.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">React Native</h3>
                </a>
                <a href="https://docs.authgear.com/get-started/website" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/JS.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">Web</h3>
                </a>
                <a id="w-node-_85024917-b813-1dc3-ade7-13e6872a7f50-fd09c472" href="https://docs.authgear.com/get-started/flutter" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/Flutter.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">Flutter</h3>
                </a>
                <a id="w-node-_42886450-8dfc-2d29-0bdb-d1c308a9f9b7-fd09c472" href="https://docs.authgear.com/get-started/xamarin" target="_blank" className="platform-wrapper w-inline-block"><img src="/images/Xamarin.svg" loading="lazy" alt="" className="image icon-platform" />
                  <h3 className="h3-title-small platform">Xamarin</h3>
                </a>
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
