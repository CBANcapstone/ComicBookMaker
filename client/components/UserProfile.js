import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <h1>USER PROFILE {this.props.user.displayName}</h1>
        <h2>USER EMAIL: {this.props.user.email}</h2>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user
  };
}

export default connect(mapState)(UserProfile);
