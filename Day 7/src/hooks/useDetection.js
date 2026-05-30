import { useContext, useCallback } from 'react';
import { DetectionContext } from '../context/DetectionContext';
import { detectText, detectImage, detectAudio, detectVideo } from '../services/detectionService';

export function useDetection() {
  const context = useContext(DetectionContext);
  if (!context) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }

  const { addAnalysis, setIsAnalyzing, setError } = context;

  const analyze = useCallback(async (modality, data, fileName = '') => {
    setIsAnalyzing(true);
    setError(null);
    try {
      let result;
      switch (modality) {
        case 'text':
          result = await detectText(data);
          break;
        case 'image':
          result = await detectImage(data);
          break;
        case 'audio':
          result = await detectAudio(data);
          break;
        case 'video':
          result = await detectVideo(data);
          break;
        default:
          throw new Error(`Unknown modality: ${modality}`);
      }

      const analysis = addAnalysis({
        modality,
        prediction: result.prediction,
        confidence: result.confidence,
        riskScore: result.risk_score,
        details: result.details,
        inputPreview: modality === 'text' ? data.substring(0, 200) : fileName,
        fileName,
      });

      return analysis;
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, [addAnalysis, setIsAnalyzing, setError]);

  return {
    ...context,
    analyzeText: (text) => analyze('text', text, 'Text Input'),
    analyzeImage: (file) => analyze('image', file, file.name),
    analyzeAudio: (file) => analyze('audio', file, file.name),
    analyzeVideo: (file) => analyze('video', file, file.name),
  };
}
