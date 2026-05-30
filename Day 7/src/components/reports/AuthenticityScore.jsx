import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AuthenticityScore({ score = 0, size = 160 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(eased * score);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [score]);

  let label, color, bgGlow;
  if (score >= 70) {
    label = 'Authentic';
    color = '#22C55E';
    bgGlow = 'rgba(34, 197, 94, 0.15)';
  } else if (score >= 40) {
    label = 'Suspicious';
    color = '#F59E0B';
    bgGlow = 'rgba(245, 158, 11, 0.15)';
  } else {
    label = 'Likely Fake';
    color = '#EF4444';
    bgGlow = 'rgba(239, 68, 68, 0.15)';
  }

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center"
    >
      <div
        className="relative rounded-full p-2"
        style={{ background: `radial-gradient(circle, ${bgGlow} 0%, transparent 70%)` }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="dark:text-dark-border text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
              transition: 'stroke-dashoffset 0.05s linear',
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {Math.round(animatedScore)}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider dark:text-gray-400 text-gray-500 mt-0.5">
            out of 100
          </span>
        </div>
      </div>

      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-sm font-bold uppercase tracking-wider"
        style={{ color }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
