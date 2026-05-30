import { motion } from 'framer-motion';
import { getStatusColor, getRiskLevel, formatDate, formatConfidence, getModalityIcon } from '../../utils/helpers';
import AuthenticityScore from './AuthenticityScore';
import ReportExport from './ReportExport';

export default function ReportViewer({ analysis }) {
  if (!analysis) return null;

  const status = getStatusColor(analysis.prediction);
  const risk = getRiskLevel(analysis.riskScore);
  const authenticityScore = analysis.prediction === 'Authentic'
    ? Math.max(70, 100 - analysis.riskScore)
    : Math.min(40, 100 - analysis.confidence);

  const detailKeys = analysis.details
    ? Object.entries(analysis.details).filter(([key]) => !['model', 'explanation'].includes(key))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
            {getModalityIcon(analysis.modality)}
            Analysis Report
          </h2>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            ID: {analysis.id} • {formatDate(analysis.timestamp)}
          </p>
        </div>
        <ReportExport analysis={analysis} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Authenticity Score */}
        <div className="flex items-center justify-center dark:bg-dark-bg/50 bg-gray-50 rounded-2xl border dark:border-dark-border border-light-border p-8">
          <AuthenticityScore score={authenticityScore} />
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Content Information */}
          <Section title="Content Information">
            <InfoRow label="Modality" value={analysis.modality.charAt(0).toUpperCase() + analysis.modality.slice(1)} />
            <InfoRow label="Source" value={analysis.inputPreview || analysis.fileName || 'N/A'} />
            <InfoRow label="Analyzed On" value={formatDate(analysis.timestamp)} />
            <InfoRow label="Model Used" value={analysis.details?.model || 'N/A'} />
          </Section>

          {/* Analysis Results */}
          <Section title="Analysis Results">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm dark:text-gray-400 text-gray-500">Prediction:</span>
              <span className={`${status.badge}`}>{analysis.prediction}</span>
            </div>
            <InfoRow label="Confidence" value={formatConfidence(analysis.confidence)} />
            <InfoRow label="Risk Score" value={formatConfidence(analysis.riskScore)} />
          </Section>

          {/* Risk Assessment */}
          <Section title="Risk Assessment">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full bg-${risk.color}-500`} />
              <span className={`text-sm font-semibold ${risk.textColor}`}>{risk.level} Risk</span>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">
              {analysis.riskScore >= 75
                ? 'High probability of manipulated or AI-generated content. Exercise extreme caution.'
                : analysis.riskScore >= 50
                  ? 'Significant indicators of potential manipulation detected. Recommend further verification.'
                  : analysis.riskScore >= 25
                    ? 'Some anomalies detected but content may be authentic. Low-moderate concern level.'
                    : 'Content appears authentic with minimal risk indicators. Low concern level.'
              }
            </p>
          </Section>

          {/* AI Explanation */}
          {analysis.details?.explanation && (
            <Section title="AI Explanation">
              <p className="text-sm dark:text-gray-300 text-gray-600 leading-relaxed">
                {analysis.details.explanation}
              </p>
            </Section>
          )}

          {/* Detailed Metrics */}
          {detailKeys.length > 0 && (
            <Section title="Confidence Metrics">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detailKeys.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 px-3 rounded-lg dark:bg-dark-bg/30 bg-gray-50/50">
                    <span className="text-xs dark:text-gray-400 text-gray-500 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-bold dark:text-white text-gray-900">
                      {typeof value === 'number' ? formatConfidence(value) : value}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div className="dark:bg-dark-bg/30 bg-gray-50/50 rounded-xl border dark:border-dark-border/50 border-light-border/50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm dark:text-gray-400 text-gray-500">{label}</span>
      <span className="text-sm font-medium dark:text-white text-gray-900 text-right max-w-[60%] truncate">
        {value}
      </span>
    </div>
  );
}
