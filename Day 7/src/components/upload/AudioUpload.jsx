import { useState, useRef, useCallback } from 'react';
import { HiMicrophone, HiX, HiCloudUpload } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import UploadCard from './UploadCard';
import Button from '../common/Button';
import { useDetection } from '../../hooks/useDetection';
import { validateAudio } from '../../utils/validators';
import { formatFileSize } from '../../utils/helpers';
import { FILE_LIMITS } from '../../utils/constants';
import ResultSummary from '../dashboard/ResultSummary';

function WaveformVisualizer() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-16 px-4">
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-accent-500 to-accent-300 rounded-full"
          animate={{ height: ['20%', `${30 + Math.random() * 60}%`, '20%'] }}
          transition={{
            duration: 0.8 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function AudioUpload() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const { analyzeAudio, isAnalyzing } = useDetection();

  const handleFile = useCallback((f) => {
    const validation = validateAudio(f);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    setFile(f);
    setResult(null);
    setAudioUrl(URL.createObjectURL(f));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, [handleFile]);

  const removeFile = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setFile(null);
    setAudioUrl(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setError('');
    try {
      const analysis = await analyzeAudio(file);
      setResult(analysis);
    } catch (err) {
      setError(err.message || 'Analysis failed.');
    }
  };

  return (
    <UploadCard
      icon={HiMicrophone}
      title="Audio Analysis"
      description="Detect voice cloning, synthetic speech, and AI-generated audio"
      gradient="from-violet-500 to-purple-500"
    >
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`upload-zone flex flex-col items-center justify-center py-16 px-6 ${
                isDragging ? 'active' : ''
              }`}
            >
              <HiCloudUpload className={`w-12 h-12 mb-4 ${isDragging ? 'text-accent-500' : 'dark:text-gray-500 text-gray-400'}`} />
              <p className="text-sm font-medium dark:text-gray-300 text-gray-600 mb-1">
                Drag & drop an audio file, or <span className="text-accent-500">browse</span>
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-400">
                Supports: {FILE_LIMITS.audio.extensions}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={FILE_LIMITS.audio.types.join(',')}
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl border dark:border-dark-border border-light-border overflow-hidden dark:bg-dark-bg/50 bg-gray-50/50"
            >
              {/* Waveform */}
              <div className="py-4">
                <WaveformVisualizer />
              </div>

              {/* Audio Player */}
              <div className="px-4 pb-4">
                <audio controls src={audioUrl} className="w-full h-10" />
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between px-4 py-3 border-t dark:border-dark-border border-light-border">
                <div>
                  <p className="text-sm font-medium dark:text-white text-gray-900">{file.name}</p>
                  <p className="text-xs dark:text-gray-500 text-gray-400">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={removeFile}
                  className="p-1.5 rounded-lg dark:hover:bg-white/5 hover:bg-gray-100 dark:text-gray-400 text-gray-500 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className="text-sm text-danger-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500" />
            {error}
          </p>
        )}

        {file && !result && (
          <div className="flex justify-end">
            <Button onClick={handleAnalyze} loading={isAnalyzing} variant="accent">
              {isAnalyzing ? 'Analyzing...' : 'Analyze Audio'}
            </Button>
          </div>
        )}

        {result && (
          <div className="mt-4 pt-4 border-t dark:border-dark-border border-light-border">
            <ResultSummary analysis={result} />
          </div>
        )}
      </div>
    </UploadCard>
  );
}
