import { HiDownload, HiCode } from 'react-icons/hi';
import Button from '../common/Button';
import { exportJSON, downloadTextReport } from '../../services/reportService';

export default function ReportExport({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        size="sm"
        icon={HiDownload}
        onClick={() => downloadTextReport(analysis)}
      >
        Download Report
      </Button>
      <Button
        variant="outline"
        size="sm"
        icon={HiCode}
        onClick={() => exportJSON(analysis)}
      >
        Export JSON
      </Button>
    </div>
  );
}
