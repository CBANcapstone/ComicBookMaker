import React, {Component} from 'react'
import {connect} from 'react-redux'
import ThumbnailsGrid from './ThumbnailsGrid'
import {getUserStoriesThunk} from '../store'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserStories(this.props.user.id)
  }

  filterCreated() {
    console.log('createeed', this.props.stories )

  }
  filterContributed() {
    console.log('contributed')
    // stories = this.props.stories.filter(story=>story)
  }

  render() {
    // console.log(this.props)
    // console.log('(#_#) ',this.state)

    const {name, email, photoUrl} = this.props.user
    const {stories} = this.props
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

        <div className="profile-stories-lst">
          <ThumbnailsGrid list={stories} />
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    user: state.user,
    stories: state.story
  }
}

function mapDispatch(dispatch) {
  return {
    getUserStories: id => dispatch(getUserStoriesThunk(id))
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
