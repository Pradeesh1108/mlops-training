import { FILE_LIMITS } from './constants';

export function validateText(text) {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Please enter some text to analyze.' };
  }

  const trimmed = text.trim();

  if (trimmed.length < FILE_LIMITS.text.minLength) {
    return {
      valid: false,
      error: `Text must be at least ${FILE_LIMITS.text.minLength} characters. Currently: ${trimmed.length}`,
    };
  }

  if (trimmed.length > FILE_LIMITS.text.maxLength) {
    return {
      valid: false,
      error: `Text must be under ${FILE_LIMITS.text.maxLength.toLocaleString()} characters. Currently: ${trimmed.length.toLocaleString()}`,
    };
  }

  return { valid: true, error: null };
}

export function validateFile(file, modality) {
  if (!file) {
    return { valid: false, error: 'Please select a file to upload.' };
  }

  const limits = FILE_LIMITS[modality];
  if (!limits) {
    return { valid: false, error: `Unknown modality: ${modality}` };
  }

  if (!limits.types.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Accepted formats: ${limits.extensions}`,
    };
  }

  if (file.size > limits.maxSize) {
    const maxMB = (limits.maxSize / (1024 * 1024)).toFixed(0);
    const fileMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${fileMB}MB) exceeds the ${maxMB}MB limit.`,
    };
  }

  return { valid: true, error: null };
}

export function validateImage(file) {
  return validateFile(file, 'image');
}

export function validateAudio(file) {
  return validateFile(file, 'audio');
}

export function validateVideo(file) {
  return validateFile(file, 'video');
}
