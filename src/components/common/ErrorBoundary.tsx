/**
 * React Error Boundary Component
 * Fängt Fehler in React Components ab und zeigt Fallback UI
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
    
    // Send to analytics/monitoring service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>⚠️ Etwas ist schiefgelaufen</h2>
            <p>
              Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder
              versuchen Sie es später erneut.
            </p>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Fehlerdetails (für Entwickler)</summary>
              {this.state.error && this.state.error.toString()}
            </details>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              🔄 Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC für einfache Verwendung
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
}
