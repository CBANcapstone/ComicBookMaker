import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import typeName from './HomePageNameDisplay';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    typeName();
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-container-dimensions">
          <img
            className="home-main-img"
            src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FCover-Comic.jpg?alt=media&token=70866e1a-8064-4b52-9dbf-de8f4c52c91b"
            alt="carousel"
          />
          <div className="home-image-wrapper" />
          <div id="container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="logo"
              viewBox="0 0 15000 9500"
              width="900px"
              fill="white"
              stroke="22"
            >
              <path fill="none" />
            </svg>
          </div>
        </div>

        <div className="home-button-container">
          {this.props.user.id ? (
            <Link to="/templates">
              <div className="button">
                <div className="outer">
                  <div className="height">
                    <div className="inner">Create!</div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <div className="button">
                <div className="outer">
                  <div className="height">
                    <div className="inner">Create!</div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user
  };
}

export default connect(mapState)(HomePage);
