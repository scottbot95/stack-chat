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
  /** Whether or not still loading */
  isLoading: PropTypes.bool,
  /** Node to display while loading */
  loading: PropTypes.node,
  /** Nodes to display once loading is done */
  children: PropTypes.node
};

Loader.defaultProps = {
  isLoading: false,
  loading: <LoadingSpinner />,
  children: undefined
};
