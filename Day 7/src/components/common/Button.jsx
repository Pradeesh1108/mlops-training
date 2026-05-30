import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';
import { HiOutlineArrowPath } from 'react-icons/hi2';

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-700 text-white shadow-glow-primary',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-glow-secondary',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-glow-accent',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white shadow-glow-danger',
  success: 'bg-success-500 hover:bg-success-600 text-white shadow-glow-success',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </motion.button>
  );
}
