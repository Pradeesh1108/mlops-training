import { formatDate } from '../utils/helpers';

export function exportJSON(analysis) {
  const data = {
    report: {
      generatedAt: new Date().toISOString(),
      platform: 'TruthLens AI',
      version: '1.0.0',
    },
    analysis: {
      id: analysis.id,
      timestamp: analysis.timestamp,
      modality: analysis.modality,
      prediction: analysis.prediction,
      confidence: analysis.confidence,
      riskScore: analysis.riskScore,
      inputPreview: analysis.inputPreview,
      details: analysis.details,
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `truthlens-report-${analysis.id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateTextReport(analysis) {
  const date = formatDate(analysis.timestamp);
  const lines = [
    '═══════════════════════════════════════════════════════════',
    '                    TRUTHLENS AI REPORT                    ',
    '═══════════════════════════════════════════════════════════',
    '',
    `Report Generated: ${date}`,
    `Analysis ID: ${analysis.id}`,
    '',
    '───────────────────────────────────────────────────────────',
    '  CONTENT INFORMATION',
    '───────────────────────────────────────────────────────────',
    `  Modality:      ${analysis.modality.toUpperCase()}`,
    `  Source:         ${analysis.fileName || analysis.inputPreview?.substring(0, 50) || 'N/A'}`,
    `  Analyzed On:    ${date}`,
    '',
    '───────────────────────────────────────────────────────────',
    '  ANALYSIS RESULTS',
    '───────────────────────────────────────────────────────────',
    `  Prediction:     ${analysis.prediction}`,
    `  Confidence:     ${analysis.confidence}%`,
    `  Risk Score:     ${analysis.riskScore}%`,
    `  Model Used:     ${analysis.details?.model || 'N/A'}`,
    '',
    '───────────────────────────────────────────────────────────',
    '  AI EXPLANATION',
    '───────────────────────────────────────────────────────────',
    `  ${analysis.details?.explanation || 'No explanation available.'}`,
    '',
    '───────────────────────────────────────────────────────────',
    '  DETAILED METRICS',
    '───────────────────────────────────────────────────────────',
  ];

  if (analysis.details) {
    const exclude = ['model', 'explanation'];
    Object.entries(analysis.details).forEach(([key, value]) => {
      if (!exclude.includes(key)) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        lines.push(`  ${label}: ${typeof value === 'number' ? value + '%' : value}`);
      }
    });
  }

  lines.push('');
  lines.push('───────────────────────────────────────────────────────────');
  lines.push('  RISK ASSESSMENT');
  lines.push('───────────────────────────────────────────────────────────');

  const risk = analysis.riskScore;
  let riskLevel, riskDesc;
  if (risk >= 75) {
    riskLevel = 'CRITICAL';
    riskDesc = 'High probability of manipulated or AI-generated content.';
  } else if (risk >= 50) {
    riskLevel = 'HIGH';
    riskDesc = 'Significant indicators of potential manipulation detected.';
  } else if (risk >= 25) {
    riskLevel = 'MODERATE';
    riskDesc = 'Some anomalies detected but content may be authentic.';
  } else {
    riskLevel = 'LOW';
    riskDesc = 'Content appears authentic with minimal risk indicators.';
  }

  lines.push(`  Risk Level:     ${riskLevel}`);
  lines.push(`  Assessment:     ${riskDesc}`);
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('  Powered by TruthLens AI | truthlens.ai');
  lines.push('═══════════════════════════════════════════════════════════');

  return lines.join('\n');
}

export function downloadTextReport(analysis) {
  const report = generateTextReport(analysis);
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `truthlens-report-${analysis.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
