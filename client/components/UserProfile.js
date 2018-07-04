import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ThumbnailsGrid from './ThumbnailsGrid';
import { getUserStoriesThunk, me } from '../store';

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
    this.props.getUser()
    this.props.getUserStories(this.props.user.id);
  }

  filterCreated = () => {
    let createdStories = this.props.stories.filter(
      story => story.user_role.role === 'creator'
    );
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
    const { userStories } = this.props;
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
            <button type="button" onClick={this.filterCreated} className="plus">
              created
            </button>
          </div>
          <div className="button__holder">
            <button
              type="button"
              onClick={this.filterContributed}
              className="plus"
            >
              contributed
            </button>
          </div>
          <div className="button__holder">
            <button type="button" onClick='#' className="plus">
              all
            </button>
          </div>
        </div>
        <div>
          {this.state.defaultPage ? (
            <div className="profile-stories-lst">
              <ThumbnailsGrid list={this.props.stories} profile={true} />
            </div>
          ) : this.state.created ? (
            <div className="profile-stories-lst">
              <ThumbnailsGrid list={this.state.createdStories} profile={true} />
            </div>
          ) : (
            <div className="profile-stories-lst">
              <ThumbnailsGrid list={this.contributor} profile={true} />
            </div>
          )}
        </div>
      </div>
    );
  }
}


// refactor into the 3 thunks : all user stories; all created stories; all stories where user is a contributor

function mapState(state) {
  return {
    user: state.user,
    stories: state.stories.userStories
  };
}

function mapDispatch(dispatch) {
  return {
    getUserStories: id => dispatch(getUserStoriesThunk(id)),
    getUser: () => dispatch(me())
  };
}

export default connect(mapState, mapDispatch)(UserProfile);
