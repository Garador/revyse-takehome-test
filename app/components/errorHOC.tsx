import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: Error; // Optional prop for a custom error message
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorHOC extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false || !!props.errorMessage,
      error: props.errorMessage || null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorHOC:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center text-gray-800">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Something went wrong.
          </h1>
          <p className="text-lg">
            Error Details:{" "}
            {this.props.errorMessage ? this.props.errorMessage.message : ""}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHOC;
