import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    console.error(error)
  }

  render() {
    return this.props.children
  }
}

export default ErrorBoundary
