import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { getStatusColor, getRiskLevel, formatConfidence, getModalityIcon } from '../../utils/helpers';
import ConfidenceMeter from './ConfidenceMeter';

export default function ResultSummary({ analysis }) {
  const [expanded, setExpanded] = useState(false);

  if (!analysis) return null;

  const status = getStatusColor(analysis.prediction);
  const risk = getRiskLevel(analysis.riskScore);

  // Extract modality-specific detail keys
  const detailKeys = analysis.details
    ? Object.entries(analysis.details).filter(([key]) => !['model', 'explanation'].includes(key))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Top Row: Prediction + Confidence */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-3xl">{getModalityIcon(analysis.modality)}</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`${status.badge}`}>{analysis.prediction}</span>
              <span className={`badge ${risk.color === 'danger' ? 'badge-fake' : risk.color === 'warning' ? 'badge-uncertain' : risk.color === 'success' ? 'badge-authentic' : 'badge-uncertain'}`}>
                {risk.level} Risk
              </span>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-500">
              Model: <span className="font-medium dark:text-gray-300 text-gray-600">{analysis.details?.model || 'N/A'}</span>
            </p>
          </div>
        </div>

        <ConfidenceMeter value={analysis.confidence} size={90} />
      </div>

      {/* Explanation */}
      {analysis.details?.explanation && (
        <div className="px-4 py-3 rounded-xl dark:bg-dark-bg/50 bg-gray-50 border dark:border-dark-border border-light-border">
          <p className="text-xs font-medium uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-1.5">AI Explanation</p>
          <p className="text-sm dark:text-gray-300 text-gray-600 leading-relaxed">{analysis.details.explanation}</p>
        </div>
      )}

      {/* Score Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ScoreBar label="Confidence" value={analysis.confidence} />
        <ScoreBar label="Risk Score" value={analysis.riskScore} inverted />
      </div>

      {/* Expandable Details */}
      {detailKeys.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors"
          >
            {expanded ? 'Hide' : 'Show'} Detailed Metrics
            {expanded ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {detailKeys.map(([key, value]) => (
                    <ScoreBar
                      key={key}
                      label={key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      value={typeof value === 'number' ? value : 0}
                      inverted={key.includes('manipulation') || key.includes('fake') || key.includes('clone') || key.includes('synthetic') || key.includes('risk')}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function ScoreBar({ label, value, inverted = false }) {
  let color;
  if (inverted) {
    color = value >= 60 ? 'bg-danger-500' : value >= 30 ? 'bg-warning-500' : 'bg-success-500';
  } else {
    color = value >= 70 ? 'bg-success-500' : value >= 40 ? 'bg-warning-500' : 'bg-danger-500';
  }

  return (
    <div className="px-3 py-2.5 rounded-xl dark:bg-dark-bg/50 bg-gray-50 border dark:border-dark-border/50 border-light-border/50">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium dark:text-gray-400 text-gray-500 capitalize">{label}</span>
        <span className="text-xs font-bold dark:text-white text-gray-900">{formatConfidence(value)}</span>
      </div>
      <div className="w-full h-1.5 rounded-full dark:bg-dark-border bg-gray-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
