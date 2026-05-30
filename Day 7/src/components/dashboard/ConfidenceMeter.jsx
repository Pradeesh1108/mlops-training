import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ConfidenceMeter({ value = 0, size = 120, label = 'Confidence' }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(eased * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  let color, glowColor;
  if (animatedValue >= 75) {
    color = '#22C55E';
    glowColor = 'rgba(34, 197, 94, 0.3)';
  } else if (animatedValue >= 50) {
    color = '#F59E0B';
    glowColor = 'rgba(245, 158, 11, 0.3)';
  } else {
    color = '#EF4444';
    glowColor = 'rgba(239, 68, 68, 0.3)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="dark:text-dark-border text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold dark:text-white text-gray-900" style={{ color }}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-[10px] font-medium dark:text-gray-500 text-gray-400 uppercase tracking-wider">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
