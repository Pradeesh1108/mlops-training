import { Component } from 'react';
import { HiExclamationTriangle } from 'react-icons/hi2';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-danger-500/10 flex items-center justify-center mx-auto mb-6 border border-danger-500/20">
              <HiExclamationTriangle className="w-8 h-8 text-danger-500" />
            </div>
            <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-500 mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={this.handleRetry}
              className="px-5 py-2.5 bg-primary-500 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
