import { Link } from 'react-router-dom';
import { HiShieldCheck } from 'react-icons/hi2';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="dark:bg-dark-surface/50 bg-light-surface/50 border-t dark:border-dark-border border-light-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center">
                <HiShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold dark:text-white text-gray-900">
                Truth<span className="gradient-text">Lens</span>
                <span className="text-xs dark:text-gray-500 text-gray-400 ml-1 font-medium">AI</span>
              </span>
            </Link>
            <p className="text-sm dark:text-gray-400 text-gray-500 max-w-sm leading-relaxed">
              AI-powered multimodal deepfake and fake news detection platform. Protecting truth in the digital age.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['Analyzer', 'Dashboard', 'Reports', 'About'].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-sm dark:text-gray-400 text-gray-500 hover:text-primary-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'API Reference', 'Research Paper', 'Contact'].map((label) => (
                <li key={label}>
                  <span className="text-sm dark:text-gray-400 text-gray-500 hover:text-primary-500 transition-colors cursor-pointer">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-8 border-t dark:border-dark-border border-light-border gap-4">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            © {new Date().getFullYear()} TruthLens AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="dark:text-gray-500 text-gray-400 hover:text-primary-500 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="dark:text-gray-500 text-gray-400 hover:text-primary-500 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="dark:text-gray-500 text-gray-400 hover:text-primary-500 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
