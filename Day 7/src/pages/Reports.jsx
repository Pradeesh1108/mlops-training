import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiDocumentReport } from 'react-icons/hi';
import { useDetection } from '../hooks/useDetection';
import ReportViewer from '../components/reports/ReportViewer';
import EmptyState from '../components/common/EmptyState';
import { getStatusColor, formatRelativeTime, getModalityIcon, truncateText } from '../utils/helpers';

export default function Reports() {
  const { analyses, currentAnalysis, selectAnalysis } = useDetection();
  const [selectedId, setSelectedId] = useState(currentAnalysis?.id || null);
  const navigate = useNavigate();

  const selectedAnalysis = analyses.find(a => a.id === selectedId) || null;

  if (analyses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">
            Analysis <span className="gradient-text">Reports</span>
          </h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            View and export detailed reports for your analyses.
          </p>
        </motion.div>

        <EmptyState
          icon={HiDocumentReport}
          title="No reports available"
          description="Complete an analysis first to generate a detailed report."
          actionLabel="Go to Analyzer"
          onAction={() => navigate('/analyzer')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">
          Analysis <span className="gradient-text">Reports</span>
        </h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
          View and export detailed reports for your analyses.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Analysis List */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-3 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 px-3 py-2">
              Past Analyses ({analyses.length})
            </h3>
            <div className="space-y-1">
              {analyses.map((analysis) => {
                const status = getStatusColor(analysis.prediction);
                const isSelected = selectedId === analysis.id;

                return (
                  <button
                    key={analysis.id}
                    onClick={() => {
                      setSelectedId(analysis.id);
                      selectAnalysis(analysis);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'dark:bg-primary-500/10 bg-primary-50 border border-primary-500/20'
                        : 'dark:hover:bg-white/3 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{getModalityIcon(analysis.modality)}</span>
                      <span className="text-sm font-medium dark:text-white text-gray-900 capitalize">
                        {analysis.modality}
                      </span>
                      <span className={`${status.badge} text-[10px] py-0 px-1.5 ml-auto`}>
                        {analysis.prediction}
                      </span>
                    </div>
                    <p className="text-xs dark:text-gray-500 text-gray-400 truncate pl-6">
                      {truncateText(analysis.inputPreview || analysis.fileName, 40)}
                    </p>
                    <p className="text-[10px] dark:text-gray-600 text-gray-400 pl-6 mt-0.5">
                      {formatRelativeTime(analysis.timestamp)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {selectedAnalysis ? (
              <motion.div
                key={selectedAnalysis.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6"
              >
                <ReportViewer analysis={selectedAnalysis} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-12 text-center"
              >
                <HiDocumentReport className="w-12 h-12 mx-auto dark:text-gray-600 text-gray-300 mb-4" />
                <p className="text-sm dark:text-gray-400 text-gray-500">Select an analysis to view its report</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
