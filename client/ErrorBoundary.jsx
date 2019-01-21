import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) this.props.onError(error, info);
    else console.warn(error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      if (this.props.errorComponent) {
        const ErrorComponent = this.props.errorComponent;
        return (
          <ErrorComponent
            error={this.state.error}
            dismissError={() => this.setState({ error: null })}
          />
        );
      }

      return (
        <Paper style={{ overflow: 'scroll' }}>
          <Typography variant="h2">An Error Occurred</Typography>
          <Typography variant="subtitle1" color="error">
            {this.state.error.message}
          </Typography>
          <Typography variant="body2" color="error" component="pre">
            {this.state.error.stack}
          </Typography>
        </Paper>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  onError: PropTypes.func,
  errorComponent: PropTypes.element
};

ErrorBoundary.defaultProps = {
  onError: undefined,
  errorComponent: undefined
};
