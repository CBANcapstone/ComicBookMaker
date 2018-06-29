import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailsGrid from './ThumbnailsGrid';
import {
  getUserStoriesThunk
} from '../store';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: true
    };
  }

  componentDidMount() {
    this.props.getUserStories(this.props.user.id);
  }

  filterCreated = () => {
    this.setState({created: true})
  };
  filterContributed = () => {
    this.setState({created: false})
  };

  render() {
    console.log(this.props.stories);
    const { name, email, photoUrl } = this.props.user;
    this.stories = this.props.stories;
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
          <button onClick={this.filterCreated}>created</button>
          <button onClick={this.filterContributed}>contributed</button>
        </div>
        {this.state.created ? (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.props.createdStories} />
          </div>
        ) : (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.props.contributedStories} />
          </div>
        )}
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.story,
    createdStories: state.story.filter(
      story => story.user_role.role === 'creator'
    ),
    contributedStories: state.story.filter(
      story => story.user_role.role === 'contributor'
    )
  };
}

function mapDispatch(dispatch) {
  return {
    getUserStories: id => dispatch(getUserStoriesThunk(id)),
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
