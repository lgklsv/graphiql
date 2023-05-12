import React from 'react';
import ErrorNotification from 'shared/ui/ErrorFallback/ErrorNotification';
import ErrorPageNotification from 'shared/ui/ErrorFallback/ErrorPageNotification';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  type: 'page' | 'notification';
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
      return type === 'page' ? (
        <ErrorPageNotification errorMsg={errorMsg} />
      ) : (
        <ErrorNotification errorMsg={errorMsg} />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
