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

export default async function ScheduleDemoPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'ScheduleDemo' });
  void t;

  return (
    <>
      <div className="page-wrapper">


        <section className="getdemo-bg">
          <div className="w-layout-blockcontainer getdemo w-container">
            <div className="w-layout-hflex getdemo-content">
              <h1 className="getdemo-title">Secure, Streamline &amp; Empower Your Extended Workforce</h1>
              <p className="paragraph-7">Request a personalised demo and discover:</p>
              <div className="w-layout-vflex flex-block-69">
                <div className="w-layout-hflex getdemo-feature-block"><img src="/images/Checkmark---Iconly-Pro.svg" loading="lazy" alt="" className="getdemo-feature-check" />
                  <p className="getdemo-feature"><span className="text-span-42">Secure access:</span><br />Secure your data and resources with granular controls and multi-factor authentication.</p>
                </div>
                <div className="w-layout-hflex getdemo-feature-block"><img src="/images/Checkmark---Iconly-Pro.svg" loading="lazy" alt="" className="getdemo-feature-check" />
                  <p className="getdemo-feature"><span className="text-span-42">Streamlined onboarding:</span><br />Get your extended team productive instantly with automated provisioning and self-service portals.</p>
                </div>
                <div className="w-layout-hflex getdemo-feature-block"><img src="/images/Checkmark---Iconly-Pro.svg" loading="lazy" alt="" className="getdemo-feature-check" />
                  <p className="getdemo-feature"><span className="text-span-42">Seamless collaboration:</span><br />Break down silos and empower collaboration across your entire workforce.</p>
                </div>
                <div className="w-layout-hflex getdemo-feature-block"><img src="/images/Checkmark---Iconly-Pro.svg" loading="lazy" alt="" className="getdemo-feature-check" />
                  <p className="getdemo-feature"><span className="text-span-42">Reduced IT burden:</span><br />Free up IT resources and simplify access management for everyone.</p>
                </div>
                <div className="w-layout-hflex getdemo-feature-block"><img src="/images/Checkmark---Iconly-Pro.svg" loading="lazy" alt="" className="getdemo-feature-check" />
                  <p className="getdemo-feature"><span className="text-span-42">Scalability and flexibility:</span><br />Adapt to your unique needs and integrate seamlessly with existing systems.</p>
                </div>
              </div>
              <p className="getdemo-feature logo-totle">Authgear is trusted by</p>
              <div className="w-layout-hflex flex-block-70"><img src="/images/demo_customer-logo-Bupa2x.png" loading="lazy" alt="" /><img src="/images/demo_customer-logo-CIMIC2x.png" loading="lazy" alt="" /><img src="/images/demo_customer-logo-HKL2x.png" loading="lazy" alt="" /><img src="/images/demo_customer-logo-hkpc2x.png" loading="lazy" alt="" /><img src="/images/demo_customer-logo-K112x.png" loading="lazy" alt="" /><img src="/images/demo_customer-logo-嚗胞TR2x.png" loading="lazy" alt="" /></div>
            </div>
            <div className="w-layout-hflex getdemo-form">
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
        </section>


        {/* Apollo */}





        {/*  Autofill from Authgear App  */}

        {/*  Intl-tel-input  */}


      </div>

      <PageScripts scripts={pageScripts} />
    </>
  );
}
