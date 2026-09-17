'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Placed on the home page.
 * On mount (or when hash changes), reads window.location.hash
 * and smooth-scrolls to the matching section after a short delay
 * to let the page finish rendering.
 */
export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Clear hash from URL without triggering a reload
        window.history.replaceState(null, '', '/');
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 150);
      }
    };

    // Small delay to let Next.js finish hydrating
    setTimeout(() => tryScroll(), 100);
  }, [pathname]);

  return null;
}
