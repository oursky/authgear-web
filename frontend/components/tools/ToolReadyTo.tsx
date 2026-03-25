type Props = {
  title?: string;
  subtitle?: string;
};

export default function ToolReadyTo({
  title = 'Ready to Supercharge Your Authentication?',
  subtitle = 'Experience seamless, secure, and scalable identity management with Authgear.',
}: Props) {
  return (
    <section className="tools-ready-to">
      <div className="login-default-inner-section gallery-footer">
        <img src="/images/ui_gallery_authgear-circle.svg" loading="lazy" alt="" />
        <p className="paragraph-13">{title}</p>
        <p className="paragraph-12 speciial-color">{subtitle}</p>
        <a href="https://accounts.portal.authgear.com/signup" className="gallery-button gallery-page-button w-button">Get Started for Free</a>
      </div>
    </section>
  );
}
