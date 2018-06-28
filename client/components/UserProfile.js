import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailsGrid from './ThumbnailsGrid';
import { getUserStoriesThunk } from '../store'


class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserStories(this.props.user.id)
  }

  render() {
    // console.log(this.props)
    // console.log('(#_#) ',this.state)

    const { name, email, photoUrl } = this.props.user;
    // const {stories} = this.props.stories
    return (
      <div className="profile-container">
        <div className="profile-info-container">
          <div className="profile-pic">
            <img src={photoUrl} alt="avatar" />
          </div>
          <div className="profile-desc">
            <h1>name: {name}</h1>
            <h1>email: {email}</h1>
            <button>edit profile</button>
          </div>
        </div>

        <div className="profile-filter-bar">
          <button>created</button>
          <button>contributed</button>
        </div>

        <div className="profile-stories-lst">
          <ThumbnailsGrid list={this.props.stories} />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.story
  };
}

function mapDispatch(dispatch) {
  return {
    getUserStories: (id) => dispatch(getUserStoriesThunk(id))
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
