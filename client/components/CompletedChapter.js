import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChaptersThunk, fetchStoryThunk } from '../store';

class CompletedChapter extends Component {
  componentDidMount() {
    const storyId = this.props.match.params.storyId;
    this.props.getChapters(storyId);
    this.props.getStory(storyId);
  }

  render() {
    const { title } = this.props.story;
    return (
      <div className="single-story-completed-chapters">
        <h1> {title} </h1>
        {this.props.completedChapters.map(chapter => {
          return (
            <div
              className="single-story-completed-chapter-img"
              key={chapter.id}
            >
              <h3>{chapter.title}</h3>
              <img src={chapter.imageUrl} width="224" />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapToState = state => {
  return {
    completedChapters: state.chapters,
    story: state.story
  };
};

const mapDispatch = dispatch => {
  return {
    getChapters: storyId => {
      dispatch(fetchChaptersThunk(storyId));
    },
    getStory: storyId => dispatch(fetchStoryThunk(storyId))
  };
};

export default connect(mapToState, mapDispatch)(CompletedChapter);
