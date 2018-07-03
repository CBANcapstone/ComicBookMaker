import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailsGrid from './ThumbnailsGrid';
import { fetchOpenStoriesThunk, getUserStoriesThunk } from '../store';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: true,
      defaultPage: true,
      createdStories: []
    };
    this.created = [];
    this.contributor = [];
  }

  componentDidMount() {
    this.props.getUserStories(this.props.user.id);
  }

  componentWillUnmount() {
    this.props.getOpenStories();
  }

  filterCreated = () => {
    let createdStories = this.props.stories.filter(
      story => story.user_role.role === 'creator'
    );
    console.log(createdStories);
    this.setState({
      created: true,
      defaultPage: false,
      createdStories
    });
  };
  filterContributed = () => {
    this.contributor = this.props.stories.filter(
      story => story.user_role.role === 'contributor'
    );
    this.setState({ created: false, defaultPage: false });
  };

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
            <button>edit profile</button>
          </div>
        </div>
        <div className="profile-filter-bar">
          <button onClick={this.filterCreated}>created</button>
          <button onClick={this.filterContributed}>contributed</button>
        </div>
        {this.state.defaultPage ? (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.props.stories} />
          </div>
        ) : this.state.created ? (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.state.createdStories} />
          </div>
        ) : (
          <div className="profile-stories-lst">
            <ThumbnailsGrid list={this.contributor} />
          </div>
        )}
        }
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
    getUserStories: id => dispatch(getUserStoriesThunk(id)),
    getOpenStories: () => {
      dispatch(fetchOpenStoriesThunk())
    }
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
