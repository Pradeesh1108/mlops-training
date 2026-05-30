import { HiSun, HiMoon } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-xl dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <HiSun className="w-5 h-5 text-yellow-400" />
        ) : (
          <HiMoon className="w-5 h-5 text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
