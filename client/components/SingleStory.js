import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchStoryThunk} from '../store'

function SingleStory(props) {
  console.log('STORY_SINGLE STORY >>>', props.story)
  const {coverImgUrl, title, chapters} = props.story
  return (
    <div className="single-story-container">
      <div className="single-story-info">
        <img className="single-story-info-img" src={coverImgUrl} alt="cover" />
        <div className="single-story-info-title">
          <div>Story name: {title}</div>
          <div>Creator: {props.creator && props.creator.email}</div>
          <div>
            Contributors:{' '}
            {props.contributors &&
              props.contributors.map(col => {
                return <p key={col.id}>{col.email}</p>
              })}
          </div>
          <button>See completed chapters</button>
        </div>
      </div>
      <div className="single-story-chapters">
        <h3 className="center-item">CHAPTERS</h3>
        {chapters &&
          chapters.map(chapter => {
            return (
              <div key={chapter.id} className="single-story-thumbnail">
                <h3 className="center-item">{chapter.title}</h3>
                <Link to={`/stories/${props.story.id}/${chapter.id}`}>
                  <button>EDIT</button>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

class SingleStoryContainer extends Component {
  componentDidMount() {
    this.props.getStory()
  }

  render() {
    return (
      <SingleStory
        story={this.props.story}
        creator={this.props.creator}
        contributors={this.props.contributors}
      />
    )
  }
}

function mapState(state) {
  return {
    story: state.story,
    creator:
      state.story.users &&
      state.story.users.filter(user => user.user_role.role == 'creator')[0],
    contributors:
      state.story.users &&
      state.story.users.filter(user => user.user_role.role == 'contributor')
  }
}

function mapDispatch(dispatch, ownProps) {
  let storyId = +ownProps.match.params.id
  return {
    getStory: () => dispatch(fetchStoryThunk(storyId))
  }
}

export default connect(mapState, mapDispatch)(SingleStoryContainer)
