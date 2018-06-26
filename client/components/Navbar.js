import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutThunk, loginThunk } from '../store';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logUserOut();
  };

  handleLogin = () => {
    this.props.authLogin();
  };
  render() {
    return (
      <div className="nav-parent">
        <div>LOGO</div>

        {this.props.user ? (
          <div className="nav-child">
            <Link to="/login">
              <div className="nav-ch" onClick={this.handleLogout}>
                LOGOUT
              </div>
            </Link>
            <Link to="/userProfile">
              <div className="nav-ch">MY-ACCOUNT</div>
            </Link>
          </div>
        ) : (
          <div className="nav-ch" onClick={this.handleLogin}>
            SIGN-IN
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

function mapToProps(dispatch) {
  return {
    logUserOut: () => dispatch(logoutThunk()),
    authLogin: () => dispatch(loginThunk())
  };
}

export default connect(
  mapState,
  mapToProps
)(Navbar);
