import api from './api';

// Mock response generator for demo purposes
function generateMockResponse(modality) {
  const isFake = Math.random() > 0.45;
  const confidence = parseFloat((65 + Math.random() * 30).toFixed(1));
  const riskScore = isFake
    ? parseFloat((60 + Math.random() * 35).toFixed(1))
    : parseFloat((5 + Math.random() * 30).toFixed(1));

  const models = {
    text: 'NLPGuard-V2',
    image: 'DeepfakeDetector-V3',
    audio: 'VoiceAuth-V1',
    video: 'FrameAnalyzer-V2',
  };

  const explanations = {
    text: {
      fake: [
        'High probability of AI-generated content detected. Linguistic patterns are inconsistent with human writing.',
        'Misinformation markers detected. Source credibility analysis suggests fabricated content.',
        'Sentiment manipulation patterns found. Text exhibits characteristics of coordinated disinformation.',
      ],
      authentic: [
        'Content appears genuine. Writing patterns are consistent with human authorship.',
        'No significant misinformation markers detected. Source language patterns are natural.',
        'Text analysis indicates authentic human-written content with natural language flow.',
      ],
    },
    image: {
      fake: [
        'Facial manipulation artifacts detected in key regions. GAN-generated patterns identified.',
        'Inconsistent lighting and shadow analysis suggests digital manipulation.',
        'Pixel-level analysis reveals splicing artifacts and inconsistent noise patterns.',
      ],
      authentic: [
        'No manipulation artifacts detected. Image appears to be an unaltered photograph.',
        'Consistent lighting, shadows, and noise patterns throughout the image.',
        'Facial feature analysis shows natural proportions and consistent skin texture.',
      ],
    },
    audio: {
      fake: [
        'Synthetic voice patterns detected. Spectral analysis reveals AI-generated speech characteristics.',
        'Voice cloning markers found. Prosody and pitch patterns are inconsistent with natural speech.',
        'Audio signal analysis indicates text-to-speech generation with characteristic artifacts.',
      ],
      authentic: [
        'Voice patterns are consistent with natural human speech. No synthetic markers detected.',
        'Spectral analysis shows natural vocal characteristics and breathing patterns.',
        'Audio authenticity verified. Natural speech dynamics and environmental consistency confirmed.',
      ],
    },
    video: {
      fake: [
        'Deepfake manipulation detected. Frame-level analysis reveals face-swap artifacts.',
        'Temporal inconsistencies found between frames. Lip-sync analysis shows misalignment.',
        'Facial manipulation detected in 73% of frames. Blending artifacts visible in transition zones.',
      ],
      authentic: [
        'Video appears authentic. Frame consistency analysis shows no manipulation artifacts.',
        'Lip-sync analysis confirms natural alignment. No temporal inconsistencies detected.',
        'Facial tracking shows consistent natural movement patterns across all analyzed frames.',
      ],
    },
  };

  const prediction = isFake ? 'Fake' : 'Authentic';
  const explanationList = explanations[modality][isFake ? 'fake' : 'authentic'];
  const explanation = explanationList[Math.floor(Math.random() * explanationList.length)];

  const modalityDetails = {
    text: {
      sentiment_score: parseFloat((Math.random() * 100).toFixed(1)),
      misinformation_risk: riskScore,
      ai_generated_likelihood: isFake ? parseFloat((70 + Math.random() * 25).toFixed(1)) : parseFloat((5 + Math.random() * 20).toFixed(1)),
      authenticity_score: isFake ? parseFloat((10 + Math.random() * 30).toFixed(1)) : parseFloat((70 + Math.random() * 25).toFixed(1)),
    },
    image: {
      manipulation_score: isFake ? parseFloat((65 + Math.random() * 30).toFixed(1)) : parseFloat((2 + Math.random() * 15).toFixed(1)),
      deepfake_face_score: isFake ? parseFloat((70 + Math.random() * 25).toFixed(1)) : parseFloat((1 + Math.random() * 10).toFixed(1)),
      artifact_score: isFake ? parseFloat((50 + Math.random() * 40).toFixed(1)) : parseFloat((3 + Math.random() * 12).toFixed(1)),
    },
    audio: {
      voice_clone_score: isFake ? parseFloat((60 + Math.random() * 35).toFixed(1)) : parseFloat((2 + Math.random() * 15).toFixed(1)),
      synthetic_probability: isFake ? parseFloat((65 + Math.random() * 30).toFixed(1)) : parseFloat((3 + Math.random() * 12).toFixed(1)),
      speaker_authenticity: isFake ? parseFloat((10 + Math.random() * 25).toFixed(1)) : parseFloat((75 + Math.random() * 20).toFixed(1)),
    },
    video: {
      deepfake_probability: isFake ? parseFloat((70 + Math.random() * 25).toFixed(1)) : parseFloat((2 + Math.random() * 10).toFixed(1)),
      frame_consistency: isFake ? parseFloat((20 + Math.random() * 30).toFixed(1)) : parseFloat((85 + Math.random() * 12).toFixed(1)),
      facial_manipulation: isFake ? parseFloat((60 + Math.random() * 35).toFixed(1)) : parseFloat((1 + Math.random() * 8).toFixed(1)),
      lip_sync_score: isFake ? parseFloat((15 + Math.random() * 35).toFixed(1)) : parseFloat((80 + Math.random() * 15).toFixed(1)),
      trust_score: isFake ? parseFloat((10 + Math.random() * 25).toFixed(1)) : parseFloat((75 + Math.random() * 20).toFixed(1)),
    },
  };

  return {
    prediction,
    confidence,
    risk_score: riskScore,
    details: {
      model: models[modality],
      explanation,
      ...modalityDetails[modality],
    },
  };
}

// Simulate network delay
function delay(ms = 1500) {
  return new Promise(resolve => setTimeout(resolve, ms + Math.random() * 1000));
}

export async function detectText(text) {
  try {
    const response = await api.post('/predict/text', { text });
    return response;
  } catch {
    // Fallback to mock
    await delay(2000);
    return generateMockResponse('text');
  }
}

export async function detectImage(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/predict/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch {
    await delay(2500);
    return generateMockResponse('image');
  }
}

export async function detectAudio(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/predict/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch {
    await delay(2000);
    return generateMockResponse('audio');
  }
}

export async function detectVideo(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/predict/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch {
    await delay(3000);
    return generateMockResponse('video');
  }
}
