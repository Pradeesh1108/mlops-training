import { motion } from 'framer-motion';
import { MODALITIES } from '../../utils/constants';

export default function Sidebar({ activeModality, onSelectModality }) {
  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-3 lg:sticky lg:top-24">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 px-3 py-2">
          Analysis Modules
        </h3>
        <nav className="space-y-1">
          {MODALITIES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModality === mod.key;
            return (
              <button
                key={mod.key}
                onClick={() => onSelectModality(mod.key)}
                className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'dark:text-white text-gray-900'
                    : 'dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${mod.gradient} opacity-10`}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? `bg-gradient-to-br ${mod.gradient} text-white shadow-md`
                    : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="relative">
                  <span className="block">{mod.label}</span>
                  <span className="block text-xs dark:text-gray-500 text-gray-400 font-normal mt-0.5 line-clamp-1">
                    {mod.description.split('.')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
