'use client';

import { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotationType } from 'rough-notation/lib/model';

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  action?: RoughAnnotationType;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  /** Start animation only when element enters viewport */
  isView?: boolean;
}

export function Highlighter({
  children,
  color = '#ffd1dc',
  action = 'highlight',
  strokeWidth = 1.5,
  animationDuration = 500,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const annotation = annotate(el, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    if (!isView) {
      annotation.show();
      return () => annotation.remove();
    }

    // Viewport-triggered
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          annotation.show();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      annotation.remove();
    };
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline, isView]);

  return <span ref={ref}>{children}</span>;
}
