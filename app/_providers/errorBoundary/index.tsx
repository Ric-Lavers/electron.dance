import React, { Component, ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean
  error: any
  message?: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, message: "" }
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error, message: error.message }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.error.message || "Oops something went wrong"}</h1>
    }

    return this.props.children
  }
}
