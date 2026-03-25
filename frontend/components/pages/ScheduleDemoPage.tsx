import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default async function ScheduleDemoPage({ locale: _locale }: Props) {
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
              <ContactForm />
            </div>
          </div>
        </section>


        {/* Apollo */}




        {/*  Autofill from Authgear App  */}

        {/*  Intl-tel-input  */}


      </div>
    </>
  );
}
