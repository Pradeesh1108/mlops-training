import { motion } from 'framer-motion';

export default function UploadCard({ icon: Icon, title, description, gradient, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-gray-900">{title}</h2>
          <p className="text-sm dark:text-gray-400 text-gray-500">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6">
        {children}
      </div>
    </motion.div>
  );
}
