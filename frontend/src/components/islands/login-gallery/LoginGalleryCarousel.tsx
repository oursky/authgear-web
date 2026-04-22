import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';

const SWIPE_PX = 48;

export type LoginGalleryCarouselLabels = {
  web: string;
  mobile: string;
  platformPickerAria: string;
  prevSlide: string;
  nextSlide: string;
  goToSlide: string;
};

type Slide = { src: string; alt: string };

type Props = {
  webSlides: Slide[];
  mobileSlides: Slide[];
  title: string;
  labels: LoginGalleryCarouselLabels;
};

export default function LoginGalleryCarousel({ webSlides, mobileSlides, title, labels }: Props) {
  const hasWeb = webSlides.length > 0;
  const hasMobile = mobileSlides.length > 0;
  const [mode, setMode] = useState<'web' | 'mobile'>(() => (hasWeb ? 'web' : 'mobile'));
  const activeSlides = mode === 'web' ? webSlides : mobileSlides;
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const swipeRef = useRef<{ startX: number; pointerId: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (mode === 'web' && !hasWeb && hasMobile) setMode('mobile');
    if (mode === 'mobile' && !hasMobile && hasWeb) setMode('web');
  }, [mode, hasWeb, hasMobile]);

  useEffect(() => {
    setIndex(0);
  }, [mode]);

  useEffect(() => {
    if (index >= activeSlides.length) {
      setIndex(Math.max(0, activeSlides.length - 1));
    }
  }, [activeSlides.length, index]);

  const goPrev = useCallback(() => {
    setIndex((i) => (activeSlides.length <= 0 ? 0 : i <= 0 ? activeSlides.length - 1 : i - 1));
  }, [activeSlides.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (activeSlides.length <= 0 ? 0 : i >= activeSlides.length - 1 ? 0 : i + 1));
  }, [activeSlides.length]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activeSlides.length <= 1) return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      // 箭頭／其他按鈕的點擊會冒泡到此；若在此 setPointerCapture，會打斷按鈕的 click。
      if ((e.target as HTMLElement).closest('button')) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      swipeRef.current = { startX: e.clientX, pointerId: e.pointerId };
    },
    [activeSlides.length]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activeSlides.length <= 1) return;
      const start = swipeRef.current;
      if (!start || start.pointerId !== e.pointerId) return;
      swipeRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const dx = e.clientX - start.startX;
      if (dx > SWIPE_PX) goPrev();
      else if (dx < -SWIPE_PX) goNext();
    },
    [activeSlides.length, goNext, goPrev]
  );

  const onPointerCancel = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (swipeRef.current?.pointerId === e.pointerId) swipeRef.current = null;
  }, []);

  if (!hasWeb && !hasMobile) {
    return (
      <div className="ds-login-gallery-carousel">
        <div
          className="ds-login-gallery-carousel__surface ds-login-gallery-carousel__surface--empty"
          aria-hidden
        >
          <div className="ds-login-gallery-carousel__placeholder" />
        </div>
      </div>
    );
  }

  const showSwitcher = hasWeb || hasMobile;
  const multi = activeSlides.length > 1;
  const n = activeSlides.length;
  const trackPct = n > 0 ? (index * 100) / n : 0;

  return (
    <div className="ds-login-gallery-carousel">
      <div className="ds-login-gallery-carousel__surface">
        {showSwitcher ? (
          <div
            className="ds-login-gallery-carousel__switch"
            role="group"
            aria-label={labels.platformPickerAria}
          >
            <button
              type="button"
              className="ds-login-gallery-carousel__switch-btn"
              aria-pressed={mode === 'web'}
              disabled={!hasWeb}
              onClick={() => hasWeb && setMode('web')}
            >
              <ComputerDesktopIcon className="ds-login-gallery-carousel__switch-icon" aria-hidden />
              <span>{labels.web}</span>
            </button>
            <button
              type="button"
              className="ds-login-gallery-carousel__switch-btn"
              aria-pressed={mode === 'mobile'}
              disabled={!hasMobile}
              onClick={() => hasMobile && setMode('mobile')}
            >
              <DevicePhoneMobileIcon className="ds-login-gallery-carousel__switch-icon" aria-hidden />
              <span>{labels.mobile}</span>
            </button>
          </div>
        ) : null}

        <div
          className={`ds-login-gallery-carousel__viewport${multi ? ' ds-login-gallery-carousel__viewport--swipe' : ''}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onPointerLeave={(e) => {
            if (e.buttons === 0 && swipeRef.current?.pointerId === e.pointerId) swipeRef.current = null;
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label={title}
        >
        {n > 0 ? (
          <div
            className="ds-login-gallery-carousel__track"
            style={{
              width: `${n * 100}%`,
              transform: `translateX(-${trackPct}%)`,
              transition: reduceMotion ? 'none' : 'transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            {activeSlides.map((slide, i) => (
              <div
                key={`${mode}-${i}-${slide.src}`}
                className="ds-login-gallery-carousel__slide"
                style={{ width: `${100 / n}%` }}
                aria-hidden={i !== index}
              >
                <img
                  src={slide.src}
                  alt={slide.alt || title}
                  className="ds-login-gallery-carousel__img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        ) : null}

        {multi ? (
          <>
            <button
              type="button"
              className="ds-login-gallery-carousel__nav ds-login-gallery-carousel__nav--prev"
              onClick={goPrev}
              aria-label={labels.prevSlide}
            >
              <svg
                className="ds-login-gallery-carousel__nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <rect width="20" height="20" fill="white" fillOpacity="0.01" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.13791 4.19527C9.39827 4.45562 9.39827 4.87772 9.13791 5.13807L4.94265 9.33334H16.6665C17.0346 9.33334 17.3332 9.63182 17.3332 10C17.3332 10.3682 17.0346 10.6667 16.6665 10.6667H4.94265L9.13791 14.8619C9.39827 15.1223 9.39827 15.5444 9.13791 15.8048C8.87756 16.0651 8.45545 16.0651 8.19511 15.8048L2.86177 10.4714C2.60141 10.2111 2.60141 9.78895 2.86177 9.5286L8.19511 4.19527C8.45545 3.93491 8.87756 3.93491 9.13791 4.19527Z"
                  fill="#B2B3BD"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ds-login-gallery-carousel__nav ds-login-gallery-carousel__nav--next"
              onClick={goNext}
              aria-label={labels.nextSlide}
            >
              <svg
                className="ds-login-gallery-carousel__nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <rect width="20" height="20" fill="white" fillOpacity="0.01" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.862 4.19527C11.1224 3.93491 11.5445 3.93491 11.8048 4.19527L17.1382 9.5286C17.3985 9.78895 17.3985 10.2111 17.1382 10.4714L11.8048 15.8048C11.5445 16.0651 11.1224 16.0651 10.862 15.8048C10.6017 15.5444 10.6017 15.1223 10.862 14.8619L15.0573 10.6667H3.33341C2.96523 10.6667 2.66675 10.3682 2.66675 10C2.66675 9.63182 2.96523 9.33334 3.33341 9.33334H15.0573L10.862 5.13807C10.6017 4.87772 10.6017 4.45562 10.862 4.19527Z"
                  fill="#B2B3BD"
                />
              </svg>
            </button>
          </>
        ) : null}
        </div>

        {multi ? (
          <div className="ds-login-gallery-carousel__dots" role="tablist" aria-label={labels.goToSlide}>
            {activeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                className="ds-login-gallery-carousel__dot"
                data-active={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                aria-label={`${labels.goToSlide} ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
