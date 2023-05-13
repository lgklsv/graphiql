import React from 'react';
import ErrorNotification from 'shared/ui/ErrorFallback/ErrorNotification';
import ErrorPageNotification from 'shared/ui/ErrorFallback/ErrorPageNotification';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  type: 'page' | 'notification' | 'app';
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMsg: error.message });
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { children, type } = this.props;

    if (hasError) {
      if (type === 'page') return <ErrorPageNotification errorMsg={errorMsg} />;
      if (type === 'notification')
        return <ErrorNotification errorMsg={errorMsg} />;
      if (type === 'app')
        return (
          <h2
            style={{
              color: '#281E5B',
              textAlign: 'center',
              width: '60%',
              fontSize: 24,
              margin: '1em auto',
            }}
          >
            Oops, an unexpected error occurred and the app does not work.
            Please, try later once again.
          </h2>
        );
    }
    return children;
  }
}

export default ErrorBoundary;
