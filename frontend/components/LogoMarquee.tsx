import styles from './LogoMarquee.module.css';

const DEFAULT_CUSTOMER_LOGOS = [
  { src: '/images/logo-CIMIC2x.png', alt: 'CIMIC' },
  { src: '/images/logo-HKL2x.png', alt: 'HKL' },
  { src: '/images/logo-hkpc2x.png', alt: 'HKPC' },
  { src: '/images/logo-K112x.png', alt: 'K11' },
  { src: '/images/logo-MTR2x.png', alt: 'MTR' },
  { src: '/images/logo-outback2x.png', alt: 'Outback' },
  { src: '/images/logo-cornerstone2x.png', alt: 'Cornerstone' },
  { src: '/images/logo-place2x.png', alt: 'PLACE' },
] as const;

export const ONCE_SDK_MARQUEE_LOGOS = [
  { src: '/images/once_build-for-developer-lang-01-react.svg', alt: 'React' },
  { src: '/images/once_build-for-developer-lang-02-vue.svg', alt: 'Vue.js' },
  { src: '/images/once_build-for-developer-lang-03-angular.svg', alt: 'Angular' },
  { src: '/images/once_build-for-developer-lang-06-flutter.svg', alt: 'Flutter' },
  { src: '/images/once_build-for-developer-lang-07-ios.svg', alt: 'iOS' },
  { src: '/images/once_build-for-developer-lang-08-android.svg', alt: 'Android' },
] as const;

interface Props {
  readStoryLabel?: string;
  /** When set, replaces the default customer logos (e.g. ONCE SDK / framework row). */
  logos?: ReadonlyArray<{ src: string; alt: string }>;
  /** Home Trusted-by row shows the centered “Read customer story” control; hide on other marquees. */
  showReadStoryCta?: boolean;
  /** Root wrapper classes (default: home row with flex-block-85). */
  rootClassName?: string;
  /** Per-logo &lt;img&gt; classes (default: Webflow `logo`). */
  logoImgClassName?: string;
}

export default function LogoMarquee({
  readStoryLabel = 'Read customer story',
  logos: logosProp,
  showReadStoryCta = true,
  rootClassName = 'w-layout-hflex flex-block-85',
  logoImgClassName = 'logo',
}: Props) {
  const logos = logosProp ?? DEFAULT_CUSTOMER_LOGOS;

  return (
    <div className={`${rootClassName} ${styles.root}`}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.logosStrip}>
            {logos.map((logo) => (
              <img
                key={logo.src}
                loading="lazy"
                src={logo.src}
                alt={logo.alt}
                className={logoImgClassName}
              />
            ))}
            {logos.map((logo, idx) => (
              <img
                key={`loop-${logo.src}-${idx}`}
                loading="lazy"
                src={logo.src}
                alt=""
                aria-hidden
                className={`${logoImgClassName} ${styles.duplicateLogo}`}
              />
            ))}
          </div>
        </div>
        {showReadStoryCta ? (
          <a
            href="/customer-stories"
            target="_blank"
            rel="noopener noreferrer"
            className={`link-block-7 w-inline-block ${styles.ctaLink}`}
          >
            <div>{readStoryLabel}</div>
            <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
