import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const Loader = ({ isLoading, loading, children }) => {
  if (isLoading) {
    if (loading) return loading;
    return <LoadingSpinner />;
  }

  return children;
};

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool,
  loading: PropTypes.node,
  children: PropTypes.node
};

Loader.defaultProps = {
  isLoading: false,
  loading: undefined,
  children: undefined
};
