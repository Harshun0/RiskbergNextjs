'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const SPRING = { damping: 30, stiffness: 100, mass: 2 };

interface TiltedCardProps {
  children?: React.ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  containerWidth?: string;
  containerHeight?: string;
}

export default function TiltedCard({
  children,
  className = '',
  rotateAmplitude = 12,
  scaleOnHover = 1.04,
  containerWidth = '100%',
  containerHeight = '100%',
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setLastY] = useState(0);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const scale   = useSpring(1, SPRING);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left  - rect.width  / 2;
    const offsetY = e.clientY - rect.top   - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width  / 2)) *  rotateAmplitude);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      className={`tc-figure ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        className="tc-inner"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
