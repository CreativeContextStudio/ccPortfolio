'use client';

import { Component, ReactNode } from 'react';
import { Panel, Button } from './ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Panel variant="bordered" headerVariant="warning" title="SYSTEM ERROR">
            <div className="space-y-4">
              <p className="text-sm font-mono text-warning">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs font-mono text-secondary mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs bg-muted/30 p-2 overflow-auto max-h-48 font-mono">
                    {this.state.error.toString()}
                    {this.state.error.stack && `\n\n${this.state.error.stack}`}
                  </pre>
                </details>
              )}
              <div className="flex gap-2">
                <Button variant="primary" onClick={this.handleReset}>
                  TRY AGAIN
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.location.reload()}
                >
                  RELOAD PAGE
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      );
    }

    return this.props.children;
  }
}
