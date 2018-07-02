import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailsGrid from './ThumbnailsGrid';
import { getUserStoriesThunk, setCategory } from '../store';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserStories();
  }

  render() {
    const { name, email, photoUrl } = this.props.user;
    const { stories } = this.props;
    return (
      <div className="profile-container">
        <div className="profile-info-container">
          <div className="profile-pic">
            <img src={photoUrl} alt="avatar" />
          </div>
          <div className="profile-desc">
            <h1>name: {name}</h1>
            <h1>email: {email}</h1>
            <button className="grid-thumbnail-btn " type="button">
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
        <div className="profile-filter-bar">
          <button
            className="grid-thumbnail-btn"
            type="button"
            value="creator"
            onClick={this.props.toggleCategory}
          >
            Created
          </button>
          <button
            className="grid-thumbnail-btn"
            type="button"
            value="contributor"
            onClick={this.props.toggleCategory}
          >
            Contributed
          </button>
          <button
            className="grid-thumbnail-btn"
            type="button"
            value="all"
            onClick={this.props.toggleCategory}
          >
            All
          </button>
        </div>
        {this.props.stories.length ? (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.props.stories} />
          </div>
        ) : (
          <h1>You have not created any stories yet!</h1>
        )}
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.story.filteredStories
  };
}

function mapDispatch(dispatch) {
  return {
    getUserStories: () => dispatch(getUserStoriesThunk()),
    toggleCategory: evt => dispatch(setCategory(evt.target.value))
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
