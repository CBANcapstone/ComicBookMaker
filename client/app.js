import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserThunk } from './store';
import { Navbar } from './components';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: user => dispatch(getUserThunk(user))
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
