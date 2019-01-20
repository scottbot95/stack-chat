import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CircularProgress color="primary" />
  </div>
);

export default LoadingSpinner;
