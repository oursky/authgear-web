/**
 * Lottie hero animations.
 *
 * Markup contract (inherited from the Webflow build, so the existing
 * `data-animation-type="lottie"` divs keep working unchanged):
 *
 *   <div data-animation-type="lottie"
 *        data-src="/documents/foo.json"
 *        data-loop="0"        0 = play once and hold, 1 = loop
 *        data-autoplay="1"
 *        data-renderer="svg"></div>
 *
 * The player itself is imported only once an animation scrolls into view, so
 * pages that never reach the hero never pay for it. Under
 * `prefers-reduced-motion: reduce` we render the last frame and stop — every
 * animation on the site is built so its final frame reads on its own.
 */

type LottieModule = typeof import('lottie-web/build/player/lottie_light');

const SELECTOR = '[data-animation-type="lottie"]';

let playerPromise: Promise<LottieModule['default']> | null = null;

function loadPlayer() {
  playerPromise ??= import('lottie-web/build/player/lottie_light').then((m) => m.default);
  return playerPromise;
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

async function play(el: HTMLElement) {
  const path = el.dataset.src;
  if (!path || el.dataset.lottieLoaded === '1') return;
  el.dataset.lottieLoaded = '1';

  const lottie = await loadPlayer();
  const reduced = prefersReducedMotion();
  const animation = lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: el.dataset.loop === '1',
    // Start paused either way: reduced motion jumps to the end, and otherwise
    // we play from the observer callback so the animation starts on screen.
    autoplay: false,
    path,
  });

  animation.addEventListener('DOMLoaded', () => {
    if (reduced) {
      animation.goToAndStop(Math.max(animation.totalFrames - 1, 0), true);
      return;
    }
    if (el.dataset.autoplay !== '0') animation.play();
  });
}

function init() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (elements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(play);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        play(entry.target as HTMLElement);
      }
    },
    { rootMargin: '200px 0px' },
  );

  elements.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
