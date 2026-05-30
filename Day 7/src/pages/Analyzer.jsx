import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import TextUpload from '../components/upload/TextUpload';
import ImageUpload from '../components/upload/ImageUpload';
import AudioUpload from '../components/upload/AudioUpload';
import VideoUpload from '../components/upload/VideoUpload';

const modules = {
  text: TextUpload,
  image: ImageUpload,
  audio: AudioUpload,
  video: VideoUpload,
};

export default function Analyzer() {
  const [activeModality, setActiveModality] = useState('text');
  const ActiveModule = modules[activeModality];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">
          Content <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
          Upload or paste content to analyze for authenticity and manipulation.
        </p>
      </motion.div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar activeModality={activeModality} onSelectModality={setActiveModality} />

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModality}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveModule />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
