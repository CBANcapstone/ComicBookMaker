import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../store';

class Home extends Component {
  constructor(props) {
    super(props);
    this.selectedFile = null;
  }

  handleClick = event => {
    this.props.authLogin();
  };

  fileSelectedHandler = event => {
    this.selectedFile = event.target.files[0];
  };

  render() {
    return (
      <div>
        <h1>HOMEPAGE</h1>
        <br />
        {this.props.user ? (
          <div>
            <label>Hello, {this.props.user.displayName}</label>
          </div>
        ) : (
          <button onClick={() => this.handleClick()}>
            Sign in with google
          </button>
        )}
        <br />
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user
  };
}
function mapToProps(dispatch) {
  return {
    authLogin: () => dispatch(loginThunk())
  };
}

export default connect(
  mapState,
  mapToProps
)(Home);
