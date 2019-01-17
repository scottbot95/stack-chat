import React from 'react';
import Routes from './routes';
import Sidebar from './components/Sidebar';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Routes />
      </React.Fragment>
    );
  }
}
