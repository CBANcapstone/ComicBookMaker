import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserProfile extends Component {

  componentDidMount() {
    // this.props.getUserStories()
  }

  render() {
    const {name, email, photoUrl} = this.props.user
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
          <button >created</button>
          <button >contributed</button>
        </div>

        <div className="profile-stories-lst">
          {/* grid of user stories here */}
          <div className="storyThumbnail">story</div>
          <div className="storyThumbnail">story</div>
          <div className="storyThumbnail">story</div>
          <div className="storyThumbnail">story</div>
          <div className="storyThumbnail">story</div>
          <div className="storyThumbnail">story</div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.userStories
  }
}

function mapDispatch(dispatch) {
  return {
    // getUserStories: () => dispatch(getUserStoriesThunk())
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
