'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './ui';

// Development-only logger for client-side
const isDev = process.env.NODE_ENV === 'development';
const clientLogger = {
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
  },
};

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeSnippet({
  code,
  language = 'typescript',
  className,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      clientLogger.error('Failed to copy code:', err);
    }
  };

  // Custom style that matches the theme
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'var(--theme-background)',
      border: '1px solid var(--theme-text)',
      borderRadius: '0',
      padding: '1rem',
      margin: 0,
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      fontFamily: 'var(--font-family-mono)',
      fontSize: '0.875rem',
    },
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-secondary">
          CODE: {language.toUpperCase()}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-xs"
        >
          {copied ? 'COPIED' : 'COPY'}
        </Button>
      </div>
      <div className="border-2 border-current/20">
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

