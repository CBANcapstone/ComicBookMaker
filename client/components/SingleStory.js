import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStoryThunk} from '../store'

function SingleStory(props) {
  console.log('STORY_SINGLE STORY >>>', props.story)
  return <h1>SINGLE STORY</h1>
}

class SingleStoryContainer extends Component {
  componentDidMount() {
    // if we created that story we get it from the state
    // if we are redirected from UserProfile, AllStories, or plugin the link directly
    // we fetch the story from DB
    if (!this.props.story.id) this.props.getStory()
  }

  render() {
    return <SingleStory story={this.props.story} />
  }
}

function mapState(state) {
  return {
    story: state.story
  }
}

function mapDispatch(dispatch, ownProps) {
  let storyId = +ownProps.match.params.id
  return {
    getStory: () => dispatch(fetchStoryThunk(storyId))
  }
}

export default connect(mapState, mapDispatch)(SingleStoryContainer)
