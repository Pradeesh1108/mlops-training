import { useState } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import UploadCard from './UploadCard';
import Button from '../common/Button';
import { useDetection } from '../../hooks/useDetection';
import { validateText } from '../../utils/validators';
import { FILE_LIMITS } from '../../utils/constants';
import ResultSummary from '../dashboard/ResultSummary';

export default function TextUpload() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const { analyzeText, isAnalyzing } = useDetection();

  const charCount = text.length;
  const maxChars = FILE_LIMITS.text.maxLength;

  const handleAnalyze = async () => {
    const validation = validateText(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    try {
      const analysis = await analyzeText(text);
      setResult(analysis);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    }
  };

  return (
    <UploadCard
      icon={HiDocumentText}
      title="Text Analysis"
      description="Detect AI-generated text, fake news, and misinformation"
      gradient="from-blue-500 to-cyan-500"
    >
      <div className="space-y-4">
        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Paste an article, news story, or social media post here for analysis..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl dark:bg-dark-bg bg-gray-50 border dark:border-dark-border border-light-border dark:text-white text-gray-900 placeholder:dark:text-gray-600 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm leading-relaxed"
          />
          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 text-xs dark:text-gray-500 text-gray-400 font-mono">
            <span className={charCount > maxChars ? 'text-danger-500' : ''}>
              {charCount.toLocaleString()}
            </span>
            <span> / {maxChars.toLocaleString()}</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-danger-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500" />
            {error}
          </p>
        )}

        {/* Analyze Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            loading={isAnalyzing}
            disabled={!text.trim()}
            size="md"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 pt-6 border-t dark:border-dark-border border-light-border">
            <ResultSummary analysis={result} />
          </div>
        )}
      </div>
    </UploadCard>
  );
}
