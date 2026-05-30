import { motion } from 'framer-motion';
import { HiOutlineInboxIn } from 'react-icons/hi';
import Button from './Button';

export default function EmptyState({
  icon: Icon = HiOutlineInboxIn,
  title = 'No data yet',
  description = 'Get started by running your first analysis.',
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-6 border border-primary-500/20"
      >
        <Icon className="w-10 h-10 text-primary-400" />
      </motion.div>

      <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">{title}</h3>
      <p className="text-sm dark:text-gray-400 text-gray-500 max-w-sm mb-6">{description}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
