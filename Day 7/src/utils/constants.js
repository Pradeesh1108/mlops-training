import { HiDocumentText, HiPhotograph, HiMicrophone, HiVideoCamera } from 'react-icons/hi';

export const APP_NAME = 'TruthLens AI';
export const APP_TAGLINE = 'AI-Powered Deepfake & Fake News Detection';
export const APP_VERSION = '1.0.0';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Analyzer', path: '/analyzer' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Reports', path: '/reports' },
  { label: 'About', path: '/about' },
];

export const MODALITIES = [
  {
    key: 'text',
    label: 'Text Analysis',
    description: 'Detect AI-generated text, fake news, and misinformation in articles and social media posts.',
    icon: HiDocumentText,
    color: 'primary',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'image',
    label: 'Image Analysis',
    description: 'Identify deepfake images, face manipulations, and digitally altered photographs.',
    icon: HiPhotograph,
    color: 'secondary',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    key: 'audio',
    label: 'Audio Analysis',
    description: 'Detect voice cloning, synthetic speech, and AI-generated audio content.',
    icon: HiMicrophone,
    color: 'accent',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    key: 'video',
    label: 'Video Analysis',
    description: 'Analyze video for deepfake manipulation, frame inconsistencies, and facial alterations.',
    icon: HiVideoCamera,
    color: 'warning',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export const FEATURES = [
  {
    title: 'Real-Time Analysis',
    description: 'Get instant results with our high-performance AI models processing content in seconds.',
    icon: '⚡',
  },
  {
    title: 'Multi-Modal Detection',
    description: 'Comprehensive analysis across text, image, audio, and video modalities.',
    icon: '🔍',
  },
  {
    title: 'Detailed Reports',
    description: 'Generate professional reports with confidence scores, risk assessments, and AI explanations.',
    icon: '📊',
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and privacy-first architecture for sensitive content analysis.',
    icon: '🔒',
  },
  {
    title: 'AI Explainability',
    description: 'Transparent AI decisions with human-readable explanations for every analysis.',
    icon: '🧠',
  },
  {
    title: 'Batch Processing',
    description: 'Analyze multiple files simultaneously with our efficient parallel processing pipeline.',
    icon: '🚀',
  },
];

export const CHART_COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  accent: '#8B5CF6',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  muted: '#64748B',
};

export const FILE_LIMITS = {
  image: {
    maxSize: 10 * 1024 * 1024, // 10MB
    types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: '.jpg, .jpeg, .png, .webp, .gif',
  },
  audio: {
    maxSize: 25 * 1024 * 1024, // 25MB
    types: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/flac'],
    extensions: '.mp3, .wav, .ogg, .flac',
  },
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    types: ['video/mp4', 'video/avi', 'video/mov', 'video/webm', 'video/quicktime'],
    extensions: '.mp4, .avi, .mov, .webm',
  },
  text: {
    minLength: 20,
    maxLength: 50000,
  },
};

export const ARCHITECTURE_STEPS = [
  { step: 1, title: 'Upload', description: 'Upload or paste your content for analysis' },
  { step: 2, title: 'Pre-processing', description: 'Content is normalized and prepared for AI models' },
  { step: 3, title: 'AI Analysis', description: 'Multiple specialized models analyze the content' },
  { step: 4, title: 'Results', description: 'Comprehensive report with confidence scores' },
];
