import { motion } from 'framer-motion';

export default function Loader({ type = 'fullpage', text = 'Analyzing...' }) {
  if (type === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        {text && <span className="text-sm text-gray-400">{text}</span>}
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="space-y-4 w-full animate-pulse">
        <div className="h-4 bg-gray-700/50 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-700/50 rounded-lg w-1/2" />
        <div className="h-32 bg-gray-700/50 rounded-xl" />
        <div className="flex gap-4">
          <div className="h-20 bg-gray-700/50 rounded-xl flex-1" />
          <div className="h-20 bg-gray-700/50 rounded-xl flex-1" />
        </div>
      </div>
    );
  }

  // Full page loader
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-xl bg-dark-bg"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-1">TruthLens AI</h3>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex space-x-1"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
            <span className="text-sm text-gray-400">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
