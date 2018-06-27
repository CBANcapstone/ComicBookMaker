import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserThunk } from './store';
import { Canvas, Home, Navbar, UserProfile, RootCanvas, Login, Signup } from './components';
import Routes from './routes'
// import firebase, { auth } from './config/firebase';

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

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
);
