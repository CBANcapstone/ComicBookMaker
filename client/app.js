import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserThunk } from './store';
import { Canvas, Home, Navbar, UserProfile, RootCanvas, Login, Signup } from './components';
// import firebase, { auth } from './config/firebase';

class App extends Component {
  componentDidMount() {
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.getUser(user);
    //   }
    // });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/canvas" component={Canvas} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/rootCanvas" component={RootCanvas} />
        </Switch>
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
