import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          <h2>Something went wrong.</h2>
          <p>An error occurred in this component.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;