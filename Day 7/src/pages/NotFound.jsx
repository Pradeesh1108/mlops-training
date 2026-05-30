import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { HiHome } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Glitch 404 */}
        <div className="relative mb-8">
          <motion.h1
            className="text-[120px] sm:text-[180px] font-black gradient-text leading-none select-none"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.h1>
          <motion.h1
            className="absolute inset-0 text-[120px] sm:text-[180px] font-black text-primary-500/20 leading-none select-none"
            animate={{ x: [0, 3, -3, 0], y: [0, -2, 2, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
          >
            404
          </motion.h1>
        </div>

        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm dark:text-gray-400 text-gray-500 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <Link to="/">
          <Button icon={HiHome} size="lg">
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
