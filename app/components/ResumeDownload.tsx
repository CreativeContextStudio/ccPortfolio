'use client';

import { motion } from 'framer-motion';
import { Panel, Button } from './ui';

interface ResumeDownloadProps {
  pdfUrl?: string;
  className?: string;
}

export default function ResumeDownload({
  pdfUrl = '/resume.pdf',
  className,
}: ResumeDownloadProps) {
  const handleDownload = () => {
    if (pdfUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Panel
      variant="elevated"
      headerVariant="primary"
      title="DOWNLOAD RESUME"
      className={className}
    >
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-secondary font-mono">
            Complete professional history and experience
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleDownload}
          className="w-full sm:w-auto px-8"
          disabled
        >
          DOWNLOAD RESUME
        </Button>

        <p className="text-xs font-mono text-secondary uppercase">
          COMING SOON
        </p>
      </div>
    </Panel>
  );
}

