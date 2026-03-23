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

export default async function WhyAuthgearPage({ locale: _locale }: Props) {
  return (
    <>
      <div className="page-wrapper">
          <div className="section why-authgear-hero">
            <div className="container-full">
              <div className="middle-hero-wrapper">
                <div className="why-authgear-hero-inner">
                  <div className="why-authgear hero-title">Why Authgear?</div>
                  <h1 className="why-authgear-heading">Streamline Security, Empower Users: <br />Build Faster with Authgear</h1>
                  <p className="middle-hero-paragraph">In today's digital world, robust security shouldn't come at the expense of user experience or affordability. Authgear bridges the gap, offering a powerful and user-friendly CIAM solution that empowers both you and your users.</p>
                  <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-primary button-white why-authgear w-button">See it for yourself</a>
                </div>
              </div>
            </div>
            <div className="container-default flex-center w-container">
              <div className="images-wrapper home-hero">
                <div className="image-wrapper home-hero">
                  <div className="home-lottie" data-animation-type="lottie" data-src="/documents/data.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="7.74107409244067" data-duration="0"></div><img src="/images/hero-mobile.png" alt="" className="image home-hero sm" />
                </div>
              </div>
              <div className="top-content flex-column text-center">
                <h2 className="text-center mg-bottom-16px top-content-title">Why Choose Pre-Built Auth Over DIY?Avoid These Security Headaches.</h2>
                <div className="top-content-description">Building your own authentication system might seem like a cost-saving measure, but the hidden costs can be significant.</div>
              </div>
              <div className="w-layout-grid companies-grid home">
                <div id="w-node-_557a80db-5450-5d40-dc2c-521df086ea8a-5ac419a9" className="animation-div">
                  <a href="https://www.hkpc.org/en" target="_blank" className="image-wrapper company bg-white hero-company home w-inline-block"><img src="/images/compare-customer-logo-buppa2x.webp" alt="" className="image company hero-company" /></a>
                </div>
                <div id="w-node-bd229a8d-95ba-69b6-983b-3ba587133b3e-5ac419a9" className="animation-div">
                  <a href="https://www.cimic.com.au/" target="_blank" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/authgear_logos_CIMIC.webp" alt="" width="Auto" className="image company hero-company" /></a>
                </div>
                <div id="w-node-_5ca8e90d-f6bb-b84c-2142-adad1ff920fb-5ac419a9" className="animation-div">
                  <a href="https://www.facebook.com/REESforGamers/" target="_blank" className="image-wrapper company bg-white hero-company home w-inline-block"><img src="/images/compare-customer-logo-HKL2x.webp" alt="" className="image company" /></a>
                </div>
                <div id="w-node-_74f39cdc-635c-551a-0dad-842d2122c059-5ac419a9" className="animation-div">
                  <a href="https://formx.ai/" target="_blank" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/compare-customer-logo-hkpc2x.webp" alt="" className="image company" /></a>
                </div>
                <div id="w-node-e8492ffb-327d-47ae-2322-f1f7becbca8e-5ac419a9" className="animation-div">
                  <a href="#" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/authgear_logos_k11.webp" alt="" className="image company home" /></a>
                </div>
                <div id="w-node-c348f240-915a-8666-332a-502ea446ad05-5ac419a9" className="animation-div">
                  <a href="#" className="image-wrapper company hero-company bg-white home w-inline-block"><img src="/images/compare-customer-logo-mtr2x.webp" alt="" className="image company" /></a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default w-container">
              <div className="top-text">
                <h2 className="text-center solution-h2 mb-16">Achieve More, Together.<br />Secure &amp; Delight Your Users with Authgear.</h2>
                <p className="text-center paragraph-large solution-subheading">Authgear delivers a powerful combination of user empowerment, robust security, and effortless implementation. Experience the difference and elevate your business.</p>
              </div>
              <div>
                <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="tabs-2 w-tabs">
                  <div className="tabs-menu-container w-tab-menu">
                    <a data-w-tab="Tab 1" className="home-tabs-menu w-inline-block w-tab-link w--current">
                      <div className="home-tabs-menu-title-wrap">
                        <div className="home-tabs-menu-title">Empower Your Users</div>
                      </div>
                    </a>
                    <a data-w-tab="Tab 2" className="home-tabs-menu w-inline-block w-tab-link">
                      <div className="home-tabs-menu-title-wrap">
                        <div className="home-tabs-menu-title">Secure Your Business</div>
                      </div>
                    </a>
                    <a data-w-tab="Tab 3" className="home-tabs-menu w-inline-block w-tab-link">
                      <div className="home-tabs-menu-title-wrap">
                        <div className="home-tabs-menu-title">Make it Simple</div>
                      </div>
                    </a>
                  </div>
                  <div className="w-tab-content">
                    <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
                      <div className="_2-block-flex">
                        <div className="_2-block-flex-content">
                          <div className="_2-block-flex-content-text-wrap">
                            <div className="_2-block-flex-content-h3">
                              <h3 className="why-authgear-tabs h3">Empower Your Users</h3>
                              <div>Offer convenient logins and enhanced security, fostering trust and engagement.</div>
                            </div>
                            <ul role="list" className="_2-block-flex-content-list">
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">Seamless Logins</div>
                                <div className="why-authgear-list-item-paragraph">Go beyond passwords! Authgear offers a variety of login options, including biometrics, for a smooth and convenient user experience. This reduces login friction and keeps users engaged.</div>
                              </li>
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">Enhanced Security &amp; Trust</div>
                                <div className="why-authgear-list-item-paragraph">Empower your users with control over their login experience. Authgear's multi-factor authentication and secure password management features provide an extra layer of protection, fostering trust and confidence.</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="_2-block-flex-image"><img loading="eager" src="/images/why-authgear-secure_empower-your-users2x.webp" alt="" className="image-rounded" /></div>
                      </div>
                    </div>
                    <div data-w-tab="Tab 2" className="w-tab-pane">
                      <div className="_2-block-flex">
                        <div className="_2-block-flex-content">
                          <div className="_2-block-flex-content-text-wrap">
                            <div className="_2-block-flex-content-h3">
                              <h3 className="why-authgear-tabs h3"><strong>Secure Your Business</strong></h3>
                              <div>Combat evolving threats with robust security features and simplify user management.</div>
                            </div>
                            <ul role="list" className="_2-block-flex-content-list">
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">Combat Evolving Threats</div>
                                <div className="why-authgear-list-item-paragraph">Stay ahead of cybercriminals with Authgear's robust security features. Our solution protects your user data and safeguards your business from unauthorized access and data breaches.</div>
                              </li>
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">Simplified User Management &amp; Access Control</div>
                                <div className="why-authgear-list-item-paragraph">Manage complex user groups and access levels efficiently. Authgear streamlines user administration, saving you time and resources.</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="_2-block-flex-image"><img sizes="100vw" srcSet="/images/why-authgear-secure_secure-your-business2x-p-500.webp 500w, /images/why-authgear-secure_secure-your-business2x-p-800.webp 800w, /images/why-authgear-secure_secure-your-business2x-p-1080.webp 1080w, /images/why-authgear-secure_secure-your-business2x.webp 1200w" alt="" src="/images/why-authgear-secure_secure-your-business2x.webp" loading="eager" className="image-rounded" /></div>
                      </div>
                    </div>
                    <div data-w-tab="Tab 3" className="w-tab-pane">
                      <div className="_2-block-flex">
                        <div className="_2-block-flex-content">
                          <div className="_2-block-flex-content-text-wrap">
                            <div className="_2-block-flex-content-h3">
                              <h3 className="why-authgear-tabs h3">Make it Simple</h3>
                              <div>Integrate secure authentication with minimal coding and benefit from a scalable, adaptable solution.</div>
                            </div>
                            <ul role="list" className="_2-block-flex-content-list">
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">No-Code Integration</div>
                                <div className="why-authgear-list-item-paragraph">Forget complex coding! Authgear's user-friendly interface allows you to integrate secure authentication features with minimal development effort. Focus on building amazing features, not login flows.</div>
                              </li>
                              <li className="_2-block-flex-content-list-item">
                                <div className="why-authgear-list-item-title">Scalable &amp; Adaptable</div>
                                <div className="why-authgear-list-item-paragraph">Authgear grows with your business. Our solution scales effortlessly to meet your evolving needs and integrates seamlessly with your existing infrastructure, ensuring a smooth and efficient implementation.</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="_2-block-flex-image"><img sizes="100vw" srcSet="/images/why-authgear-srcure_make-it-simple2x-p-500.webp 500w, /images/why-authgear-srcure_make-it-simple2x-p-800.webp 800w, /images/why-authgear-srcure_make-it-simple2x-p-1080.webp 1080w, /images/why-authgear-srcure_make-it-simple2x.webp 1200w" alt="" src="/images/why-authgear-srcure_make-it-simple2x.webp" loading="eager" className="image-rounded" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <h2 className="text-center mg-bottom-16px top-content-title">Why Choose Pre-Built Auth Over DIY?Avoid These Security Headaches.</h2>
                  <div className="top-content-description">Building your own authentication system might seem like a cost-saving measure, but the hidden costs can be significant.</div>
                </div>
                <div data-current="Tab 5" data-easing="ease" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image w-tabs">
                  <div className="hover-change tabs w-tab-menu">
                    <a data-w-tab="Tab 1" className="hover-change-content w-inline-block w-tab-link">
                      <div className="hover-change-title">Security Vulnerabilities</div>
                      <div style={{"height": "0px"}} className="hover-change-description">Our low-code solution streamlines the authentication process, allowing you to integrate robust security features with minimal development effort.</div>
                    </a>
                    <a data-w-tab="Tab 2" className="hover-change-content w-inline-block w-tab-link">
                      <div className="hover-change-title">Increased Development Costs</div>
                      <div style={{"height": "0px"}} className="hover-change-description">Offer a variety of login options, including modern methods like biometrics, to create a seamless and convenient experience for your users. This fosters trust and engagement, driving user growth.</div>
                    </a>
                    <a data-w-tab="Tab 3" className="hover-change-content w-inline-block w-tab-link">
                      <div className="hover-change-title">Delayed Time to Market</div>
                      <div style={{"height": "0px"}} className="hover-change-description">Authgear caters to a wide range of business needs, from B2C customer accounts to complex B2B user hierarchies. Customize Authgear to fit your specific requirements and security needs. Scale effortlessly as your business grows.</div>
                    </a>
                    <a data-w-tab="Tab 4" className="hover-change-content w-inline-block w-tab-link">
                      <div className="hover-change-title">Limited Features and Scalability</div>
                      <div style={{"height": "0px"}} className="hover-change-description">Customize features to meet your specific requirements and security standards. Plus, the solution scales effortlessly as your business grows, ensuring continued security without needing to overhaul your system.</div>
                    </a>
                    <a data-w-tab="Tab 5" className="hover-change-content w-inline-block w-tab-link w--current">
                      <div className="hover-change-title">Lack of Expertise</div>
                      <div style={{"height": "0px"}} className="hover-change-description">Customize features to meet your specific requirements and security standards. Plus, the solution scales effortlessly as your business grows, ensuring continued security without needing to overhaul your system.</div>
                    </a>
                  </div>
                  <div className="_2-block-flex-image tabs w-tab-content">
                    <div data-w-tab="Tab 1" className="w-tab-pane"><img width="600" sizes="100vw" alt="" src="/images/why-authgear-whyprebuilt_01-security2x.webp" loading="eager" srcSet="/images/why-authgear-whyprebuilt_01-security2x-p-500.webp 500w, /images/why-authgear-whyprebuilt_01-security2x-p-800.webp 800w, /images/why-authgear-whyprebuilt_01-security2x-p-1080.webp 1080w, /images/why-authgear-whyprebuilt_01-security2x.webp 1200w" className="image-rounded" /></div>
                    <div data-w-tab="Tab 2" className="w-tab-pane"><img width="600" sizes="100vw" alt="" src="/images/why-authgear-whyprebuilt_02-increase2x.webp" loading="eager" srcSet="/images/why-authgear-whyprebuilt_02-increase2x-p-500.webp 500w, /images/why-authgear-whyprebuilt_02-increase2x-p-800.webp 800w, /images/why-authgear-whyprebuilt_02-increase2x-p-1080.webp 1080w, /images/why-authgear-whyprebuilt_02-increase2x.webp 1200w" className="image-rounded" /></div>
                    <div data-w-tab="Tab 3" className="w-tab-pane"><img width="1200" sizes="100vw" alt="" src="/images/why-authgear-whyprebuilt_03-delayed2x.webp" loading="eager" srcSet="/images/why-authgear-whyprebuilt_03-delayed2x-p-500.webp 500w, /images/why-authgear-whyprebuilt_03-delayed2x-p-800.webp 800w, /images/why-authgear-whyprebuilt_03-delayed2x-p-1080.webp 1080w, /images/why-authgear-whyprebuilt_03-delayed2x.webp 1200w" className="image-rounded" /></div>
                    <div data-w-tab="Tab 4" className="w-tab-pane"><img width="1200" sizes="100vw" alt="" src="/images/why-authgear-whyprebuilt_04-limited2x.webp" loading="eager" srcSet="/images/why-authgear-whyprebuilt_04-limited2x-p-500.webp 500w, /images/why-authgear-whyprebuilt_04-limited2x-p-800.webp 800w, /images/why-authgear-whyprebuilt_04-limited2x-p-1080.webp 1080w, /images/why-authgear-whyprebuilt_04-limited2x.webp 1200w" className="image-rounded" /></div>
                    <div data-w-tab="Tab 5" className="w-tab-pane w--tab-active"><img width="1200" sizes="(max-width: 1200px) 100vw, 1200px" alt="" src="/images/why-authgear-whyprebuilt_05-lack2x.webp" loading="eager" srcSet="/images/why-authgear-whyprebuilt_05-lack2x-p-500.webp 500w, /images/why-authgear-whyprebuilt_05-lack2x-p-800.webp 800w, /images/why-authgear-whyprebuilt_05-lack2x-p-1080.webp 1080w, /images/why-authgear-whyprebuilt_05-lack2x.webp 1200w" className="image-rounded" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container-default w-container">
                <div className="top-text">
                  <h2 className="text-center solution-h2 mb-16">Security Built for You. Support That Cares.<br />Start Your Journey with Authgear.</h2>
                  <p className="text-center paragraph-large solution-subheading">We don't just offer secure CIAM solutions, we care about your success.</p>
                </div>
                <div className="solution-flex-container gap-40 reverse-order">
                  <div className="solution-image-block"><img src="/images/why-authgear-startjourney_adaptable-security2x.webp" loading="lazy" alt="" /></div>
                  <div className="solution-text-block line-height-40">
                    <h3>Adaptable Security</h3>
                    <p className="mb-32">Our solution seamlessly integrates with your existing environment, no matter your setup.</p>
                    <a href="/schedule-demo" className="button-primary new-rounded w-button">Talk to us</a>
                  </div>
                </div>
                <div className="solution-flex-container gap-40">
                  <div className="solution-image-block"><img src="/images/why-authgear-startjourney_expert-guidance2x.webp" loading="lazy" alt="" className="image-rounded" /></div>
                  <div className="solution-text-block line-height-40">
                    <h3>Expert Guidance</h3>
                    <p className="mb-32">Our dedicated support team is with you every step of the way, ensuring a smooth deployment and ongoing success.</p>
                    <a href="/schedule-demo" className="button-primary new-rounded w-button">Talk to us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <h2 className="text-center mg-bottom-16px top-content-title">Still Unsure if You Need Authgear? Let's Talk!</h2>
                  <div className="top-content-description">The world of authentication can be complex, but you don't have to navigate it alone. <br />Whether you're unsure if you need an authentication solution at all, or simply overwhelmed by the options available, our team of experts is here to help!</div>
                </div>
                <div className="w-layout-grid feature-grid-3x1 home-cards-grid-wrap">
                  <div className="home-card hover-to-white">
                    <div className="home-card-wrap home-card-content">
                      <div className="home-card-image hover-to-white">
                        <div className="home-card-svg hover-to-white w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0185 42.0158C13.5654 42.7374 13.3137 43.5933 13.3137 44.4827V51.2961C13.3137 51.7828 13.7164 52.1856 14.2031 52.1856C14.6898 52.1856 15.0925 51.7828 15.0925 51.2961V44.4827C15.0925 43.2744 15.8645 42.1668 17.0057 41.7473L22.7451 39.6663L25.1449 43.2576C25.4469 43.7107 25.9336 44.0128 26.4874 44.0632C26.5545 44.0632 26.6049 44.0632 26.672 44.0632C27.1587 44.0632 27.6118 43.8786 27.9642 43.5261L29.4242 42.0661V51.2961C29.4242 51.7828 29.827 52.1856 30.3137 52.1856C30.8003 52.1856 31.2031 51.7828 31.2031 51.2961V42.0661L32.6631 43.5261C33.0155 43.8786 33.4686 44.0632 33.9553 44.0632C34.0224 44.0632 34.0728 44.0632 34.1399 44.0632C34.6937 44.0128 35.1804 43.7107 35.4825 43.2576L37.8823 39.6663L43.6217 41.7473C44.7628 42.1668 45.5348 43.2576 45.5348 44.4827V51.2961C45.5348 51.7828 45.9375 52.1856 46.4242 52.1856C46.9109 52.1856 47.3137 51.7828 47.3137 51.2961V44.4827C47.3137 43.8786 47.1962 43.2912 46.978 42.7374C46.7599 42.2171 46.4578 41.6633 46.0382 41.2774C45.8872 41.1431 45.7194 41.0424 45.5516 40.9249C44.8635 40.4718 44.1587 40.0355 43.3699 39.767C42.9 39.616 42.4469 39.4314 41.977 39.2635L39.1241 38.2231C39.0067 38.1895 38.906 38.1392 38.7885 38.1056C38.8053 37.8539 38.7214 37.6189 38.5535 37.4343L36.9089 35.7058V32.8025C37.0767 32.6515 37.2613 32.5173 37.4292 32.3494C39.5101 30.4027 40.7016 27.6505 40.7016 24.7976V22.4817C41.3225 21.1224 41.6414 19.6624 41.6414 18.1688V8.68704C41.6414 8.20037 41.2386 7.79761 40.752 7.79761H27.4943C22.7954 7.79761 19.0027 11.5903 19.0027 16.2557V18.152C19.0027 19.6456 19.3216 21.0888 19.9425 22.4649V24.462C19.9425 27.768 21.4193 30.7552 23.7352 32.7186V35.689L22.0906 37.4175C21.906 37.6021 21.8388 37.8539 21.8556 38.0888L16.4015 40.0691C15.9988 40.2201 15.6463 40.4047 15.3107 40.6397C14.6898 41.0928 14.0353 41.9822 14.0353 41.9822L14.0185 42.0158ZM21.7214 24.462V22.2635C21.7214 22.1293 21.6878 21.995 21.6375 21.8776C21.0669 20.7028 20.7816 19.4442 20.7816 18.152V16.2557C20.7816 12.5636 23.7855 9.5597 27.4775 9.5597H39.8457V18.152C39.8457 19.4442 39.5605 20.6861 38.9899 21.8776C38.9395 21.995 38.906 22.1293 38.906 22.2635V24.7808C38.906 27.1806 37.9494 29.3958 36.1873 31.0404C35.9691 31.2418 35.7342 31.4432 35.4992 31.611C33.8546 32.8529 31.8576 33.457 29.7599 33.3228C25.2623 33.0375 21.7549 29.1273 21.7549 24.4284L21.7214 24.462ZM26.7056 42.2843C26.7056 42.2843 26.6888 42.3011 26.6552 42.3011C26.6217 42.3011 26.6217 42.2843 26.6049 42.2675L23.8527 38.1392L24.7421 37.2162L28.9208 40.0691L26.7056 42.2843ZM30.2969 38.8608L25.4973 35.5883V33.9269C26.7391 34.5982 28.132 35.0177 29.6088 35.1184C29.8438 35.1184 30.0787 35.1352 30.3137 35.1352C32.0086 35.1352 33.6365 34.7325 35.0965 33.9605V35.5715L30.2969 38.844V38.8608ZM33.9889 42.2675C33.9889 42.2675 33.9889 42.2843 33.9385 42.3011C33.905 42.3011 33.8882 42.3011 33.8882 42.2843L31.673 40.0691L35.8517 37.2162L36.7411 38.1392L33.9889 42.2675Z" fill="currentColor"></path>
                            <path d="M37.5466 18.4708C34.1903 15.1145 27.1922 15.769 24.3226 16.1885C23.4163 16.3228 22.7618 17.078 22.7618 18.001V20.0483C22.7618 20.535 23.1646 20.9378 23.6513 20.9378C24.138 20.9378 24.5407 20.535 24.5407 20.0483V18.001C24.5407 18.001 24.5575 17.9506 24.5911 17.9338C25.7322 17.766 27.9978 17.4975 30.3472 17.6485C33.1162 17.8331 35.1133 18.5212 36.288 19.7127C36.6404 20.0651 37.1942 20.0651 37.5466 19.7127C37.8991 19.3603 37.8991 18.8065 37.5466 18.4541V18.4708Z" fill="currentColor"></path>
                            <path d="M19.8754 46.6309C19.3887 46.6309 18.9859 47.0336 18.9859 47.5203V51.313C18.9859 51.7997 19.3887 52.2024 19.8754 52.2024C20.362 52.2024 20.7648 51.7997 20.7648 51.313V47.5203C20.7648 47.0336 20.362 46.6309 19.8754 46.6309Z" fill="currentColor"></path>
                            <path d="M40.7184 46.6309C40.2317 46.6309 39.8289 47.0336 39.8289 47.5203V51.313C39.8289 51.7997 40.2317 52.2024 40.7184 52.2024C41.205 52.2024 41.6078 51.7997 41.6078 51.313V47.5203C41.6078 47.0336 41.205 46.6309 40.7184 46.6309Z" fill="currentColor"></path>
                          </svg></div>
                      </div>
                      <div className="home-card-title hover-to-white">
                        <div className="text-block-29">Free Consultation</div>
                      </div>
                      <div className="home-card-description">
                        <div className="home-card-description-text hover-to-white">Schedule a no-obligation call with our team to discuss your specific needs and security challenges.</div>
                      </div>
                    </div>
                  </div>
                  <div className="home-card hover-to-white">
                    <div className="home-card-wrap home-card-content">
                      <div className="home-card-image hover-to-white">
                        <div className="home-card-svg hover-to-white w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_403_32)">
                              <path d="M52.9451 27.8171C50.8985 26.8022 47.0882 26.7855 46.9218 26.7855C46.4393 26.7855 46.04 27.1849 46.04 27.6674C46.04 28.1499 46.4393 28.5493 46.9218 28.5493C47.9035 28.5493 50.7821 28.699 52.1631 29.3978C52.2962 29.4644 52.4293 29.4977 52.5624 29.4977C52.8786 29.4977 53.1947 29.3146 53.3445 29.0151C53.5608 28.5825 53.3778 28.0501 52.9451 27.8338V27.8171Z" fill="currentColor"></path>
                              <path d="M57.3211 40.3128L53.6938 39.2812C53.5441 39.2313 53.4276 39.0982 53.4276 38.9318V37.7171C53.7271 37.5175 54.01 37.2845 54.2596 37.0349C55.5408 35.8037 56.2396 34.1398 56.2396 32.3594V30.6955L56.589 29.9967C56.9717 29.2313 57.1714 28.3661 57.1714 27.5008V22.975C57.1714 22.4925 56.772 22.0932 56.2895 22.0932H47.8369C44.7587 22.0932 42.2629 24.589 42.2629 27.6672V27.7171C42.2629 28.4326 42.4293 29.1481 42.7454 29.797L43.1947 30.6955V32.1265C43.1947 34.406 44.3095 36.4359 46.0067 37.6672V38.9318C46.0067 39.1315 46.0067 39.2146 45.2745 39.4143L43.5108 39.9135L38.386 38.0499C38.4027 37.8003 38.3195 37.5674 38.1531 37.3844L36.5225 35.6706V32.792C36.6889 32.6423 36.8719 32.5092 37.0383 32.3428C39.1015 30.4126 40.2829 27.6839 40.2829 24.8552V22.5591C40.8985 21.2113 41.2146 19.7637 41.2146 18.2829V8.88186C41.2146 8.39933 40.8153 8 40.3328 8H27.188C22.5624 8 18.802 11.7604 18.802 16.386V18.2662C18.802 19.7471 19.1181 21.178 19.7338 22.5424V24.5225C19.7338 27.8003 21.198 30.7621 23.4942 32.7088V35.6539L21.8636 37.3677C21.6805 37.5508 21.614 37.8003 21.6306 38.0333L16.223 39.9967C15.8236 40.1464 15.4742 40.3295 15.1414 40.5624L14.2928 40.1464C16.822 39.0483 17.6206 37.5008 17.6539 37.4176C17.7704 37.1681 17.7704 36.8852 17.6539 36.6356C17.0216 35.371 16.9384 33.0416 16.8885 31.178C16.8719 30.5624 16.8552 29.9634 16.8053 29.4476C16.5058 25.2379 13.3111 22.0599 9.35108 22.0599C5.39102 22.0599 2.19634 25.2379 1.89684 29.4476C1.86356 29.9634 1.84692 30.5624 1.81364 31.178C1.74709 33.0416 1.68053 35.371 1.04825 36.6356C0.93178 36.8852 0.93178 37.1681 1.04825 37.4176C1.08153 37.5008 1.8802 39.0316 4.40932 40.1298L2.04659 41.3112C0.78203 41.9434 0 43.208 0 44.6223V51.1115C0 51.594 0.399334 51.9934 0.881864 51.9934C1.36439 51.9934 1.76373 51.594 1.76373 51.1115V44.6223C1.76373 43.8902 2.1797 43.2246 2.82862 42.8918L5.75707 41.4276L6.77205 42.3927C7.48752 43.0749 8.40266 43.4077 9.3178 43.4077C10.2329 43.4077 11.1481 43.0749 11.8636 42.3927L12.8785 41.4276L13.8436 41.9102C13.3943 42.6256 13.1448 43.4742 13.1448 44.3561V51.1115C13.1448 51.594 13.5441 51.9934 14.0266 51.9934C14.5092 51.9934 14.9085 51.594 14.9085 51.1115V44.3561C14.9085 43.1581 15.6739 42.0599 16.8053 41.6439L22.4958 39.5807L24.8752 43.1414C25.1747 43.5907 25.6572 43.8902 26.2063 43.9401C26.2729 43.9401 26.3228 43.9401 26.3894 43.9401C26.8719 43.9401 27.3211 43.7571 27.6706 43.4077L29.1181 41.9601V51.1115C29.1181 51.594 29.5175 51.9934 30 51.9934C30.4825 51.9934 30.8819 51.594 30.8819 51.1115V41.9601L32.3295 43.4077C32.6789 43.7571 33.1281 43.9401 33.6107 43.9401C33.6772 43.9401 33.7271 43.9401 33.7937 43.9401C34.3428 43.8902 34.8253 43.5907 35.1248 43.1414L37.5042 39.5807L43.1947 41.6439C44.3261 42.0599 45.0915 43.1414 45.0915 44.3561V51.1115C45.0915 51.594 45.4909 51.9934 45.9734 51.9934C46.4559 51.9934 46.8552 51.594 46.8552 51.1115V44.3561C46.8552 43.1414 46.3727 41.9933 45.5574 41.1448L45.7737 41.0782C45.99 41.0117 46.2895 40.9285 46.589 40.7787L48.8353 43.025V51.1115C48.8353 51.594 49.2346 51.9934 49.7171 51.9934C50.1997 51.9934 50.599 51.594 50.599 51.1115V43.025L52.8286 40.7953C52.9451 40.8619 53.0782 40.9118 53.1947 40.9451L56.822 41.9767C57.6539 42.2097 58.2363 42.975 58.2363 43.8403V51.1115C58.2363 51.594 58.6356 51.9934 59.1181 51.9934C59.6007 51.9934 60 51.594 60 51.1115V43.8403C60 42.193 58.9018 40.7454 57.3211 40.2795V40.3128ZM5.69052 38.7654C4.04326 38.1664 3.22795 37.3844 2.87854 36.9517C3.11148 36.3195 3.27787 35.604 3.3777 34.8552C3.86023 36.02 4.67554 37.0017 5.69052 37.7171V38.7654ZM10.7155 41.1448C9.96672 41.8602 8.78536 41.8602 8.03661 41.1448L7.2213 40.3627C7.35441 40.0965 7.4376 39.8136 7.4376 39.4975V38.5657C8.05325 38.7654 8.70216 38.8652 9.38436 38.8652C10.0666 38.8652 10.7155 38.7654 11.3311 38.5657V39.4975C11.3311 39.797 11.4143 40.0965 11.5474 40.3627L10.7321 41.1448H10.7155ZM9.38436 37.1015C6.75541 37.1015 4.62562 34.9717 4.62562 32.3428C4.62562 31.8602 4.22629 31.4609 3.74376 31.4609C3.69384 31.4609 3.64393 31.4609 3.59401 31.4609C3.59401 31.3777 3.59401 31.3112 3.59401 31.228C3.61065 30.629 3.62729 30.0466 3.66057 29.5641C3.77704 27.9834 4.40932 26.5358 5.44093 25.4709C6.48918 24.406 7.87022 23.807 9.36772 23.807C10.8652 23.807 12.2463 24.3894 13.2945 25.4709C14.3261 26.5358 14.9584 27.9834 15.0749 29.5641C15.1082 30.0466 15.1248 30.629 15.1414 31.228C15.1414 31.2779 15.1414 31.3278 15.1414 31.3777C14.193 29.9135 12.7121 28.8153 10.7987 28.2163C9.03494 27.6506 7.5208 27.6839 7.45424 27.6839C7.2213 27.6839 7.00499 27.7837 6.8386 27.9501L5.2579 29.5973C4.92513 29.9468 4.92513 30.4958 5.27454 30.8453C5.62396 31.1947 6.17305 31.178 6.52246 30.8286L7.83694 29.4642C8.96839 29.5141 12.629 29.9468 14.0433 33.0749C13.6938 35.3877 11.6972 37.0849 9.35108 37.0849L9.38436 37.1015ZM13.0782 38.7654V37.7171C14.0932 37.0183 14.9085 36.02 15.391 34.8552C15.4908 35.604 15.6572 36.3195 15.8902 36.9517C15.5408 37.3844 14.7088 38.1664 13.0782 38.7654ZM21.5308 24.5225V22.3428C21.5308 22.2097 21.4975 22.0765 21.4476 21.9601C20.8819 20.7953 20.599 19.5474 20.599 18.2662V16.386C20.599 12.7255 23.5774 9.74709 27.2379 9.74709H39.5008V18.2662C39.5008 19.5474 39.218 20.7787 38.6522 21.9601C38.6023 22.0765 38.5691 22.2097 38.5691 22.3428V24.8386C38.5691 27.218 37.6206 29.4143 35.8735 31.0449C35.6572 31.2446 35.4243 31.4443 35.1914 31.6107C33.5607 32.8419 31.5807 33.4409 29.5008 33.3078C25.0416 33.025 21.5641 29.1481 21.5641 24.4892L21.5308 24.5225ZM26.4725 42.193C26.4725 42.193 26.4559 42.2097 26.4226 42.2097C26.3894 42.2097 26.3894 42.193 26.3727 42.1764L23.6439 38.0832L24.5258 37.1681L28.6689 39.9967L26.4725 42.193ZM30.0333 38.7987L25.2745 35.5541V33.9068C26.5058 34.5724 27.8869 34.9884 29.3511 35.0882C29.584 35.0882 29.817 35.1048 30.0499 35.1048C31.7305 35.1048 33.3444 34.7055 34.792 33.9401V35.5374L30.0333 38.782V38.7987ZM33.6938 42.1764C33.6938 42.1764 33.6938 42.193 33.6439 42.2097C33.6107 42.2097 33.594 42.2097 33.594 42.193L31.3977 39.9967L35.5408 37.1681L36.4226 38.0832L33.6938 42.1764ZM49.7338 41.4443L47.7371 39.4476C47.7704 39.2978 47.787 39.1148 47.787 38.9318V38.5657C48.3361 38.7488 48.9185 38.8486 49.5341 38.8652C49.6007 38.8652 49.6672 38.8652 49.7338 38.8652C50.3993 38.8652 51.0483 38.7654 51.6639 38.5657V38.9151C51.6639 39.0982 51.6805 39.2646 51.7305 39.431L49.7338 41.4276V41.4443ZM53.0449 35.7704C52.1131 36.6689 50.8819 37.1514 49.584 37.1181C47.0383 37.0349 44.975 34.8053 44.975 32.1265V30.4792C44.975 30.3461 44.9418 30.213 44.8752 30.0799L44.3261 28.9983C44.1265 28.599 44.0266 28.1498 44.0266 27.7171V27.6672C44.0266 25.5707 45.7404 23.8569 47.8369 23.8569H55.4077V27.5008C55.4077 28.0832 55.2745 28.6822 55.0083 29.2146L54.5591 30.0965C54.4925 30.213 54.4592 30.3461 54.4592 30.4958V32.376C54.4592 33.6739 53.9434 34.8885 53.0117 35.787L53.0449 35.7704Z" fill="currentColor"></path>
                              <path d="M55.3578 44.6224C54.8752 44.6224 54.4759 45.0218 54.4759 45.5043V51.1449C54.4759 51.6274 54.8752 52.0268 55.3578 52.0268C55.8403 52.0268 56.2396 51.6274 56.2396 51.1449V45.5043C56.2396 45.0218 55.8403 44.6224 55.3578 44.6224Z" fill="currentColor"></path>
                              <path d="M4.67556 45.7705C4.19304 45.7705 3.7937 46.1698 3.7937 46.6524V51.1282C3.7937 51.6108 4.19304 52.0101 4.67556 52.0101C5.15809 52.0101 5.55743 51.6108 5.55743 51.1282V46.6524C5.55743 46.1698 5.15809 45.7705 4.67556 45.7705Z" fill="currentColor"></path>
                              <path d="M37.2213 18.5825C33.8935 15.2547 26.9551 15.9036 24.1098 16.3196C23.2113 16.4527 22.5624 17.2015 22.5624 18.1166V20.1465C22.5624 20.6291 22.9617 21.0284 23.4442 21.0284C23.9268 21.0284 24.3261 20.6291 24.3261 20.1465V18.1166C24.3261 18.1166 24.3427 18.0667 24.376 18.05C25.5075 17.8837 27.7537 17.6174 30.0832 17.7672C32.8286 17.9502 34.8086 18.6324 35.9734 19.8138C36.3228 20.1632 36.8719 20.1632 37.2213 19.8138C37.5707 19.4644 37.5707 18.9153 37.2213 18.5658V18.5825Z" fill="currentColor"></path>
                              <path d="M19.7005 46.5027C19.218 46.5027 18.8187 46.902 18.8187 47.3846V51.145C18.8187 51.6275 19.218 52.0268 19.7005 52.0268C20.1831 52.0268 20.5824 51.6275 20.5824 51.145V47.3846C20.5824 46.902 20.1831 46.5027 19.7005 46.5027Z" fill="currentColor"></path>
                              <path d="M40.3661 46.5027C39.8836 46.5027 39.4843 46.902 39.4843 47.3846V51.145C39.4843 51.6275 39.8836 52.0268 40.3661 52.0268C40.8486 52.0268 41.248 51.6275 41.248 51.145V47.3846C41.248 46.902 40.8486 46.5027 40.3661 46.5027Z" fill="currentColor"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_403_32">
                                <rect width="60" height="60" fill="currentColor"></rect>
                              </clipPath>
                            </defs>
                          </svg></div>
                      </div>
                      <div className="home-card-title hover-to-white">
                        <div className="text-block-30">Tailored Solutions</div>
                      </div>
                      <div className="home-card-description">
                        <div className="home-card-description-text hover-to-white">Authgear offers a range of flexible CIAM solutions to fit your unique business requirements.</div>
                      </div>
                    </div>
                  </div>
                  <div className="home-card hover-to-white">
                    <div className="home-card-wrap home-card-content">
                      <div className="home-card-image hover-to-white">
                        <div className="home-card-svg hover-to-white w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.9503 40.4029H50.8374L50.7622 40.1771V33.7427C50.7622 30.5819 48.1847 28.0044 45.0239 27.9856H31.2708V18.9172L31.4589 18.8796C33.1522 18.5033 34.6009 17.4685 35.5416 16.001C36.4635 14.5335 36.7645 12.7838 36.3882 11.0906C36.0119 9.39728 34.9772 7.9486 33.5097 7.0079C32.0422 6.06719 30.2925 5.78498 28.5992 6.16126C26.9059 6.53754 25.4573 7.57232 24.5166 9.03982C23.5947 10.5073 23.2936 12.257 23.6699 13.9503C24.2155 16.3961 26.1534 18.334 28.5992 18.8796L28.7873 18.9172V27.9856H15.0343C11.8735 27.9856 9.27715 30.5631 9.27715 33.7427V40.3652L9.08901 40.4029C5.58959 41.1931 3.36953 44.6925 4.15972 48.2107C4.536 49.904 5.57078 51.3527 7.03828 52.2934C8.50577 53.2341 10.2555 53.5351 11.9487 53.14C13.642 52.7637 15.0907 51.729 16.0314 50.2615C16.9533 48.794 17.2731 47.0442 16.878 45.351C16.3324 42.9052 14.3946 40.9673 11.9487 40.4217L11.7606 40.3841V33.7615C11.7606 31.9742 13.2281 30.5067 15.0154 30.5067H28.7685V40.3841L28.5804 40.4217C26.8871 40.798 25.4384 41.8327 24.4977 43.3002C23.557 44.7677 23.2748 46.5175 23.6511 48.2107C24.0274 49.904 25.0622 51.3527 26.5297 52.2934C27.9972 53.2153 29.7469 53.5351 31.4401 53.14C33.1334 52.7637 34.5821 51.729 35.5228 50.2615C36.4635 48.794 36.7457 47.0442 36.3694 45.351C35.8238 42.9052 33.886 40.9673 31.4401 40.4217L31.252 40.3841V30.5067H45.0051C46.7924 30.5067 48.2411 31.9742 48.2411 33.7615V40.3841L48.053 40.4217C46.3597 40.798 44.911 41.8327 43.9703 43.3002C43.0296 44.7677 42.7474 46.5175 43.1237 48.2107C43.5 49.904 44.5347 51.3527 46.0022 52.2934C47.4697 53.2153 49.2194 53.5163 50.9127 53.14C52.606 52.7637 54.0546 51.729 54.9954 50.2615C55.9172 48.794 56.2183 47.0442 55.842 45.351C55.2964 42.9052 53.3585 40.9673 50.9127 40.4217L50.9503 40.4029ZM14.5075 46.762C14.5075 48.9821 12.7013 50.7882 10.4813 50.7882C8.26119 50.7882 6.45504 48.9821 6.45504 46.762C6.45504 44.542 8.26119 42.7358 10.4813 42.7358C12.7013 42.7358 14.4886 44.542 14.5075 46.762ZM34.0177 46.5175V46.7432C34.0177 48.9633 32.2115 50.7694 30.0103 50.7694C27.809 50.7694 25.984 48.9633 25.984 46.7432C25.984 44.5232 27.7902 42.7358 29.9914 42.717C32.1174 42.717 33.8671 44.3915 33.9988 46.4986L34.0177 46.5175ZM29.9914 16.5466C27.7714 16.5466 25.9652 14.7405 25.9652 12.5204C25.9652 10.3004 27.7714 8.49421 29.9914 8.49421C32.2115 8.49421 34.0177 10.3004 34.0177 12.5204C34.0177 14.7405 32.2115 16.5466 29.9914 16.5466ZM49.5016 50.7694H49.2759C47.1687 50.6377 45.4942 48.888 45.4942 46.7432C45.4942 45.6708 45.9082 44.6549 46.6607 43.9023C47.4133 43.1497 48.4292 42.717 49.5016 42.717C50.574 42.717 51.59 43.1309 52.3426 43.8835C53.0951 44.636 53.5279 45.652 53.5279 46.7244C53.5279 48.9445 51.7217 50.7506 49.5016 50.7506V50.7694Z" fill="currentColor"></path>
                          </svg></div>
                      </div>
                      <div className="home-card-title hover-to-white">
                        <div className="text-block-31">Expert Guidance</div>
                      </div>
                      <div className="home-card-description">
                        <div className="home-card-description-text hover-to-white">Our team will help you choose the right solution and ensure a smooth implementation process.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-form-section">
            <div className="container-default">
              <div className="container-default-inner">
                <div className="_2-block-flex footer-form">
                  <div className="_2-block-flex-content footer-form">
                    <div className="_2-block-flex-content-text-wrap footer-form">
                      <h2 className="form-heading color-white footer-form">Secure, Streamline &amp; Empower Your Extended Workforce</h2>
                    </div>
                  </div>
                  <div className="_2-block-flex-image footer-form">
                    <div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">
                      <form id="wf-form-Authgear-Talk-with-Us-2" name="wf-form-Authgear-Talk-with-Us-2" data-name="Authgear Talk with Us" method="post" className="contact-form">
                        <div className="margin-vertical margin-small"><label htmlFor="Name-5" className="getdemo-label">Full Name<span className="text-span-7">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Name" data-name="Name" placeholder="" type="text" id="Name-5" required /></div>
                        <div className="margin-vertical margin-small"><label htmlFor="Email-6" className="getdemo-label">Work Email<span className="text-span-8">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Email" data-name="Email" placeholder="" type="email" id="Email-6" required /></div>
                        <div className="margin-vertical margin-small"><label htmlFor="Phone-3" className="getdemo-label">Phone Number<span className="text-span-9">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Phone" data-name="Phone" placeholder="" type="tel" id="Phone-3" required /><input className="text-field w-input" maxLength={256} name="Country" data-name="Country" placeholder="" type="text" id="Country-4" required />
                          <div className="html-embed w-embed"><span id="valid-msg" className="hide">Valid number</span>
                            <span id="error-msg" className="hide"></span>
                          </div>
                        </div>
                        <div className="margin-vertical margin-small"><label htmlFor="Company-5" className="getdemo-label">Company Name<span className="text-span-10">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Company" data-name="Company" placeholder="" type="text" id="Company-5" required /></div>
                        <div className="margin-vertical margin-small"><label htmlFor="how-hear" className="getdemo-label">How did you hear about us?<span className="text-span-10">*</span></label><select id="how-hear" name="how-hear" data-name="how-hear" required className="getdemo-field w-select">
                            <option value="">Select one</option>
                            <option value="organic-search">Search Engine</option>
                            <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
                            <option value="github">GitHub</option>
                            <option value="others">Others</option>
                          </select></div>
                        <div className="margin-vertical margin-small"><label htmlFor="Use-Case" className="getdemo-label">Anything else?<span className="text-span-10">*</span></label><textarea required placeholder="Tell us more about your project, needs, timeline" maxLength={500} id="Use-Case" name="Use-Case" data-name="Use Case" className="get-demo-form-field w-input"></textarea></div>
                        <div data-sitekey="6LdonPYqAAAAAGzNsg7cDyHi5VTueApPzHoOx0Y4" className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                        <div className="margin-vertical margin-medium"><input type="submit" data-wait="Please wait..." className="getdemo-submit plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
                      </form>
                      <div className="success-message w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="error-message w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <PageScripts scripts={pageScripts} />
    </>
  );
}
