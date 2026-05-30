import { useState, useRef, useCallback } from 'react';
import { HiPhotograph, HiX, HiCloudUpload } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import UploadCard from './UploadCard';
import Button from '../common/Button';
import { useDetection } from '../../hooks/useDetection';
import { validateImage } from '../../utils/validators';
import { formatFileSize } from '../../utils/helpers';
import { FILE_LIMITS } from '../../utils/constants';
import ResultSummary from '../dashboard/ResultSummary';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const { analyzeImage, isAnalyzing } = useDetection();

  const handleFile = useCallback((f) => {
    const validation = validateImage(f);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setError('');
    try {
      const analysis = await analyzeImage(file);
      setResult(analysis);
    } catch (err) {
      setError(err.message || 'Analysis failed.');
    }
  };

  return (
    <UploadCard
      icon={HiPhotograph}
      title="Image Analysis"
      description="Detect deepfake images, face manipulation, and digital alterations"
      gradient="from-cyan-500 to-teal-500"
    >
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`upload-zone flex flex-col items-center justify-center py-16 px-6 transition-all ${
                isDragging ? 'active border-primary-500 dark:bg-primary-500/5 bg-primary-50' : ''
              }`}
            >
              <HiCloudUpload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-primary-500' : 'dark:text-gray-500 text-gray-400'}`} />
              <p className="text-sm font-medium dark:text-gray-300 text-gray-600 mb-1">
                Drag & drop an image here, or <span className="text-primary-500">browse</span>
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-400">
                Supports: {FILE_LIMITS.image.extensions}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={FILE_LIMITS.image.types.join(',')}
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
              className="relative rounded-xl overflow-hidden border dark:border-dark-border border-light-border"
            >
              <img src={preview} alt="Preview" className="w-full max-h-80 object-contain bg-black/5 dark:bg-black/20" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={removeFile}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-xs text-white/80 font-medium">{file.name}</p>
                <p className="text-xs text-white/50">{formatFileSize(file.size)}</p>
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
            <Button onClick={handleAnalyze} loading={isAnalyzing}>
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
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
