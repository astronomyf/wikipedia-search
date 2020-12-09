import React, { Component } from "react";

import ErrorMessage from "./../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static defaultProps = {
    fallback: (
      <ErrorMessage
        title="Something went wrong"
        description="An unknown error has occured."
      />
    ),
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
