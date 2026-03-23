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

export default async function GlossaryPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Glossary' });
  void t;

  return (
    <>
      <div className="page-wrapper">



        <section className="glossary">
          <div className="login-default-inner-section gallery-banner">
            <h1 className="glossary-h1">Glossary</h1>
            <p className="glossary-subtitle subtitle-paddings">Decode identity, authentication, and secure access—quickly and clearly with Authgear’s practical glossary.</p>
            <div className="div-block-30">
              <div className="w-layout-hflex anchor-container">
                <a href="#Glossary-A" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">A</div>
                </a>
                <a href="#Glossary-B" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">B</div>
                </a>
                <a href="#Glossary-C" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">C</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">D</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">E</div>
                </a>
                <a href="#Glossary-F" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">F</div>
                </a>
                <a href="#Glossary-G" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">G</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">H</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">I</div>
                </a>
                <a href="#Glossary-J" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">J</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">K</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">L</div>
                </a>
                <a href="#Glossary-M" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">M</div>
                </a>
                <a href="#Glossary-N" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">N</div>
                </a>
                <a href="#Glossary-O" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">O</div>
                </a>
                <a href="#Glossary-P" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">P</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">Q</div>
                </a>
                <a href="#Glossary-R" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">R</div>
                </a>
                <a href="#Glossary-S" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">S</div>
                </a>
                <a href="#Glossary-T" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">T</div>
                </a>
                <a href="#Glossary-U" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">U</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">V</div>
                </a>
                <a href="#Glossary-W" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">W</div>
                </a>
                <a href="#" className="anchor-link inactive-glossary w-inline-block">
                  <div className="glossary-anchor inactive">X</div>
                </a>
                <a href="#Glossary-Y" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">Y</div>
                </a>
                <a href="#Glossary-Z" className="anchor-link w-inline-block">
                  <div className="glossary-anchor">Z</div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="div-block-30 sticky">
          <div className="w-layout-hflex anchor-container">
            <a href="#Glossary-A" className="anchor-link w-inline-block">
              <div className="glossary-anchor">A</div>
            </a>
            <a href="#Glossary-B" className="anchor-link w-inline-block">
              <div className="glossary-anchor">B</div>
            </a>
            <a href="#Glossary-C" className="anchor-link w-inline-block">
              <div className="glossary-anchor">C</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">D</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">E</div>
            </a>
            <a href="#Glossary-F" className="anchor-link w-inline-block">
              <div className="glossary-anchor">F</div>
            </a>
            <a href="#Glossary-G" className="anchor-link w-inline-block">
              <div className="glossary-anchor">G</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">H</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">I</div>
            </a>
            <a href="#Glossary-J" className="anchor-link w-inline-block">
              <div className="glossary-anchor">J</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">K</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">L</div>
            </a>
            <a href="#Glossary-M" className="anchor-link w-inline-block">
              <div className="glossary-anchor">M</div>
            </a>
            <a href="#Glossary-N" className="anchor-link w-inline-block">
              <div className="glossary-anchor">N</div>
            </a>
            <a href="#Glossary-O" className="anchor-link w-inline-block">
              <div className="glossary-anchor">O</div>
            </a>
            <a href="#Glossary-P" className="anchor-link w-inline-block">
              <div className="glossary-anchor">P</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">Q</div>
            </a>
            <a href="#Glossary-R" className="anchor-link w-inline-block">
              <div className="glossary-anchor">R</div>
            </a>
            <a href="#Glossary-S" className="anchor-link w-inline-block">
              <div className="glossary-anchor">S</div>
            </a>
            <a href="#Glossary-T" className="anchor-link w-inline-block">
              <div className="glossary-anchor">T</div>
            </a>
            <a href="#Glossary-U" className="anchor-link w-inline-block">
              <div className="glossary-anchor">U</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">V</div>
            </a>
            <a href="#Glossary-W" className="anchor-link w-inline-block">
              <div className="glossary-anchor">W</div>
            </a>
            <a href="#" className="anchor-link inactive-glossary w-inline-block">
              <div className="glossary-anchor inactive">X</div>
            </a>
            <a href="#Glossary-Y" className="anchor-link w-inline-block">
              <div className="glossary-anchor">Y</div>
            </a>
            <a href="#Glossary-Z" className="anchor-link w-inline-block">
              <div className="glossary-anchor">Z</div>
            </a>
          </div>
        </div>
        <section>
          <div className="login-default-inner-section glossary-content-inner-section">
            <div id="Glossary-A" className="w-layout-vflex glossary-container">
              <div className="first-letter">A</div>
              <div className="w-layout-hflex glossary-block">
                <a href="#" className="glossary-link w-inline-block">
                  <div className="text-block-85 with-link">Access token</div><img src="/images/glossary-link.svg" loading="lazy" alt="" />
                </a>
                <p className="paragraph-19">An access token is a credential that a client application uses to authenticate on behalf of the users to access resources on a backend server. In a logged-in session, the requests from the client application to the backend servers should contain an access token. An access token can be in different formats, but JWT is a common choice.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Admin API</div>
                <p className="paragraph-19">The Admin API provides a GraphQL interface for developers to interact with services and data on Authgear from their own code or a custom application.<br /><br />You can also inspect the GraphQL schema and build queries and mutations with the GraphiQL Explorer in the Authgear portal.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Anonymous Users</div>
                <p className="paragraph-19">Anonymous users are users who do not have any identity (e.g. email or phone number) attached to their account. However, they can be later promoted to normal users.<br /><br />This concept makes it possible to create a temporary account for guests on your website or application so that they can access features before they sign up using their email or phone number. When you promote an anonymous user, the value of their <span><strong>sub</strong></span><strong> </strong>(User ID) remains the same, and as a result, you can easily link their previous activities after they sign up.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Auth UI</div>
                <p className="paragraph-19">By default, Authgear provides a customizable User Interface (UI) for login, user registration, and profile settings pages for your project. These pages make up what is referred to as Auth UI.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Audit Logs</div>
                <p className="paragraph-19">There are two types of Audit logs in Authgear. “Audit Log For Users Activities” allows you to monitor the changes and actions of your end-users, such as added phone number, logged in, logged out. While “Audit Log For Admin API” lets you analyze the activities that occur on Admin API and the Authgear Portal of your project.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Authgear Endpoint</div>
                <p className="paragraph-19">Your Authgear endpoint or project endpoint is the active domain name that points to your Authgear project. The Authgear endpoint has many uses. For example, you&#x27;ll need it to connect a client application to your Authgear project or redirect users to your login and sign-up page. The easiest way to find out what your Authgear endpoint is is to navigate to Custom Domains in the Authgear Portal. Your endpoint is the domain in the row with a green Active status.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Authentication</div>
                <p className="paragraph-19">Authentication is the process of verifying the identity of a user on your application. Authgear supports different methods for authentication, including email, mobile phone, username, password, OTP, passkeys, biometric, social and enterprise login.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Authorization</div>
                <p className="paragraph-19">Authorization is the process of granting or denying access to resources based on the identity of a user. For example, a user may grant a client application the authorization to their own data on Authgear, this authorization may not be used to access another user&#x27;s data.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Authorization code</div>
                <p className="paragraph-19">access token. In the OAuth 2.0 Authorization Code Flow, the authorization server sends this authorization code to the client via the redirect URI after the user grants the client authorization.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Authorized Redirect URIs</div>
                <p className="paragraph-19">These are the URLs that point to valid pages on the client&#x27;s application that users are redirected to after auth. Usually, this is the page where you implement the code that gets the value of the authorization code from the URL parameter and initiates token exchange with the authorization code for an access token.<br /><br />In Authgear, you can also set the page to redirect anonymous users after promotion in the Authorized Redirect URIs for your project.</p>
              </div>
            </div>
            <div id="Glossary-B" className="w-layout-vflex glossary-container">
              <div className="first-letter">B</div>
              <div className="w-layout-hflex glossary-block">
                <a href="/features/biometric-authentication" className="glossary-link w-inline-block">
                  <div className="text-block-85 with-link">Biometric authentication</div><img src="/images/glossary-link.svg" loading="lazy" alt="" />
                </a>
                <p className="paragraph-19">Biometric authentication allows you to authenticate users on your application using biometric attributes such as fingerprint and face scan. This makes use of the native system feature such as FaceID and keychain on iOS, and Keystore on Android. Therefore, no biometric data is stored on Authgear. This feature is only available on Android 6.0+ and iOS 11.3+.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Blocking events</div>
                <p className="paragraph-19">Blocking events are events that are triggered before an operation such as user creation and the block of the operation from completion until the associated hook returns a JSON with is_allowed set to true.<br /><br />Examples of blocking events Authgear supports include: user.pre_create, user.profile.pre_update, user.pre_schedule_deletion, and oidc.jwt.pre_create.</p>
              </div>
            </div>
            <div id="Glossary-C" className="w-layout-vflex glossary-container">
              <div className="first-letter">C</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Claims</div>
                <p className="paragraph-19">Claims contain details that can be used to identify a user or application. They are typically included in the authentication tokens such as JWT and can contain details like username, scope, and role.<br /><br />See this post for instructions on how to add custom fields (details) to Authgear&#x27;s JWT access token to meet your specific needs.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Client ID</div>
                <p className="paragraph-19">This is a unique string that is used to identify your Authgear application when sending requests from your client application.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Client Secret</div>
                <p className="paragraph-19">The client secret is a confidential string sent together with the client ID as credentials for authenticating your client application on Authugear&#x27;s server.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Cloudflare Turnstile</div>
                <p className="paragraph-19">Turnstile is a service provided by Cloudflare that protects websites from bots and automated abuse without frustrating users with visual puzzles. It analyzes user behavior in the background to verify that a visitor is human, adapting the difficulty as needed and only requiring user interaction if suspicious activity is detected. In Authgear, Cloudflare Turnstile is one of the services you can integrate for bot protection.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Custom Attributes</div>
                <p className="paragraph-19">Custom Attributes allow you to add extra fields to the user attributes. Custom attributes can help capture extra data that isn&#x27;t already included in the standard attributes.</p>
              </div>
            </div>
            <div id="Glossary-F" className="w-layout-vflex glossary-container">
              <div className="first-letter">F</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">FIDO2</div>
                <p className="paragraph-19">FIDO2 is an open authentication standard that enables secure, passwordless logins to online services by using public key cryptography instead of traditional passwords (passkeys). It allows users to authenticate with biometrics, PINs, or physical security keys, ensuring that private credentials never leave their device and making logins resistant to phishing and credential theft.</p>
              </div>
            </div>
            <div id="Glossary-G" className="w-layout-vflex glossary-container">
              <div className="first-letter">G</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Google reCAPTCHA</div>
                <p className="paragraph-19">reCAPTCHA is a security service provided by Google that helps websites distinguish between human users and automated bots, protecting against spam, abuse, and fraudulent activities like credential stuffing and fake account creation. In Authgear, Google reCAPTCHA is one of the services you can integrate for bot protection.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Groups</div>
                <p className="paragraph-19">Groups is an access management feature in Authgear that makes it possible to create one or more groups, add roles to the groups, and add users to the groups.<br /><br />If a user is in a group, all the roles for that group are returned for their profile. See our roles and group documentation to learn more about using groups.</p>
              </div>
            </div>
            <div id="Glossary-J" className="w-layout-vflex glossary-container">
              <div className="first-letter">J</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">JWT</div>
                <p className="paragraph-19">JWT stands for JSON Web Token. JWTs are self-contained and can be securely used to share authentication and authorization information between a server and a client.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">JavaScript / TypeScript Hooks</div>
                <p className="paragraph-19">JavaScript / TypeScript hooks is a feature on the Authgear portal that allows you to write custom JavaScript / TypeScript code that will run when a specific event is triggered. This works very similar to traditional webhooks except from the fact that it eliminates the need to host your script on an external server.</p>
              </div>
            </div>
            <div id="Glossary-M" className="w-layout-vflex glossary-container">
              <div className="first-letter">M</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Magic link</div>
                <p className="paragraph-19">Magic link, also known as Email Login Link is a type of user authentication method that uses a unique login link that&#x27;s sent to a user&#x27;s email instead of a traditional password.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Multi-factor authentication (MFA)</div>
                <p className="paragraph-19">Multi-factor authentication, or MFA, is an application security measure that requires users to provide two or more factors to verify that it&#x27;s them actually trying to access their account. For example, when an application requires a user to enter their password (something they know) and an OTP sent to their phone (something they have).</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Machine-to-Machine Token</div>
                <p className="paragraph-19">Machine-to-machine (M2M) tokens are access tokens used by software systems or devices to authenticate and authorize themselves when communicating with other machines, without human involvement. These tokens are typically issued through protocols like OAuth 2.0’s Client Credentials flow, allowing trusted services to securely access protected resources by presenting the token in API requests.</p>
              </div>
            </div>
            <div id="Glossary-N" className="w-layout-vflex glossary-container">
              <div className="first-letter">N</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Non-Blocking Events</div>
                <p className="paragraph-19">Non-blocking events are hook events that don&#x27;t block the operations that trigger them. You can get notified and invoke custom logic when an event happens in Authgear.</p>
              </div>
            </div>
            <div id="Glossary-O" className="w-layout-vflex glossary-container">
              <div className="first-letter">O</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">One-Time Password (OTP)</div>
                <p className="paragraph-19">A one-time password (OTP) is a unique, automatically generated code that is valid for only a single login session or transaction, providing an extra layer of security compared to static passwords. OTPs are typically delivered via SMS, email, or authenticator apps, and are widely used in multi-factor authentication to help prevent unauthorized access and reduce the risk of password reuse or interception.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">OAuth</div>
                <p className="paragraph-19">OAuth is an open authorization standard that makes it possible for users to securely grant third-party applications access to their profile and data without requiring their password.<br /><br />Authgear supports the OAuth 2.0 standard and you can use it to access your user&#x27;s data from your custom application.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">OpenID Connect (OIDC)</div>
                <p className="paragraph-19">OpenID Connect (OIDC) is an authentication protocol based on the OAuth 2.0 standard. It makes it possible for applications to verify the identity of a user using data from an authorization provider.<br /><br />You can use Authgear as an OpenID Connect provider to enable user authentication on your application without having to store or manage user passwords on your application.</p>
              </div>
            </div>
            <div id="Glossary-P" className="w-layout-vflex glossary-container">
              <div className="first-letter">P</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Passkey</div>
                <p className="paragraph-19">The use of passkeys is a modern method of passwordless login. When using passkeys, the user&#x27;s browser or operating system helps them select the current passkey associated with their account on a website or application. Passkey verifies the user using biometrics or PIN on their device and can replace traditional OTP or biometric login.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Passwordless</div>
                <p className="paragraph-19">This refers to any login method that does not require the user to remember and enter a password. For example, using a one-time code or link to verify the identity of a user.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Project</div>
                <p className="paragraph-19">Your Authgear project is a container that holds all the configuration and data associated with your implementation of Authgear. You can create multiple projects for multiple implementations to separate their configuration and data. Each project has a unique URL that you can use to interact with it.</p>
              </div>
            </div>
            <div id="Glossary-R" className="w-layout-vflex glossary-container">
              <div className="first-letter">R</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Role-Based Access Control (RBAC)</div>
                <p className="paragraph-19">Role-based access control (RBAC) is a security model that manages user access to systems, applications, and data by assigning permissions based on a user&#x27;s predefined role within an organization. Instead of configuring permissions for each individual, RBAC groups users by roles—such as administrator, HR manager, or end-user—and grants access rights according to the responsibilities and requirements of those roles, simplifying administration and enhancing security by enforcing the principle of least privilege.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Roles</div>
                <p className="paragraph-19">Roles can be assigned to a user in Authgear for RBAC. Roles are returned using the <a href="#">https://authgear.com/claims/user/roles</a> attribute in Authgear&#x27;s JWT access token and UserInfo as an array.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Reauthentication</div>
                <p className="paragraph-19">Reauthentication is the process of verifying the identity of a user that&#x27;s already authenticated before they can perform sensitive operations. This process can help improve security by making sure a user doesn&#x27;t perform sensitive operations with old grants that might have been compromised.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Refresh token</div>
                <p className="paragraph-19">A refresh token is a special token that can be used to obtain a new access token without having to re-authenticate a user.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Roles</div>
                <p className="paragraph-19">Roles can be used to control access to certain parts of an application or API that&#x27;s powered by Authgear. Roles are returned using the <a href="#">https://authgear.com/claims/user/roles</a> attribute in Authgear&#x27;s JWT access token and UserInfo as an array.<br /><br />The following is an example of how you can use roles. In a blog application with two roles (admin and reader), you can restrict access for editing and adding new posts to only users with the admin role. Check out our documentation on roles and groups to learn more about managing roles in Authgear.</p>
              </div>
            </div>
            <div id="Glossary-S" className="w-layout-vflex glossary-container">
              <div className="first-letter">S</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">SAML</div>
                <p className="paragraph-19">SAML (Security Assertion Markup Language) is an open standard that enables secure exchange of authentication and authorization data between an identity provider (IdP) and a service provider (SP), most commonly to facilitate single sign-on (SSO) across multiple web applications. It uses XML-based assertions to communicate user identity and access rights, allowing users to authenticate once and access multiple services without needing to log in again for each one.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">SDK</div>
                <p className="paragraph-19">SDK stands for Software Development Kit. It is a set of tools and code that developers can use to build and debug their own applications for a target platform. Authgear provides SDKs for adding Authentication to your own application using popular languages, frameworks, and platforms like JavaScript/React-native, Android, iOS, Flutter, and Xamarin.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Single sign-on (SSO)</div>
                <p className="paragraph-19">Single sign-on, or in short SSO, is an authentication method that allows users to log in once and access multiple application applications without needing to log in again for each one.<br /><br />In Authgear, you can enable SSO for multiple applications that use the same Authgear project.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Social login</div>
                <p className="paragraph-19">Authgear simplifies the process of allowing your users to sign in to your application using their existing accounts on popular social media sites like Facebook, Google, LinkedIn, Github, and Apple.<br /><br />You can enable this feature from Authentication &gt; Social / Enterprise Login in the Authgear Portal.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Standard Attributes</div>
                <p className="paragraph-19">Standard Attributes consist of common user attributes such as email, phone number, name, gender, and birthday. Authgear determines the fields in Standard Attributes. You can view a full list of standard attributes under User Profile &gt; Standard Attributes.</p>
              </div>
            </div>
            <div id="Glossary-T" className="w-layout-vflex glossary-container">
              <div className="first-letter">T</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">TOTP</div>
                <p className="paragraph-19">TOTP is short for Time-based One-time Password. This is a method of two-factor authentication (2FA) that requires the user to enter a time-based single-use code that&#x27;s generated using a mobile app like Google Authenticator or Authy.<br /><br />The user will first need to register their device on the service they wish to log in to by scanning a QR code or entering a secret key from the service.</p>
              </div>
            </div>
            <div id="Glossary-U" className="w-layout-vflex glossary-container">
              <div className="first-letter">U</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">User Anonymization</div>
                <p className="paragraph-19">User anonymization is the process of deleting the identity and all other data of a normal user. When you anonymize a user, only the user ID is kept. You can anonymize a user immediately or schedule their anonymization.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">User Deletion</div>
                <p className="paragraph-19">User delete is the process of completely deleting a user&#x27;s account account and all their associated data. This can be scheduled or done immediately.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">User Settings</div>
                <p className="paragraph-19">This is one of the default pages Authgear provides as part of Auth UI. On this page, your users can view their account details and settings.</p>
              </div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">UserInfo Endpoint</div>
                <p className="paragraph-19">The UserInfo endpoint is an HTTP endpoint in your Authgear application that your client application can send requests to on behalf of an authenticated user for their account information. This endpoint returns a JSON response with data such as the user&#x27;s email, and sub.</p>
              </div>
            </div>
            <div id="Glossary-W" className="w-layout-vflex glossary-container">
              <div className="first-letter">W</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Webhooks</div>
                <p className="paragraph-19">A webhook is a method of sending notifications of events on one web application to another web application.<br /><br />Authgear webhooks can send HTTP POST requests to a URL you specify when an event like new user creation is triggered. The HTTP request contains a payload with data related to the event. Using webhooks you can implement more custom features for your Authgear project.</p>
              </div>
            </div>
            <div id="Glossary-Y" className="w-layout-vflex glossary-container">
              <div className="first-letter">Y</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">YubiKey</div>
                <p className="paragraph-19">A YubiKey is a small hardware security device developed by Yubico that provides strong authentication for computers, networks, and online services by requiring users to physically insert or tap the key to verify their identity. It supports the FIDO2 standard and ensure that access cannot be gained without the physical key, making it highly resistant to phishing and account takeovers.</p>
              </div>
            </div>
            <div id="Glossary-Z" className="w-layout-vflex glossary-container">
              <div className="first-letter">Z</div>
              <div className="w-layout-hflex glossary-block">
                <div className="text-block-85">Zero-Trust</div>
                <p className="paragraph-19">Zero trust is a security model that assumes no user, device, or system—whether inside or outside an organisation’s network—should be trusted by default, requiring strict identity verification and continuous authentication for every access request. Instead of relying on a traditional network perimeter, zero trust enforces least-privilege access, granular controls, and ongoing monitoring, aiming to minimise the risk of breaches and prevent attackers from moving laterally within the network.</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="login-default-inner-section"></div>
        </section>


        {/* Apollo */}






      </div>

      <PageScripts scripts={pageScripts} />
    </>
  );
}
