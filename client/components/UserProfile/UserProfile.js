import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ThumbnailsGrid from '../Static/ThumbnailsGrid';
import { getUserStoriesThunk, me } from '../../store';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getUserStories('all');
  }

  render() {
    const { name, email, photoUrl } = this.props.user;
    const { stories } = this.props;
    return (
      <div>
        <div className="profile-container">
          <div className="profile-info-container">
            <div className="profile-pic-container">
              <img src={photoUrl} alt="avatar" className="profile-pic" />
            </div>
            <div className="profile-desc">
              <h1>name: {name}</h1>
              <h1>email: {email}</h1>
              <Link to="/user-profile/edit">
                <button type="button" className="grid-thumbnail-btn">
                  <span>edit profile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="profile-filter-bar">
          <div className="button__holder">
            <button
              type="button"
              onClick={() => this.props.getUserStories('creator')}
              className="plus"
            >
              created
            </button>
          </div>
          <div className="button__holder">
            <button
              type="button"
              onClick={() => this.props.getUserStories('contributor')}
              className="plus"
            >
              contributed
            </button>
          </div>
          <div className="button__holder">
            <button
              type="button"
              onClick={() => this.props.getUserStories('all')}
              className="plus"
            >
              all
            </button>
          </div>
        </div >
        <div className='profile-stories-wrapper'>
        <h1 className="grid-header">Stories</h1>
        <div className="profile-stories-lst">
        
          <ThumbnailsGrid list={stories} profile={true} label='Go to Story'/>
        </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.stories.userStories
  };
}

function mapDispatch(dispatch) {
  return {
    getUserStories: cat => dispatch(getUserStoriesThunk(cat)),
    getUser: () => dispatch(me())
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
