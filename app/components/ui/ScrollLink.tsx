'use client';

import { useRouter, usePathname } from 'next/navigation';

interface ScrollLinkProps {
  sectionId: string;        // e.g. "services"
  children: React.ReactNode;
  className?: string;
}

/**
 * On the home page  → smooth-scrolls to #sectionId.
 * On any other page → navigates to /?scroll=sectionId,
 *   then the home page picks up the query param and scrolls.
 */
export default function ScrollLink({ sectionId, children, className }: ScrollLinkProps) {
  const router   = useRouter();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    if (pathname === '/') {
      // Same page — smooth scroll
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Different page — go home with scroll target in hash
      router.push(`/#${sectionId}`);
    }
  }

  return (
    <a href={`/#${sectionId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
