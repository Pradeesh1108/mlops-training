import { motion } from 'framer-motion';
import { getStatusColor, formatRelativeTime, getModalityIcon } from '../../utils/helpers';

export default function DetectionTimeline({ analyses }) {
  const recent = analyses.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6"
    >
      <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-5">Recent Analyses</h3>

      <div className="space-y-1">
        {recent.map((analysis, index) => {
          const status = getStatusColor(analysis.prediction);

          return (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 py-3 px-3 rounded-xl dark:hover:bg-white/3 hover:bg-gray-50 transition-colors group"
            >
              {/* Timeline dot */}
              <div className="relative flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full ${status.bg} border-2 ${status.border}`} />
                {index < recent.length - 1 && (
                  <div className="w-px h-8 dark:bg-dark-border bg-light-border mt-1 absolute top-4" />
                )}
              </div>

              {/* Modality icon */}
              <span className="text-lg shrink-0">{getModalityIcon(analysis.modality)}</span>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium dark:text-white text-gray-900 capitalize">
                    {analysis.modality} Analysis
                  </span>
                  <span className={`${status.badge} text-[10px] py-0.5 px-2`}>
                    {analysis.prediction}
                  </span>
                </div>
                <p className="text-xs dark:text-gray-500 text-gray-400 truncate mt-0.5">
                  {analysis.inputPreview || analysis.fileName}
                </p>
              </div>

              {/* Confidence & Time */}
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold ${status.text}`}>
                  {analysis.confidence}%
                </p>
                <p className="text-xs dark:text-gray-500 text-gray-400">
                  {formatRelativeTime(analysis.timestamp)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
