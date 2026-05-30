export function formatConfidence(value) {
  if (typeof value !== 'number') return '0%';
  return `${value.toFixed(1)}%`;
}

export function getRiskLevel(score) {
  if (score >= 75) return { level: 'Critical', color: 'danger', textColor: 'text-danger-500' };
  if (score >= 50) return { level: 'High', color: 'warning', textColor: 'text-warning-500' };
  if (score >= 25) return { level: 'Moderate', color: 'accent', textColor: 'text-accent-500' };
  return { level: 'Low', color: 'success', textColor: 'text-success-500' };
}

export function getStatusColor(prediction) {
  switch (prediction?.toLowerCase()) {
    case 'authentic':
      return { bg: 'bg-success-500/10', text: 'text-success-500', border: 'border-success-500/20', badge: 'badge-authentic' };
    case 'fake':
      return { bg: 'bg-danger-500/10', text: 'text-danger-500', border: 'border-danger-500/20', badge: 'badge-fake' };
    default:
      return { bg: 'bg-warning-500/10', text: 'text-warning-500', border: 'border-warning-500/20', badge: 'badge-uncertain' };
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(dateString);
}

export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export function getModalityIcon(modality) {
  switch (modality) {
    case 'text': return '📝';
    case 'image': return '🖼️';
    case 'audio': return '🎵';
    case 'video': return '🎬';
    default: return '📄';
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
