import React from 'react';
import Routes from './routes';
import { Sidebar, NavBar } from './components';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Sidebar />
        <Routes />
      </React.Fragment>
    );
  }
}
