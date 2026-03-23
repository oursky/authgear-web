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
  `systemTab = document.querySelectorAll(".system");
const changeSystem = function (e, c) {
  e.preventDefault();
  document
    .querySelectorAll(".code-wrapper")
    .forEach((pre) => pre.setAttribute("style", "z-index: 0;"));
  document
    .querySelector(\`.code-wrapper.\${c[2]}\`)
    .setAttribute("style", "z-index: 1;");
};
systemTab.forEach((s) =>
  s.addEventListener("click", (event) => changeSystem(event, s.classList))
);
$(".code-block .code-snippet")
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
})`,
  `const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('email')){
	const email = urlParams.get('email');
	document.getElementById("Email-6").value = email;
}
if(urlParams.has('name')){
	const name = urlParams.get('name');
	document.getElementById("Name-5").value = name;
}`,
  `var input = document.querySelector("#Phone-3"),
	country = document.querySelector("#Country-4"),
 	errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");
var iti = intlTelInput(input, {
	nationalMode: true,
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("hk"));
  },
  preferredCountries: [
  	"hk",
  	"sg",
		"au",
	],
  placeholderNumberType: 'MOBILE',
});
window.intlTelInputGlobals.getCountryData().forEach((country) => {
  country.name = country.name.replace(/\\(.*\\)/, "").trim();
})
var updateInputValue = function (event) {
       country.value = iti.getSelectedCountryData().name;
};
input.addEventListener('input', updateInputValue, false);
input.addEventListener('countrychange', updateInputValue, false);
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
      input.value = iti.getNumber();
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);`
];

export default async function OncePage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Once' });
  void t;

  return (
    <>
      <div className="page-wrapper">

        <div className="w-layout-blockcontainer popup-container w-container">
          <div className="w-layout-blockcontainer container-1459 w-container"></div>
          <div className="w-layout-hflex waitlist-popup"><img src="/images/AuthgearONCE_logo_dark.svg" loading="lazy" alt="" />
            <div className="text-block-64">Get Early Access to<br />Authgear ONCE</div>
            <div className="authgear-once-form w-form">
              <form id="wf-form-Once-Waitlist" name="wf-form-Once-Waitlist-2" data-name="Once Waitlist" method="get" className="authgear-once"><input className="text-field-2 w-input" maxLength={256} name="Email" data-name="Email" placeholder="Your email address" type="email" id="Email" required />
                <div id="w-node-f51c9bed-a02e-8eab-fd22-370ce9d91b0e-85a0aff6" data-sitekey="6LdonPYqAAAAAGzNsg7cDyHi5VTueApPzHoOx0Y4" className="w-form-formrecaptcha recaptcha long g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div><input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Submit" />
              </form>
              <div className="success-message-4 w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div><img src="/images/Authgear_once-list-pop-close.svg" loading="lazy" alt="" className="image-83" />
          </div>
        </div>

        <div className="page-wrapper once-banner">
          <div className="section home-hero dark once-banner new-kv">
            <div className="container-default-inner once-container-bottom">
              <div className="div-block-23">
                <div className="div-block-22">
                  <div className="w-layout-blockcontainer product-switch-outer w-container">
                    <div className="w-layout-hflex product-switch">
                      <a href="/" className="flex-block-66 w-inline-block">
                        <div className="code-embed-4 w-embed"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.53093 4.98208C6.93198 3.67788 8.86593 3 11.0358 3H21.632C23.8031 3 25.7368 3.68155 27.1373 4.98691C28.5456 6.29955 29.3337 8.16888 29.3337 10.3761V16.4332C29.3337 16.9855 28.886 17.4332 28.3337 17.4332C27.7815 17.4332 27.3337 16.9855 27.3337 16.4332V10.3761C27.3337 8.66433 26.7345 7.34559 25.7736 6.44992C24.8049 5.54699 23.3877 5 21.632 5H11.0358C9.2787 5 7.86176 5.54481 6.89364 6.44599C5.93362 7.33964 5.33398 8.65784 5.33398 10.3761V21.6211C5.33398 23.3401 5.9337 24.6589 6.89381 25.5531C7.86194 26.4547 9.27885 26.9997 11.0358 26.9997H12.2578C12.8101 26.9997 13.2578 27.4475 13.2578 27.9997C13.2578 28.552 12.8101 28.9997 12.2578 28.9997H11.0358C8.86578 28.9997 6.9318 28.3215 5.53077 27.0167C4.1217 25.7045 3.33398 23.834 3.33398 21.6211V10.3761C3.33398 8.16369 4.12178 6.29381 5.53093 4.98208Z" fill="#AFB7FF"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.36523 16C3.36523 15.4477 3.81294 15 4.36523 15H16.6272C17.1794 15 17.6272 15.4477 17.6272 16C17.6272 16.5523 17.1794 17 16.6272 17H4.36523C3.81294 17 3.36523 16.5523 3.36523 16Z" fill="#AFB7FF"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 21.5131C9.15039 20.9608 9.59811 20.5131 10.1504 20.5131H10.847C11.3993 20.5131 11.847 20.9608 11.847 21.5131C11.847 22.0653 11.3993 22.5131 10.847 22.5131H10.1504C9.59811 22.5131 9.15039 22.0653 9.15039 21.5131Z" fill="#AFB7FF"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 10.487C9.15039 9.93469 9.59811 9.48697 10.1504 9.48697H10.847C11.3993 9.48697 11.847 9.93469 11.847 10.487C11.847 11.0393 11.3993 11.487 10.847 11.487H10.1504C9.59811 11.487 9.15039 11.0393 9.15039 10.487ZM15.4683 10.487C15.4683 9.93469 15.916 9.48697 16.4683 9.48697H22.5136C23.0659 9.48697 23.5136 9.93469 23.5136 10.487C23.5136 11.0393 23.0659 11.487 22.5136 11.487H16.4683C15.916 11.487 15.4683 11.0393 15.4683 10.487Z" fill="#AFB7FF"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.417 19.7139C19.1082 18.8004 20.2219 18.0703 21.7978 18.0703C23.3736 18.0703 24.4872 18.8004 25.1786 19.7139C25.604 20.276 25.8731 20.9097 26.0107 21.4937C26.6736 21.6397 27.2874 21.9484 27.7838 22.4223C28.5026 23.1085 28.9079 24.0776 28.9079 25.2064C28.9079 26.7509 27.9916 28.0855 26.6684 28.6837C26.6551 28.6897 26.6415 28.6955 26.6279 28.7009C26.0868 28.9173 25.5487 28.9995 25.12 28.9995H18.4702C18.037 28.9995 17.5003 28.9131 16.9662 28.6968C16.9539 28.6917 16.9416 28.6865 16.9296 28.6811C15.6088 28.084 14.6875 26.7536 14.6875 25.2064C14.6875 24.0776 15.0928 23.1085 15.8118 22.4223C16.3082 21.9484 16.9219 21.6397 17.5847 21.4937C17.7223 20.9097 17.9915 20.276 18.417 19.7139ZM20.0118 20.9208C19.6236 21.4337 19.4728 22.0513 19.4728 22.3952C19.4728 22.9439 19.0307 23.3901 18.482 23.3952C17.9318 23.4003 17.4898 23.5853 17.1927 23.8689C16.9043 24.1443 16.6875 24.5736 16.6875 25.2064C16.6875 25.9331 17.115 26.5617 17.7358 26.8505C18.015 26.9605 18.2875 26.9995 18.4702 26.9995H25.12C25.307 26.9995 25.5823 26.9616 25.8643 26.8523C26.4816 26.564 26.9079 25.9349 26.9079 25.2064C26.9079 24.5736 26.6912 24.1443 26.4027 23.8689C26.1058 23.5853 25.6636 23.4003 25.1134 23.3952C24.5648 23.3901 24.1227 22.9439 24.1227 22.3952C24.1227 22.0513 23.9719 21.4337 23.5838 20.9208C23.2264 20.4487 22.6776 20.0703 21.7978 20.0703C20.9179 20.0703 20.369 20.4487 20.0118 20.9208Z" fill="#AFB7FF"></path>
                          </svg></div>
                        <div className="text-block-63">On the Cloud</div>
                      </a>
                      <div className="w-layout-hflex flex-block-66 active">
                        <div className="code-embed-4 w-embed"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 27.8844H24.7477C26.6535 27.8844 28 26.6921 28 24.7904V21.8831C28 19.9748 26.6535 18.7891 24.7477 18.7891H7.25232C5.3466 18.7891 4 19.9748 4 21.8831V24.7904C4 26.6973 5.3466 27.8844 7.25232 27.8844H11.6262" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M21.7129 27.875V22.1902" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8.7832 23.3385H10.0818" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M16 4.11459H7.25232C5.3466 4.11459 4 5.30681 4 7.20865V10.1159C4 12.0229 5.3466 13.2099 7.25232 13.2099H24.7477C26.6535 13.2099 28 12.0229 28 10.1159V7.20865C28 5.30162 26.6535 4.11459 24.7477 4.11459H20.3739" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M21.7129 13.2095V8.00259" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8.7832 8.66147H10.0818" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg></div>
                        <div className="text-block-63 active">On your Server</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-blockcontainer once-h1-container w-container"><img src="/images/Auhtgear_bannerlogo_ONCE.svg" loading="lazy" width="338" alt="" className="once-img" /></div>
                  <div className="w-layout-blockcontainer once-subititle w-container">
                    <p className="once-h1">Like Auth0,<br />But Without the <span className="once-gradient">Subscription</span></p>
                    <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc once-mobile">Take control of your identity and access management with Authgear ONCE — a self-hosted IAM platform you own forever. No subscriptions, no surprises.</p>
                    <div className="w-embed">
                      <a href="https://www.producthunt.com/products/authgear-once/reviews?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-authgear&#0045;once" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1080383&theme=light" alt="Authgear&#0032;ONCE - Own&#0032;your&#0032;auth&#0032;without&#0032;subscription | Product Hunt" style={{"width": "250px", "height": "54px"}} width="250" height="54" /></a>
                    </div>
                  </div>
                  <div className="w-layout-hflex home-hero-cta-wrapper once-cta-wrapper">
                    <a href="https://accounts.portal.authgear.com/signup" className="button-primary home-hero new-home radius-16 once-special-button w-button">Try for free with CLOUD</a>
                    <a href="#system-installation" className="developer-docs">See how to install &gt;</a>
                  </div>
                </div>
                <div className="once-price-float">
                  <div className="w-layout-hflex once-price"><img src="/images/AuthgearONCE_logo_small.svg" loading="lazy" alt="" className="pricing---once-logo" />
                    <div className="w-layout-blockcontainer once-price-text w-container">
                      <div className="oce-price-text">$ <span className="price-number">299</span> /one-time</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex whats-included">
                    <div>
                      <div className="w-layout-blockcontainer container-1449 w-container">
                        <div className="w-layout-blockcontainer included-feature w-container"><img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                          <div className="included-feature-text">Complete IAM with SDKs and tools.</div>
                        </div>
                        <div className="w-layout-blockcontainer included-feature w-container"><img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                          <div className="included-feature-text">Full control of data and self-host.</div>
                        </div>
                        <div className="w-layout-blockcontainer included-feature w-container"><img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                          <div className="included-feature-text">Install in 10 minutes</div>
                        </div>
                        <div className="w-layout-blockcontainer included-feature w-container"><img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                          <div className="included-feature-text">2 years of updates included</div>
                        </div>
                        <div className="w-layout-blockcontainer included-feature w-container"><img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                          <div className="included-feature-text">Email and Discord support</div>
                        </div>
                      </div>
                    </div>
                    <a href="https://once-license.authgear.com/v1/stripe/checkout" target="_blank" className="once-button w-button">Checkout</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-default-inner once-container-bottom">
              <div className="w-layout-blockcontainer remember w-container">
                <h2 className="once-h2">Remember When Software Was Yours?</h2>
                <div className="once-subtitle once-purple">The SaaS subscription model works great for many products, but not for everything. <span className="once-highlight">Authgear ONCE</span>  is built for those who want to own their authentication infrastructure without recurring costs.</div>
                <div className="text-block-53">Why Developers choose Authgear ONCE</div>
                <div className="w-layout-grid once-grid">
                  <div className="remember-card"><img src="/images/once_remember-software-fees_1.svg" loading="lazy" alt="" />
                    <div className="remember-card-headlines">Buy ONCE, Own Forever</div>
                    <div className="text-block-54">Pay once and own it for life. No recurring fees means predictable costs for you and your clients</div>
                  </div>
                  <div className="remember-card"><img src="/images/once_remember-software-vendor_1.svg" loading="lazy" alt="" />
                    <div className="remember-card-headlines">Full data-ownership</div>
                    <div className="text-block-54">Self-host on your infrastructure and maintain full control of your clients&#x27; identity data. Reduce reliance on third-party providers</div>
                  </div>
                  <div className="remember-card"><img src="/images/once_remember-software-costs_1.svg" loading="lazy" alt="" />
                    <div className="remember-card-headlines">Flexible and powerful</div>
                    <div className="text-block-54">Deploy Authgear across different projects for all the authentication features you need</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-default-inner once-container-bottom once-container-top">
              <h2 className="once-h2"><span className="once-gradient">All-In-One</span> Identity Platform</h2>
              <div className="once-subtitle">Centralize your user identities, enhance security, and deliver seamless login experiences</div>
              <div className="w-layout-vflex flex-block-58">
                <div id="w-node-_2add4d7f-a071-9fa7-592d-d56710479f26-85a0aff6" className="w-layout-vflex high"><img src="/images/once_onetimepayment-sso_1.svg" loading="lazy" alt="" />
                  <h3 className="all-in-one-h3">Single Sign-On (SSO)</h3>
                  <div className="all-in-one-description">Enable users to access multiple applications with one set of credentials, simplifying the login experience.</div><img src="/images/once_onetimepayment-sso2x.webp" loading="lazy" alt="" />
                </div>
                <div id="w-node-_2add4d7f-a071-9fa7-592d-d56710479f2d-85a0aff6" className="w-layout-vflex high"><img src="/images/once_onetimepayment-passkeys_1.svg" loading="lazy" alt="" />
                  <h3 className="all-in-one-h3">Passwordless Authentication &amp; Passkeys</h3>
                  <div className="all-in-one-description">Enable modern authentication methods that improve security and user experience.</div><img src="/images/once_onetimepayment-passkeys2x.webp" loading="lazy" alt="" />
                </div>
                <div id="w-node-_2add4d7f-a071-9fa7-592d-d56710479f34-85a0aff6" className="w-layout-vflex high"><img src="/images/once_onetimepayment-2fa_1.svg" loading="lazy" alt="" />
                  <h3 className="all-in-one-h3">Two-Factor Authentication (2FA)</h3>
                  <div className="all-in-one-description">Add an extra layer of security with SMS, email, and authenticator app verification methods.</div><img src="/images/once_onetimepayment-2fa2x.webp" loading="lazy" sizes="(max-width: 1120px) 100vw, 1120px" srcSet="/images/once_onetimepayment-2fa2x-p-500.webp 500w, /images/once_onetimepayment-2fa2x-p-800.webp 800w, /images/once_onetimepayment-2fa2x-p-1080.webp 1080w, /images/once_onetimepayment-2fa2x.webp 1120w" alt="" />
                </div>
                <div id="w-node-_2add4d7f-a071-9fa7-592d-d56710479f3b-85a0aff6" className="w-layout-vflex high low">
                  <div className="w-layout-vflex"><img src="/images/once_onetimepayment-usermanagement_1.svg" loading="lazy" alt="" className="image-80" />
                    <h3 className="all-in-one-h3">Pre-built User Management Portal</h3>
                    <div className="all-in-one-description">Manage users, roles, and permissions with an intuitive dashboard that&#x27;s ready to use out of the box.</div>
                  </div><img src="/images/once_onetimepayment-usermanagement2x.webp" loading="lazy" alt="" className="_50img" />
                </div>
                <div id="w-node-_2add4d7f-a071-9fa7-592d-d56710479f43-85a0aff6" className="w-layout-vflex high low">
                  <div className="w-layout-vflex"><img src="/images/once_onetimepayment-security_1.svg" loading="lazy" alt="" className="image-80" />
                    <h3 className="all-in-one-h3">Advanced Security Measures</h3>
                    <div className="all-in-one-description">Protect your users with brute force protection, suspicious login detection, and more.</div>
                  </div><img src="/images/once_onetimepayment-security2x_1.webp" loading="lazy" alt="" className="_50img" />
                </div>
              </div>
            </div>
            <div className="container-default-inner once-container-bottom once-container-top once-container-60-gap">
              <div className="w-layout-blockcontainer once-inner-container w-container">
                <h2 className="once-h2">Build for Software Development <span className="once-gradient">Agencies</span></h2>
                <div className="w-layout-grid grid-16">
                  <div className="w-layout-blockcontainer small-teams-card w-container"><img src="/images/once_build-for-developer-costs.svg" loading="lazy" alt="" className="image-75" />
                    <div className="w-layout-blockcontainer w-container">
                      <div className="who-choose-title small-team">Eliminate Recurring Costs</div>
                      <div className="who-choose-des">Stop passing subscription fees to your clients or absorbing them yourself. With Authgear ONCE, there&#x27;s just one upfront cost.</div>
                    </div>
                  </div>
                  <div className="w-layout-blockcontainer small-teams-card w-container"><img src="/images/once_build-for-developer-project_1.svg" loading="lazy" alt="" className="image-75" />
                    <div className="w-layout-blockcontainer w-container">
                      <div className="who-choose-title small-team">Boost Development Productivity</div>
                      <div className="who-choose-des">Our pre-built components and user-friendly interface significantly reduce implementation time, allowing your team to focus on core business features.</div>
                    </div>
                  </div>
                  <div className="w-layout-blockcontainer small-teams-card w-container"><img src="/images/once_build-for-developer-experience.svg" loading="lazy" alt="" className="image-75" />
                    <div className="w-layout-blockcontainer w-container">
                      <div className="who-choose-title small-team">Customizable Authentication Experience</div>
                      <div className="who-choose-des">Tailor the login flow to match your clients&#x27; branding and specific requirements, creating a seamless user experience.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-default-inner once-container-bottom once-container-top once-container-60-gap">
              <div>
                <h2 className="once-h2">SDKs for <span className="once-gradient">Modern Frameworks</span></h2>
                <div className="once-subtitle">Authgear ONCE provides robust SDKs for popular modern frameworks, enabling seamless integration of authentication features into your applications:</div>
              </div>
              <div className="w-layout-blockcontainer once-inner-container w-container">
                <div className="w-layout-hflex flex-block-59">
                  <div className="w-layout-vflex flex-block-60">
                    <div className="who-choose-title no-margin">With just a few lines of code, implement powerful authentication features including:</div>
                    <div className="w-layout-vflex flex-block-61">
                      <div className="w-layout-hflex flex-block-62"><img src="/images/once_build-for-developer-check.svg" loading="lazy" alt="" />
                        <div className="who-choose-des">Social logins (Google, Facebook, Apple)</div>
                      </div>
                      <div className="w-layout-hflex flex-block-62"><img src="/images/once_build-for-developer-check.svg" loading="lazy" alt="" />
                        <div className="who-choose-des">Passwordless authentication</div>
                      </div>
                      <div className="w-layout-hflex flex-block-62"><img src="/images/once_build-for-developer-check.svg" loading="lazy" alt="" />
                        <div className="who-choose-des">Biometric login</div>
                      </div>
                      <div className="w-layout-hflex flex-block-62"><img src="/images/once_build-for-developer-check.svg" loading="lazy" alt="" />
                        <div className="who-choose-des">Multi-factor authentication</div>
                      </div>
                      <div className="w-layout-hflex flex-block-62"><img src="/images/once_build-for-developer-check.svg" loading="lazy" alt="" />
                        <div className="who-choose-des">Single sign-on</div>
                      </div>
                    </div>
                    <div className="once-subtitle left">Our SDKs are designed for developer productivity, with comprehensive documentation to ensure smooth integration across all your client projects.</div>
                    <div className="w-layout-hflex home-hero-cta-wrapper once-cta-wrapper">
                      <a href="https://docs.authgear.com/" target="_blank" className="button-primary home-hero new-home radius-16 once-special-button w-button">See docs</a>
                      <a href="https://docs.authgear.com/get-started/5-minute-guide" target="_blank" className="link-block _5-min w-inline-block"><img src="/images/Play---Iconly-Pro.svg" loading="lazy" alt="" />
                        <div className="text-block-52 _5-min-text">See 5-Minute Guide</div>
                      </a>
                    </div>
                  </div>
                  <div className="w-layout-hflex grid-14 gap-20">
                    <div className="w-layout-vflex flex-block-46">
                      <div className="w-layout-grid grid-15">
                        <div className="w-layout-blockcontainer system react w-container">
                          <div className="w-layout-blockcontainer system-inner w-container">
                            <div className="w-layout-blockcontainer system-bg react w-container"></div><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">React</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system vue w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-02-vue.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">Vue.js</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system angular w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-03-angular.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">Angular</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system react-native w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">React Native</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system flutter w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-06-flutter.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">Flutter</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system ios w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-07-ios.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">iOS (Swift)</div>
                          </div>
                        </div>
                        <div className="w-layout-blockcontainer system android w-container">
                          <div className="w-layout-blockcontainer system-inner inactive-system w-container">
                            <div className="w-layout-blockcontainer system-bg inactive-system w-container"></div><img src="/images/once_build-for-developer-lang-08-android.svg" loading="lazy" alt="" className="system-logo" />
                            <div className="system-name">Android (Kotlin/Java)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-blockcontainer code-outer w-container">
                      <div className="w-layout-blockcontainer code-inner w-container">
                        <div className="w-layout-blockcontainer code-div w-container">
                          <div className="w-layout-blockcontainer code-wrapper react react-code w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-javascript" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span style={{"color": "#dcc6e0"}}>import</span><span> authgear </span><span style={{"color": "#dcc6e0"}}>from</span><span> </span><span style={{"color": "#abe338"}}>&quot;@authgear/web&quot;</span><span>;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span><span></span><span style={{"color": "#dcc6e0"}}>const</span><span> login = </span><span style={{"color": "#dcc6e0"}}>async</span><span> () =&gt; &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span><span>	</span><span style={{"color": "#dcc6e0"}}>await</span><span> authgear.startAuthentication(&#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span><span>        </span><span className="hljs-attr">redirectURI</span><span>: </span><span style={{"color": "#abe338"}}>&quot;https://www.myapps.com/auth-redirect&quot;</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span>  &#125;)
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span>&#125;</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper vue w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-javascript" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span style={{"color": "#dcc6e0"}}>import</span><span> authgear </span><span style={{"color": "#dcc6e0"}}>from</span><span> </span><span style={{"color": "#abe338"}}>&quot;@authgear/web&quot;</span><span>;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span><span></span><span style={{"color": "#dcc6e0"}}>const</span><span> login = </span><span style={{"color": "#dcc6e0"}}>async</span><span> () =&gt; &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span><span>	</span><span style={{"color": "#dcc6e0"}}>await</span><span> authgear.startAuthentication(&#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span><span>        </span><span className="hljs-attr">redirectURI</span><span>: </span><span style={{"color": "#abe338"}}>&quot;https://www.myapps.com/auth-redirect&quot;</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span>  &#125;)
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span>&#125;</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper angular w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-javascript" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span style={{"color": "#dcc6e0"}}>import</span><span> authgear </span><span style={{"color": "#dcc6e0"}}>from</span><span> </span><span style={{"color": "#abe338"}}>&quot;@authgear/web&quot;</span><span>;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span><span>startLogin(): </span><span style={{"color": "#dcc6e0"}}>void</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span>  authgear.startAuthentication(&#123;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span><span>    </span><span className="hljs-attr">redirectURI</span><span>: </span><span style={{"color": "#abe338"}}>&#x27;http://localhost:4000/auth-redirect&#x27;</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span>  &#125;)
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span> &#125;</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper react-native w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-javascript" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span style={{"color": "#dcc6e0"}}>import</span><span> authgear </span><span style={{"color": "#dcc6e0"}}>from</span><span> </span><span style={{"color": "#abe338"}}>&quot;@authgear/react-native&quot;</span><span>;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span><span></span><span style={{"color": "#dcc6e0"}}>const</span><span> authenticate = useCallback(</span><span style={{"color": "#dcc6e0"}}>async</span><span> () =&gt; &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span><span>  </span><span style={{"color": "#dcc6e0"}}>try</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span>    authgear.authenticate(&#123;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span><span>      </span><span className="hljs-attr">redirectURI</span><span>: </span><span style={{"color": "#abe338"}}>&#x27;com.authgear.example.rn://host/path&#x27;</span><span>,
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span>    &#125;);
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>8</span><span>  &#125; </span><span style={{"color": "#dcc6e0"}}>catch</span><span> (error) &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>9</span><span>    </span><span style={{"color": "#d4d0ab"}}>// Login failed</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>10</span>  &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>11</span>&#125;, []);</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper flutter w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-javascript" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span style={{"color": "#dcc6e0"}}>import</span><span> </span><span style={{"color": "#abe338"}}>&#x27;package:flutter_authgear/flutter_authgear.dart&#x27;</span><span>;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span>late Authgear _authgear;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span>UserInfo? _userInfo;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span>
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span><span>Future&lt;</span><span style={{"color": "#dcc6e0"}}>void</span><span>&gt; _onPressedAuthenticate() </span><span style={{"color": "#dcc6e0"}}>async</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span><span>  </span><span style={{"color": "#dcc6e0"}}>try</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>8</span><span>    final userInfo = </span><span style={{"color": "#dcc6e0"}}>await</span><span> _authgear.authenticate(redirectURI: </span><span style={{"color": "#abe338"}}>&quot;com.example.authgeardemo.flutter://host/path&quot;</span><span>);
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>9</span>    setState(() &#123;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>10</span>      _userInfo = userInfo;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>11</span>    &#125;);
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>12</span><span>  &#125; </span><span style={{"color": "#dcc6e0"}}>catch</span><span> (e) &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>13</span><span>    </span><span style={{"color": "#d4d0ab"}}>// Login failed</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>14</span><span>  &#125; </span><span style={{"color": "#dcc6e0"}}>finally</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>15</span><span>    </span><span style={{"color": "#d4d0ab"}}>// Finally</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>16</span>  &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>17</span>&#125;</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper ios w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-swift" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span>authgear.authenticate(redirectURI: </span><span style={{"color": "#abe338"}}>&quot;com.example.authgear://host/path&quot;</span><span>, handler: &#123; result </span><span style={{"color": "#dcc6e0"}}>in</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span><span>  </span><span style={{"color": "#dcc6e0"}}>switch</span><span> result &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span><span>    </span><span style={{"color": "#dcc6e0"}}>case</span><span> </span><span style={{"color": "#dcc6e0"}}>let</span><span> .success(userInfo):
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span><span>      </span><span style={{"color": "#d4d0ab"}}>// login successfully</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span><span>      loginState </span><span className="hljs-operator">=</span><span> authgear.sessionState
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span><span>      userId </span><span className="hljs-operator">=</span><span> userInfo.sub
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span><span>    </span><span style={{"color": "#dcc6e0"}}>case</span><span> </span><span style={{"color": "#dcc6e0"}}>let</span><span> .failure(error):
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>8</span><span>      </span><span style={{"color": "#dcc6e0"}}>if</span><span> </span><span style={{"color": "#dcc6e0"}}>let</span><span> authgearError </span><span className="hljs-operator">=</span><span> error </span><span style={{"color": "#dcc6e0"}}>as?</span><span> </span><span style={{"color": "#f5ab35"}}>AuthgearError</span><span>, </span><span style={{"color": "#dcc6e0"}}>case</span><span> .cancel </span><span className="hljs-operator">=</span><span> authgearError &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>9</span><span>        </span><span style={{"color": "#d4d0ab"}}>// user cancel</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>10</span><span>      &#125; </span><span style={{"color": "#dcc6e0"}}>else</span><span> &#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>11</span><span>        </span><span style={{"color": "#d4d0ab"}}>// Something went wrong</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>12</span>      &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>13</span>    &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>14</span>  &#125;)
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>15</span>&#125;</code></pre>
                          </div>
                          <div className="w-layout-blockcontainer code-wrapper android w-container">
                            <pre contentEditable="false" className="code w-code-block" style={{"display": "block", "overflowX": "auto", "background": "#2b2b2b", "color": "#f8f8f2", "padding": "0.5em"}}><code className="language-java" style={{"whiteSpace": "pre"}}><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>1</span><span className="hljs-function">fun </span><span className="hljs-function" style={{"color": "#00e0e0"}}>startLogin</span><span className="hljs-function" style={{"color": "#f5ab35"}}>()</span><span className="hljs-function"> </span><span>&#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>2</span><span>  val options = AuthenticateOptions(</span><span style={{"color": "#abe338"}}>&quot;com.example.authgear://host/path&quot;</span><span>)
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>3</span>  authgear.authenticate(options, object : OnAuthenticateListener &#123;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>4</span><span>    </span><span className="hljs-function">override fun </span><span className="hljs-function" style={{"color": "#00e0e0"}}>onAuthenticated</span><span className="hljs-function" style={{"color": "#f5ab35"}}>(userInfo: UserInfo)</span><span className="hljs-function"> </span><span>&#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>5</span><span>      </span><span style={{"color": "#d4d0ab"}}>// Login successfully</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>6</span>    &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>7</span><span>    </span><span className="hljs-function">override fun </span><span className="hljs-function" style={{"color": "#00e0e0"}}>onAuthenticationFailed</span><span className="hljs-function" style={{"color": "#f5ab35"}}>(throwable: Throwable)</span><span className="hljs-function"> </span><span>&#123;
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>8</span><span>      </span><span style={{"color": "#d4d0ab"}}>// Login failed</span><span>
      </span><span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>9</span>    &#125;
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>10</span>  &#125;)
      <span className="comment linenumber react-syntax-highlighter-line-number" style={{"display": "inline-block", "minWidth": "2.25em", "paddingRight": "1em", "textAlign": "right", "userSelect": "none"}}>11</span>&#125;</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-hflex flex-block-47">
                  <div className="w-layout-blockcontainer left-shadow right w-container"></div>
                  <div className="w-layout-blockcontainer left-shadow w-container"></div>
                  <div className="w-layout-hflex logo-loop _1 new-version"><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-02-vue.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-03-angular.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-06-flutter.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-07-ios.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-08-android.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-02-vue.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-03-angular.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-06-flutter.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-07-ios.svg" loading="lazy" alt="" className="image-76" /></div>
                  <div className="w-layout-hflex logo-loop _2 new-version"><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-02-vue.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-03-angular.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-06-flutter.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-07-ios.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-08-android.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-01-react.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-02-vue.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-03-angular.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-06-flutter.svg" loading="lazy" alt="" className="image-76" /><img src="/images/once_build-for-developer-lang-07-ios.svg" loading="lazy" alt="" className="image-76" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="once-last-container">
            <div className="container-default once">
              <section id="system-installation" className="w-layout-hflex flex-block-63 tbc">
                <div className="div-block-21 tbc">
                  <h2 className="once-h2 left-h2 tbc">System Requirements &amp; Installation</h2>
                  <div className="once-subtitle left tbc">After checkout, you’ll receive an email with your license key and an installation command. All you need is to connect to your server and run a command. It runs on your own hardware, in the cloud (AWS, GCP, Azure,...), or any hosting provider like Vultr, etc.</div>
                </div>
                <div style={{"paddingTop": "56.17021276595745%"}} className="w-embed-youtubevideo"><iframe src="https://www.youtube.com/embed/VpSZYHJu7DM?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0" frameBorder={0} style={{"position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%", "pointerEvents": "auto"}} allow="autoplay; encrypted-media" allowFullScreen title="Installing Authgear ONCE in 7 minutes (Like Auth0, But Without the Subscription)"></iframe></div>
                <div className="w-layout-blockcontainer container-1455 w-container">
                  <div className="w-layout-vflex flex-block-53">
                    <div className="w-layout-vflex flex-block-54">
                      <div className="text-block-57">Requirement</div>
                      <div className="text-block-57">Minimum</div>
                      <div className="text-block-57">Recommended</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-cpu.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">CPU</div>
                      </div>
                      <div className="text-block-57">1 core</div>
                      <div className="text-block-57">2 cores</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-ram_1.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">RAM</div>
                      </div>
                      <div className="text-block-57">1 GB</div>
                      <div className="text-block-57">2 GB</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-storage.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">Storage</div>
                      </div>
                      <div className="text-block-57">10 GB</div>
                      <div className="text-block-57">20 GB</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-database.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">Database</div>
                      </div>
                      <div className="text-block-57">PostgreSQL 12+</div>
                      <div className="text-block-57">PostgreSQL 14+</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex container-1455 mobile-table">
                  <div className="w-layout-vflex flex-block-53">
                    <div className="w-layout-vflex flex-block-54">
                      <div className="who-choose-des">Requirement</div>
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-cpu.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">CPU</div>
                      </div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Minimum</div>
                      </div>
                      <div className="who-choose-des">1 core</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Recommended</div>
                      </div>
                      <div className="who-choose-des">2 core</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex flex-block-53">
                    <div className="w-layout-vflex flex-block-54">
                      <div className="who-choose-des">Requirement</div>
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-ram_1.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">RAM</div>
                      </div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Minimum</div>
                      </div>
                      <div className="who-choose-des">1 GB</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Recommended</div>
                      </div>
                      <div className="who-choose-des">2 GB</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex flex-block-53">
                    <div className="w-layout-vflex flex-block-54">
                      <div className="who-choose-des">Requirement</div>
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-storage.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">Storage</div>
                      </div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Minimum</div>
                      </div>
                      <div className="who-choose-des">10 GB</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Recommended</div>
                      </div>
                      <div className="who-choose-des">20 GB</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex flex-block-53">
                    <div className="w-layout-vflex flex-block-54">
                      <div className="who-choose-des">Requirement</div>
                      <div className="w-layout-hflex flex-block-52 no-margin"><img src="/images/once_requirement-database.svg" loading="lazy" alt="" className="image-78" />
                        <div className="who-choose-des">Database</div>
                      </div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Minimum</div>
                      </div>
                      <div className="who-choose-des">PostgreSQL 12+</div>
                    </div>
                    <div className="w-layout-blockcontainer container-1456 w-container"></div>
                    <div className="w-layout-vflex flex-block-54">
                      <div className="w-layout-hflex flex-block-52 no-margin">
                        <div className="who-choose-des">Recommended</div>
                      </div>
                      <div className="who-choose-des">PostgreSQL 14+</div>
                    </div>
                  </div>
                </div>
              </section>
              <h2 className="once-h2">Frequently Asked Questions</h2>
              <div className="faq2_component-2 _1060">
                <div className="faq2_accordion-2">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">Can I try Authgear for free?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">Yes! You can explore Authgear using the Free Tier of Authgear Cloud. While it includes limitations on application and project member counts and retains Authgear branding, all core features are available for testing.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq2_accordion-2 margin-top">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">Will I receive software updates?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">2 years of continuous updates are included. It can be easily updated by a command, Authgear ONCE will ping our server to see if there is any updates and you can decide when to download and install them.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq2_accordion-2 margin-top">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">What kind of support is available?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">Discord support are provided. We are also happy to help with the basics over email: <a href="mailto:once@authgear.com" className="link-6">once@authgear.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq2_accordion-2 margin-top">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">How do I migrate my current authentication system to Authgear ONCE?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">We offer an Import API for you to import users from an existing authentication system to Authgear ONCE. You can easily migrate from Auth0, Okta, PingIdentity. See our <a href="https://docs.authgear.com/how-to-guide/migration" target="_blank" className="link-7">docs</a> for more information.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq2_accordion-2 margin-top">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">How difficult is implementation?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">With our comprehensive SDKs and documentation, most developers can implement Authgear ONCE in under 10 minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq2_accordion-2 margin-top">
                  <div className="faq2_question-2 first">
                    <div className="div-block-18"><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="faq2_icon-2" /><img loading="lazy" src="/images/Minus-4---Iconly-Pro.svg" alt="" className="default-icon" /></div>
                    <div className="faq-accordion-question referral-faq-q">How does Authgear ONCE ensure GDPR compliance?</div>
                  </div>
                  <div style={{"height": "0px"}} className="faq2_answer">
                    <div className="margin-bottom">
                      <div className="max-width-large once-faq">
                        <p className="referral-faq-a-2">With full data ownership through self-hosting, you maintain complete control over where and how customer identity data is stored, processed, and protected, making GDPR compliance straightforward.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="waitlist">
                <h2 className="once-h2">Get Started Today</h2>
                <div className="once-subtitle">Be among the first to experience Authgear ONCE and transform how you implement authentication for your clients.</div>
                <a href="https://once-license.authgear.com/v1/stripe/checkout" target="_blank" className="once-button bottom-inverse w-button">Checkout</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-layout-vflex section-14"><img src="/images/AuthgearONCE_logo_small.svg" loading="lazy" alt="" className="image-84" />
          <div className="oce-price-text bottom">$ <span className="price-number">299</span> /one-time</div>
          <a href="https://once-license.authgear.com/v1/stripe/checkout" target="_blank" className="once-button inverse w-button">Checkout</a>
        </div>


        {/* Apollo */}








        {/*  Autofill from Authgear App  */}

        {/*  Intl-tel-input  */}


      </div>

      <PageScripts scripts={pageScripts} />
    </>
  );
}
