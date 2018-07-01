import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import index from './HomePageAnimation/index.js';

const HomePage = props => {
  return (
    <div className="home-container">
      <img
        className="home-main-img"
        src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FCover-Comic.jpg?alt=media&token=70866e1a-8064-4b52-9dbf-de8f4c52c91b"
        alt="carousel"
      />

      <div className="home-button-container">
        {props.user.id ? (
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
};

function mapState(state) {
  return {
    user: state.user
  };
}

export default connect(mapState)(HomePage);
