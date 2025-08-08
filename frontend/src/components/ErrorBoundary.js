import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Check console.</h1>;
    }
    return this.props.children;
  }
}
