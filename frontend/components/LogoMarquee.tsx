import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/images/logo-CIMIC2x.png',       alt: 'CIMIC' },
  { src: '/images/logo-HKL2x.png',         alt: 'HKL' },
  { src: '/images/logo-hkpc2x.png',        alt: 'HKPC' },
  { src: '/images/logo-K112x.png',         alt: 'K11' },
  { src: '/images/logo-MTR2x.png',         alt: 'MTR' },
  { src: '/images/logo-outback2x.png',     alt: 'Outback' },
  { src: '/images/logo-cornerstone2x.png', alt: 'Cornerstone' },
  { src: '/images/logo-place2x.png',       alt: 'PLACE' },
];

interface Props {
  readStoryLabel?: string;
}

export default function LogoMarquee({ readStoryLabel = 'Read customer story' }: Props) {
  return (
    <div className={`w-layout-hflex flex-block-85 ${styles.root}`}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((i) => (
            <div key={i} className={`w-layout-hflex logos-container ${styles.logosContainer}`}>
              {logos.map((logo) => (
                <img
                  key={logo.src}
                  loading="lazy"
                  src={logo.src}
                  alt={logo.alt}
                  className="logo"
                />
              ))}
            </div>
          ))}
        </div>
        <a
          href="/customer-stories"
          target="_blank"
          rel="noopener noreferrer"
          className={`link-block-7 w-inline-block ${styles.ctaLink}`}
        >
          <div>{readStoryLabel}</div>
          <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
        </a>
      </div>
    </div>
  );
}
