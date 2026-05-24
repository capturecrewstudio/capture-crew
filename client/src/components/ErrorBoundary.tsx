import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#e5e0d8', fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{this.state.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#E8192C', color: '#fff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
