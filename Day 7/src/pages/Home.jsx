import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiShieldCheck, HiLightningBolt, HiChartBar, HiLockClosed } from 'react-icons/hi';
import { MODALITIES, FEATURES, ARCHITECTURE_STEPS } from '../utils/constants';
import Button from '../components/common/Button';

// Floating orbs background
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb orb-primary w-[500px] h-[500px] -top-48 -left-48 animate-float" />
      <div className="orb orb-secondary w-[400px] h-[400px] top-1/3 -right-32 animate-float-delayed" />
      <div className="orb orb-accent w-[350px] h-[350px] -bottom-32 left-1/4 animate-float-slow" />
    </div>
  );
}

// Animated neural network SVG
function NeuralNetwork() {
  const nodes = [
    { x: 50, y: 30 }, { x: 150, y: 60 }, { x: 250, y: 25 },
    { x: 100, y: 120 }, { x: 200, y: 100 }, { x: 300, y: 80 },
    { x: 50, y: 180 }, { x: 170, y: 170 }, { x: 280, y: 160 },
    { x: 120, y: 230 }, { x: 220, y: 220 }, { x: 340, y: 200 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
    [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [6, 9], [7, 10],
    [8, 11], [9, 10], [10, 11],
  ];

  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto opacity-60">
      <defs>
        <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {connections.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="url(#neural-gradient)"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="5"
          fill="url(#neural-gradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur={`${2 + Math.random() * 2}s`}
            repeatCount="indefinite"
          />
        </motion.circle>
      ))}
    </svg>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <FloatingOrbs />
        <div className="bg-grid-pattern absolute inset-0 dark:opacity-100 opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-primary-500/10 bg-primary-50 border dark:border-primary-500/20 border-primary-200 mb-6"
              >
                <HiShieldCheck className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-semibold text-primary-500">AI-Powered Detection Platform</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="dark:text-white text-gray-900">Defend Truth</span>
                <br />
                <span className="gradient-text">in the Digital Age</span>
              </h1>

              <p className="text-lg dark:text-gray-400 text-gray-500 leading-relaxed max-w-lg mb-8">
                Advanced multimodal AI that detects deepfakes, AI-generated content, and
                misinformation across text, images, audio, and video in real-time.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/analyzer">
                  <Button size="lg" icon={HiArrowRight} iconPosition="right">
                    Start Analyzing
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-10">
                {[
                  { value: '99.2%', label: 'Accuracy' },
                  { value: '<2s', label: 'Analysis Time' },
                  { value: '4', label: 'Modalities' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Neural Network Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/5 to-accent-500/10 rounded-3xl blur-3xl" />
                <div className="relative dark:bg-dark-surface/50 bg-white/50 rounded-3xl border dark:border-dark-border border-light-border p-8 backdrop-blur-sm">
                  <NeuralNetwork />
                  <div className="text-center mt-4">
                    <p className="text-sm font-semibold dark:text-white text-gray-900">Neural Analysis Engine</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400">Real-time content verification</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Modalities */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Multi-Modal <span className="gradient-text">Detection</span>
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
              Comprehensive analysis across four content modalities, powered by specialized AI models.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {MODALITIES.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.key}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link
                    to="/analyzer"
                    className="block dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6 h-full transition-all duration-300 hover:border-primary-500/30 dark:hover:shadow-glow-primary"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{mod.label}</h3>
                    <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">{mod.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 dark:bg-dark-surface/30 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Enterprise-Grade <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
              Built for governments, media agencies, and fact-checking organizations worldwide.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6 hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
              Our pipeline ensures accurate, fast, and reliable content analysis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARCHITECTURE_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-glow-primary">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-500">{step.description}</p>
                </div>

                {/* Connector arrow */}
                {index < ARCHITECTURE_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <HiArrowRight className="w-6 h-6 dark:text-gray-600 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
            Ready to Detect the <span className="gradient-text">Truth</span>?
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-500 mb-8 max-w-xl mx-auto">
            Start analyzing content now with our state-of-the-art AI detection platform. No setup required.
          </p>
          <Link to="/analyzer">
            <Button size="lg" icon={HiArrowRight} iconPosition="right">
              Start Analyzing Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
