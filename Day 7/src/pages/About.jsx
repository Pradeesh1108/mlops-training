import { motion } from 'framer-motion';
import { HiShieldCheck } from 'react-icons/hi2';
import { FaReact, FaPython, FaBrain } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiTensorflow } from 'react-icons/si';
import { MODALITIES, ARCHITECTURE_STEPS } from '../utils/constants';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const techStack = [
  { name: 'React.js', icon: FaReact, color: '#61DAFB' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Deep Learning', icon: FaBrain, color: '#8B5CF6' },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
          <HiShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
          About <span className="gradient-text">TruthLens AI</span>
        </h1>
        <p className="text-lg dark:text-gray-400 text-gray-500 max-w-2xl mx-auto leading-relaxed">
          TruthLens AI is an advanced multimodal deepfake and fake news detection platform
          designed to protect the integrity of digital content in an era of increasingly
          sophisticated AI-generated media.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">Our Mission</h2>
              <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-4">
                In a world where AI can generate hyper-realistic fake content in seconds,
                the need for reliable detection tools has never been greater. TruthLens AI
                empowers journalists, fact-checkers, government agencies, and everyday users
                to verify content authenticity with confidence.
              </p>
              <p className="dark:text-gray-400 text-gray-500 leading-relaxed">
                Our platform leverages cutting-edge deep learning models across four modalities —
                text, image, audio, and video — providing comprehensive analysis with detailed
                confidence scores and explainable AI decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '99.2%', label: 'Detection Accuracy', color: 'text-success-500' },
                { value: '<2s', label: 'Avg Analysis Time', color: 'text-primary-500' },
                { value: '4', label: 'Content Modalities', color: 'text-secondary-500' },
                { value: '50K+', label: 'Models Trained On', color: 'text-accent-500' },
              ].map((stat) => (
                <div key={stat.label} className="dark:bg-dark-bg/50 bg-gray-50 rounded-xl p-4 text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs dark:text-gray-500 text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8 text-center">
          Technology <span className="gradient-text">Stack</span>
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={item}
                whileHover={{ y: -5, scale: 1.05 }}
                className="dark:bg-dark-surface bg-light-surface rounded-2xl border dark:border-dark-border border-light-border p-6 text-center group hover:border-primary-500/30 transition-all"
              >
                <Icon className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ color: tech.color }} />
                <p className="text-sm font-medium dark:text-white text-gray-900">{tech.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8 text-center">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="space-y-4">
          {ARCHITECTURE_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 dark:bg-dark-surface bg-light-surface rounded-xl border dark:border-dark-border border-light-border p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-white font-bold shadow-md">
                {step.step}
              </div>
              <div>
                <h3 className="text-base font-semibold dark:text-white text-gray-900">{step.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Supported Modalities */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8 text-center">
          Supported <span className="gradient-text">Modalities</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODALITIES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.key}
                className="flex items-start gap-4 dark:bg-dark-surface bg-light-surface rounded-xl border dark:border-dark-border border-light-border p-5"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold dark:text-white text-gray-900">{mod.label}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{mod.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
