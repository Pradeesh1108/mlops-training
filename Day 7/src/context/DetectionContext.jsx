import { createContext, useState, useCallback, useMemo } from 'react';

export const DetectionContext = createContext();

const initialState = {
  analyses: [],
  currentAnalysis: null,
  isAnalyzing: false,
  error: null,
};

export function DetectionProvider({ children }) {
  const [analyses, setAnalyses] = useState(initialState.analyses);
  const [currentAnalysis, setCurrentAnalysis] = useState(initialState.currentAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(initialState.isAnalyzing);
  const [error, setError] = useState(initialState.error);

  const addAnalysis = useCallback((analysis) => {
    const enriched = {
      ...analysis,
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setAnalyses(prev => [enriched, ...prev]);
    setCurrentAnalysis(enriched);
    return enriched;
  }, []);

  const selectAnalysis = useCallback((analysis) => {
    setCurrentAnalysis(analysis);
  }, []);

  const clearAnalyses = useCallback(() => {
    setAnalyses([]);
    setCurrentAnalysis(null);
  }, []);

  const removeAnalysis = useCallback((id) => {
    setAnalyses(prev => prev.filter(a => a.id !== id));
    setCurrentAnalysis(prev => (prev?.id === id ? null : prev));
  }, []);

  const stats = useMemo(() => {
    const total = analyses.length;
    const authentic = analyses.filter(a => a.prediction === 'Authentic').length;
    const fake = analyses.filter(a => a.prediction === 'Fake').length;
    const uncertain = total - authentic - fake;
    const avgConfidence = total > 0
      ? (analyses.reduce((sum, a) => sum + (a.confidence || 0), 0) / total).toFixed(1)
      : 0;

    const byModality = {
      text: analyses.filter(a => a.modality === 'text').length,
      image: analyses.filter(a => a.modality === 'image').length,
      audio: analyses.filter(a => a.modality === 'audio').length,
      video: analyses.filter(a => a.modality === 'video').length,
    };

    return { total, authentic, fake, uncertain, avgConfidence, byModality };
  }, [analyses]);

  const value = useMemo(() => ({
    analyses,
    currentAnalysis,
    isAnalyzing,
    error,
    stats,
    addAnalysis,
    selectAnalysis,
    clearAnalyses,
    removeAnalysis,
    setIsAnalyzing,
    setError,
  }), [analyses, currentAnalysis, isAnalyzing, error, stats, addAnalysis, selectAnalysis, clearAnalyses, removeAnalysis]);

  return (
    <DetectionContext.Provider value={value}>
      {children}
    </DetectionContext.Provider>
  );
}
