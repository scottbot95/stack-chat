/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const withLoader = ({
  loader,
  dataProp = 'data',
  errorProp = 'error'
}) => WrappedComponent => {
  class WithLoader extends React.Component {
    state = {
      loading: true,
      data: undefined,
      error: undefined
    };

    componentWillMount() {
      this.mounted = false;
    }

    async componentDidMount() {
      this.mounted = true;
      try {
        const data = await loader(this.props);
        if (this.mounted) this.setState({ data, loading: false });
      } catch (error) {
        if (this.mounted) this.setState({ error, loading: false });
      }
    }

    mounted = false;

    render() {
      if (this.state.loading) {
        return (
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
      }
      const loaderProps = {
        [dataProp]: this.state.data,
        [errorProp]: this.state.error
      };

      return <WrappedComponent {...this.props} {...loaderProps} />;
    }
  }
  WithLoader.displayName = `WithLoader(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  return WithLoader;
};

export default withLoader;
