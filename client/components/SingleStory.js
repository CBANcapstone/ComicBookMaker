import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStoryThunk } from '../store';

function SingleStory(props) {
  const { coverImgUrl, title } = props.story;
  const { chapters } = props
  console.log(chapters)
  return (
    <div>
      <div className="single-story-info">
        <img className="single-story-info-img" src={coverImgUrl} alt="cover" />
        <div className="single-story-info-title">
          <div>Story name: {title}
          </div>
          <button type="button" className="single-story-btn">
            <span>Edit</span>
          </button>
          <div>Creator: {props.creator && props.creator.name}</div>
          <div>
            Contributors:{' '}
            {props.contributors &&
              props.contributors.map(col => {
                return <p key={col.id}>{col.email}</p>;
              })}
          </div>
          <button type="button" className="single-story-btn">
            <span>See completed chapters</span>
          </button>
        </div>
      </div>
      <div className="single-story-container">
        <div className="single-story-chapters">
          <h3 className="center-item-heading">
            Select the Chapter You Want To Create
          </h3>
          <ol>
            {chapters &&
              chapters.map((chapter, i) => {
                return (
                  <li key={chapter.id} className="single-story-thumbnail">
                    <h3 className="center-item">{chapter.title}</h3>
                    {/* <h4 className="center-item">Not Completed</h4> */}
                    <Link
                      to={{
                        pathname: '/selectTemplate',
                        state: {
                          storyid: props.story.id,
                          chapterid: chapter.id,
                          index: i + 1,
                          title: chapter.title
                        }
                      }}
                    >
                      <button className="grid-thumbnail-btn " type="button">
                        <span>EDIT</span>
                      </button>
                    </Link>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </div>
  );
}

class SingleStoryContainer extends Component {
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    return (
      <SingleStory
        story={this.props.story}
        chapters={this.props.chapters}
        creator={this.props.creator}
        contributors={this.props.contributors}
      />
    );
  }
}

function mapState(state) {
  return {
    story: state.story.currentStory,
    creator:
      state.story.currentStory.users &&
      state.story.currentStory.users.filter(user => user.user_role.role == 'creator')[0],
    contributors:
      state.story.currentStory.users &&
      state.story.currentStory.users.filter(user => user.user_role.role == 'contributor'),
    chapters: state.story.currentStory.id && state.story.currentStory.chapters.filter(chapter => !chapter.completed)
  };
}

function mapDispatch(dispatch, ownProps) {
  let storyId = +ownProps.match.params.id;
  return {
    getStory: () => dispatch(fetchStoryThunk(storyId))
  };
}

export default connect(mapState, mapDispatch)(SingleStoryContainer);
