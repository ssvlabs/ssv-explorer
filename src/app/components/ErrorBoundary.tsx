import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: black;
  font-size: 1.5rem;
  background-color: white;
  padding: 20px;
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error?: Error): { hasError: boolean } {
        return { hasError: !!error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
              <ErrorMessage>
                <p>We apologize for the inconvenience. Please try again later.</p>
              </ErrorMessage>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;