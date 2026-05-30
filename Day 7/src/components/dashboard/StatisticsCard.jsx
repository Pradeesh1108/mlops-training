import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatisticsCard({ icon: Icon, label, value, trend, color = 'primary', delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated counter
  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplayValue(Math.round(eased * target * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const gradients = {
    primary: 'from-primary-500 to-primary-700',
    secondary: 'from-secondary-500 to-secondary-700',
    accent: 'from-accent-500 to-accent-700',
    success: 'from-success-500 to-success-700',
    danger: 'from-danger-500 to-danger-700',
    warning: 'from-warning-500 to-warning-700',
  };

  const bgColors = {
    primary: 'from-primary-500/10 to-primary-500/5',
    secondary: 'from-secondary-500/10 to-secondary-500/5',
    accent: 'from-accent-500/10 to-accent-500/5',
    success: 'from-success-500/10 to-success-500/5',
    danger: 'from-danger-500/10 to-danger-500/5',
    warning: 'from-warning-500/10 to-warning-500/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className={`relative overflow-hidden rounded-2xl border dark:border-dark-border border-light-border dark:bg-dark-surface bg-light-surface p-5 group hover:border-${color}-500/30 transition-all duration-300`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold dark:text-white text-gray-900">
            {typeof value === 'number' && value % 1 !== 0 ? displayValue.toFixed(1) : Math.round(displayValue)}
            {typeof value === 'string' && value.includes('%') && '%'}
          </p>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trend >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
            </p>
          )}
        </div>

        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradients[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
