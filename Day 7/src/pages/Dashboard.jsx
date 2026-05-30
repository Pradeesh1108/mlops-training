import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiChartBar, HiShieldCheck, HiExclamation, HiTrendingUp } from 'react-icons/hi';
import { useDetection } from '../hooks/useDetection';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import AnalysisChart from '../components/dashboard/AnalysisChart';
import DetectionTimeline from '../components/dashboard/DetectionTimeline';
import EmptyState from '../components/common/EmptyState';

export default function Dashboard() {
  const { analyses, stats } = useDetection();
  const navigate = useNavigate();

  if (analyses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">
            Results <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Overview of all your content analyses and detection results.
          </p>
        </motion.div>

        <EmptyState
          title="No analyses yet"
          description="Run your first analysis to see results appear on the dashboard."
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
          Results <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
          Overview of all your content analyses and detection results.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatisticsCard
          icon={HiChartBar}
          label="Total Analyses"
          value={stats.total}
          color="primary"
          delay={0}
        />
        <StatisticsCard
          icon={HiShieldCheck}
          label="Authentic Content"
          value={stats.authentic}
          color="success"
          delay={100}
        />
        <StatisticsCard
          icon={HiExclamation}
          label="Fake Content"
          value={stats.fake}
          color="danger"
          delay={200}
        />
        <StatisticsCard
          icon={HiTrendingUp}
          label="Avg Confidence"
          value={parseFloat(stats.avgConfidence)}
          color="accent"
          delay={300}
        />
      </div>

      {/* Charts */}
      <div className="mb-8">
        <AnalysisChart stats={stats} analyses={analyses} />
      </div>

      {/* Timeline */}
      <DetectionTimeline analyses={analyses} />
    </div>
  );
}
