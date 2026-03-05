import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll duration in milliseconds (lower = faster)
const SCROLL_DURATION = 400; // 400ms for faster scrolling

// Custom smooth scroll function with controllable speed
function smoothScroll(targetY: number, duration: number = SCROLL_DURATION) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function scroll(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth acceleration/deceleration
    const easeProgress =
      progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    window.scrollY !== targetY && window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

// Component to handle automatic scroll management
export function ScrollToTop() {
  const location = useLocation();
  const prevLocationRef = useRef<string | null>(null);

  useEffect(() => {
    // Check if this is the same page (same pathname)
    const isSamePage = prevLocationRef.current === location.pathname;

    // Check if the URL has a hash
    if (location.hash) {
      // URL with hash: Wait 100ms and then scroll to the target element
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          const targetY = element.getBoundingClientRect().top + window.scrollY;
          smoothScroll(targetY);
        }
      }, 100);
    } else {
      // URL without hash: Scroll to the top of the page
      // Use fast smooth animation if same page, auto if different page
      if (isSamePage) {
        smoothScroll(0);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      }
    }

    // Update the previous location reference
    prevLocationRef.current = location.pathname;
  }, [location]);

  return null;
}
