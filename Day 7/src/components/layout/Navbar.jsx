import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiShieldCheck } from 'react-icons/hi2';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="dark:bg-dark-bg/80 bg-white/80 backdrop-blur-xl border-b dark:border-dark-border/50 border-light-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-glow-primary group-hover:shadow-lg transition-shadow">
                <HiShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold dark:text-white text-gray-900">
                  Truth<span className="gradient-text">Lens</span>
                </span>
                <span className="hidden sm:inline text-xs dark:text-gray-500 text-gray-400 ml-1.5 font-medium">AI</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'dark:text-white text-gray-900'
                        : 'dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 dark:bg-white/5 bg-gray-100 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-100 transition-colors"
              >
                {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden dark:bg-dark-bg/95 bg-white/95 backdrop-blur-xl border-b dark:border-dark-border border-light-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'dark:bg-white/5 bg-gray-100 dark:text-white text-gray-900'
                        : 'dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
