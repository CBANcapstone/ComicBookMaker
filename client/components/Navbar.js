import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logUserOut();
  };

  render() {
    return (
      <div className="navbar-container">
        <Link to="/home" className="home-link">
          {' '}
          home{' '}
        </Link>

        {this.props.user.id ? (
          <div className="navbar-links-container">
            <Link to="/openStories" className="navbar-link">
              Open Stories
            </Link>
            <Link to="/user-profile" className="navbar-link">
              my account
            </Link>
            <a className="navbar-link" onClick={this.handleLogout}>
              logout
            </a>
          </div>
        ) : (
          <div className="navbar-links-container">
            <Link to="/login"> log in </Link>
            <Link to="/signup"> sign up </Link>
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
    logUserOut: () => dispatch(logout())
  };
}

export default connect(mapState, mapToProps)(Navbar);
