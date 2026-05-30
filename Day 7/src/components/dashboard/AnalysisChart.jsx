import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { CHART_COLORS } from '../../utils/constants';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-dark-surface bg-white rounded-lg border dark:border-dark-border border-light-border p-3 shadow-xl">
      {label && <p className="text-xs font-medium dark:text-gray-400 text-gray-500 mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export function DistributionChart({ authentic, fake, uncertain }) {
  const data = [
    { name: 'Authentic', value: authentic, color: CHART_COLORS.success },
    { name: 'Fake', value: fake, color: CHART_COLORS.danger },
    { name: 'Uncertain', value: uncertain, color: CHART_COLORS.warning },
  ].filter(d => d.value > 0);

  if (data.length === 0) {
    data.push({ name: 'No Data', value: 1, color: '#334155' });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6"
    >
      <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Content Distribution</h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs dark:text-gray-400 text-gray-500">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function ModalityChart({ byModality }) {
  const { isDark } = useTheme();
  const data = [
    { name: 'Text', count: byModality.text, fill: CHART_COLORS.primary },
    { name: 'Image', count: byModality.image, fill: CHART_COLORS.secondary },
    { name: 'Audio', count: byModality.audio, fill: CHART_COLORS.accent },
    { name: 'Video', count: byModality.video, fill: CHART_COLORS.warning },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6"
    >
      <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Analyses by Modality</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#E2E8F0'} />
          <XAxis
            dataKey="name"
            tick={{ fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Analyses">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function TrendChart({ analyses }) {
  const { isDark } = useTheme();

  // Group by date
  const grouped = {};
  analyses.forEach(a => {
    const date = new Date(a.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!grouped[date]) grouped[date] = { date, total: 0, fake: 0, authentic: 0 };
    grouped[date].total += 1;
    if (a.prediction === 'Fake') grouped[date].fake += 1;
    if (a.prediction === 'Authentic') grouped[date].authentic += 1;
  });

  const data = Object.values(grouped).slice(-7);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6"
    >
      <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Analysis Trends</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAuth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.danger} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.danger} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#E2E8F0'} />
          <XAxis
            dataKey="date"
            tick={{ fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="authentic" stroke={CHART_COLORS.success} fill="url(#colorAuth)" name="Authentic" strokeWidth={2} />
          <Area type="monotone" dataKey="fake" stroke={CHART_COLORS.danger} fill="url(#colorFake)" name="Fake" strokeWidth={2} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs dark:text-gray-400 text-gray-500">{value}</span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default function AnalysisChart({ stats, analyses }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <DistributionChart authentic={stats.authentic} fake={stats.fake} uncertain={stats.uncertain} />
      <ModalityChart byModality={stats.byModality} />
      <TrendChart analyses={analyses} />
    </div>
  );
}
