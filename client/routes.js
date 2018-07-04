import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserProfile,
  UserProfileEdit,
  HomePage,
  Canvas,
  RootCanvas,
  Templates,
  SelectTemplate,
  SingleStoryContainer,
  OpenStories,
  Custom,
  CompletedChapter
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={HomePage} />
        <Route path='/open-stories' component={OpenStories} />
        <Route path='/custom' component={Custom} />
        <Route path='/:storyId/completedChapters' component={CompletedChapter} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/selectTemplate" component={SelectTemplate} />
            <Route path="/canvas" component={Canvas} />
            <Route path="/user-profile/edit" component={UserProfileEdit} />
            <Route path="/user-profile" component={UserProfile} />
            <Route
              exact
              path="/stories/:id/:chid/:chorder"
              component={RootCanvas}
            />
            <Route path="/stories/:id" component={SingleStoryContainer} />
            <Route path="/templates" component={Templates} />
            <Route path="/open-stories" component={OpenStories} />
            <Route component={HomePage} />
          </Switch>
        )}

        <Route component={HomePage} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
