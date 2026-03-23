interface Props {
  locale: string;
}

export default async function SecurityPage({ locale: _locale }: Props) {

  return (
    <>
      <div className="page-wrapper">

          <div className="inner-page-hero">
            <div className="container-medium-761px">
              <div className="text-center">
                <div className="color-white">
                  <h1 className="color-white">Security</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container-default w-container"></div>
            <div className="container-medium-761px">
              <div className="rich-text w-richtext">
                <h3>Security Assessments and Compliance</h3>
                <p>At Authgear, we take data security extremely seriously, being both <strong>ISO 27001</strong> and <strong>SOC 2 Type II</strong> compliant. This affirms our commitment to implementing and maintaining the highest standards of information security and operational integrity.</p>
                <ul role="list">
                  <li><strong>ISO 27001:</strong> Ensures Authgear's Information Security Management System (ISMS) meets international best practices for managing sensitive company and customer information.</li>
                  <li><strong>SOC 2 Type II:</strong> Validates Authgear's ability to securely manage customer data, ensuring trust and privacy across critical service criteria</li>
                </ul>
                <p>Feel free to reach us via our <a href="https://www.authgear.com/schedule-demo" target="_blank">contact form</a> for more details on our security certifications.</p>
                <h4><strong>Data Centers</strong></h4>
                <p>Authgear’s physical infrastructure is hosted and managed within Google’s secure data centers around the globe and utilizes the Google Cloud Platform (GCP) technology. Independent and thorough assessments on security, privacy and compliance controls are regularly conducted by Google to ensure they are up to industry standards. In fact, Google's data center operations have been accredited under:</p>
                <ul role="list">
                  <li>ISO 27001</li>
                  <li>ISO/IEC 27017</li>
                  <li>ISO/IEC 27018</li>
                  <li>SOC 1/2/3</li>
                  <li>PCI DSS</li>
                  <li>CSA STAR</li>
                </ul>
                <p>On the other hand, Stripe, a PCI DSS Level 1 compliant payment gateway, is our choice for securing and processing card payments.</p>
                <h3>Payment Card Industry Data Security Standard (PCI DSS) Compliance</h3>
                <p>PCI DSS is a set of industry-mandated requirements that applies to any business that handles, processes, or stores credit cards regardless of the its size or location.<br /><br />Authgear does not fall into that category, as we do NOT store any financial data nor process payments.</p>
                <h3>Security Measures from Data Centers<br /></h3>
                <p>Google-managed data centers are certified with ISO 27001. Google has many years of experience in securing data and handling emergencies at large-scale data centers all over the world, and they have applied this experience to GCP and its infrastructure.<br /><br />These facilities are one of the safest residence for your data, with a world-wide industry-leading security team works 24/7 monitoring and constantly improving the security measures. Data is distributed across multiple machines in different locations with various backups replicated to avoid a single point of failure. Backup data is chunked for random distribution to add an extra layer of security, making it not human-readable.<br /><br />Physically, secure perimeter defense systems, comprehensive camera coverage and 24/7 guard teams are deployed to prevent any unauthorized access. Plus, data center staffs are trained to be security minded, and their access to the facilities is immediately revoked once they do not have a need for these privileges.<br /><br />Regular tracking and monitoring are applied to hard drives at these facilities as well, and when one has reached the end of it life, it will be destroyed through a thorough, multi-step process.</p>
                <h3>Environmental Safeguards</h3>
                <h4>Fire Detection and Suppression</h4>
                <p>Robust disaster recovery measures are applied in place. In the event of a fire or other physical disruption, data is shifted automically to other data centers, allowing the users to work uninterrupted.</p>
                <h4>Power</h4>
                <p>Power failure is also considered, with backup generators installed in response to that.</p>
                <h4>Climate and Temperature Control</h4>
                <p>Climate control is required to maintain a constant operating temperature for servers and other hardware, which prevents overheating and reduces the possibility of service outages. Data centers are designed to maintain atmospheric conditions at optimal levels. Monitoring systems and data center personnel ensure temperature and humidity are at the appropriate levels.</p>
                <h3>Network Security</h3>
                <h4>Firewalls</h4>
                <p>Firewalls are utilized to restrict access to systems from external networks and between systems internally. By default, all access is denied and only explicitly allowed ports and protocols are allowed based on business need. Each system is assigned to a firewall security group based on the system’s function. Security groups restrict access to only the ports and protocols required for a system’s specific function to mitigate risk.</p>
                <h4>Spoofing and Sniffing Protections</h4>
                <p>Managed firewalls prevent IP, MAC, and ARP spoofing on the network and between virtual hosts to ensure spoofing is not possible. Packet sniffing is prevented by infrastructure including the hypervisor which will not deliver traffic to an interface which it is not addressed to. Authgear utilizes application isolation, operating system restrictions, and encrypted connections to further ensure risk is mitigated at all levels.</p>
                <h4>Port Scanning</h4>
                <p>Port scanning is prohibited and every reported instance is investigated by our infrastructure provider. When port scans are detected, they are stopped and access is blocked.</p>
                <h3>System Security</h3>
                <h4>System Configuration</h4>
                <p>System configuration and consistency are maintained through standard up-to-date images, configuration management software, and by replacing systems with updated deployments. Systems are deployed using verified and safe images that are updated with configuration changes and security updates before deployment. Once deployed, existing systems are decommissioned and replaced.</p>
                <h4>System Authentication</h4>
                <p>Operating system access is limited to Authgear staffs only and requires username, key and multi-step authentication. Operating systems do not allow password authentication to prevent password brute-force attacks, theft, and sharing.</p>
                <h3>Disaster Recovery</h3>
                <p>Authgear is designed for stability and scaling, and inherently mitigates common issues that lead to outages while maintaining recovery capabilities. Our platform maintains redundancy to prevent single points of failure, and is able to replace failed components.</p>
                <h3>Access to Customer Data</h3>
                <p>Authgear staff does not access or interact with customer data or applications as part of normal operations. There may be cases where Authgear is requested to interact with customer data or applications at the request of the customer for support purposes or where required by law. Authgear may also inspect customer data to debug and troubleshoot platform issues.<br /></p>
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
