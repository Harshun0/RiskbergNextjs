'use client';

/**
 * OrbitImages — pure-CSS offset-path circle orbit, no framer-motion needed.
 * Items are spaced evenly around the circle using negative animation-delay.
 */

interface OrbitImagesProps {
  images: string[];
  /** default size for all tiles in px */
  itemSize?: number;
  /** per-item overrides — index matches images array */
  itemSizes?: Record<number, number>;
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  containerSize?: number;
  className?: string;
}

export default function OrbitImages({
  images,
  itemSize = 56,
  itemSizes = {},
  radiusX = 100,
  radiusY = 100,
  duration = 16,
  containerSize = 240,
  className = '',
}: OrbitImagesProps) {
  const r = (radiusX + radiusY) / 2;
  const cx = containerSize / 2;
  const cy = containerSize / 2;

  const circlePath =
    `M ${cx - r} ${cy} ` +
    `A ${r} ${r} 0 1 0 ${cx + r} ${cy} ` +
    `A ${r} ${r} 0 1 0 ${cx - r} ${cy}`;

  const count = images.length;

  return (
    <div
      className={`orbit-root ${className}`}
      style={
        {
          width: containerSize,
          height: containerSize,
          '--orbit-path': `path("${circlePath}")`,
          '--orbit-duration': `${duration}s`,
          '--orbit-item-size': `${itemSize}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <svg
        className="orbit-guide-svg"
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(83,154,210,0.22)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {images.map((src, i) => {
        const size = itemSizes[i] ?? itemSize;
        return (
          <div
            key={src + i}
            className="orbit-item"
            style={
              {
                '--orbit-delay': `${-(duration * i) / count}s`,
                width: `${size}px`,
                height: `${size}px`,
              } as React.CSSProperties
            }
          >
            <img
              src={src}
              alt="ISO badge"
              draggable={false}
              className="orbit-img"
            />
          </div>
        );
      })}
    </div>
  );
}
