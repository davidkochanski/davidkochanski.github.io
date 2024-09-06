export const NUM_SCROLL_PAGES_PARALLAX = 3;

export const MOBILE_WIDTH_THRESHOLD = 768;

export const shouldReduceMotion = () => {
    return Boolean(window.matchMedia(`(prefers-reduced-motion: reduce)`));
}