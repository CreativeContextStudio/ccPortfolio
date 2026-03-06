'use client';

import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') console.error('ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => { this.setState({ hasError: false, error: null }); };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold text-ltx-black">Something went wrong</h2>
            <p className="text-sm text-ltx-muted">An unexpected error occurred. Please try refreshing the page.</p>
            <div className="flex gap-2 justify-center">
              <button onClick={this.handleReset} className="px-4 py-2 bg-ltx-studio text-white rounded-lg text-sm font-medium hover:brightness-110 transition">Try Again</button>
              <button onClick={() => window.location.reload()} className="px-4 py-2 border border-ltx-rule rounded-lg text-sm font-medium hover:bg-ltx-alt transition">Reload Page</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
