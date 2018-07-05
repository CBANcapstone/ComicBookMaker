import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChaptersThunk, fetchStoryThunk } from '../../store';

class CompletedChapter extends Component {
  componentDidMount() {
    const storyId = this.props.match.params.storyId;
    this.props.getChapters(storyId);
    this.props.getStory(storyId);
  }

  closeStory = () => {
    this.props.history.goBack();
  };
  render() {
    const { title } = this.props.story;
    const { completedChapters } = this.props;
    completedChapters.sort((a, b) => a.id - b.id);
    return (
      <div className="container">
        <div className="completed-chapters">
          <div className="heading-and-button">
            <div className="close-story-button">
              <button
                className="grid-thumbnail-btn "
                type="button"
                onClick={this.closeStory}
              >
                <span>CLOSE</span>
              </button>
            </div>
            <div className="completed-chapters-header">
              <h1>Story - {title} </h1>
            </div>
          </div>
          <ul className="slides">
            {completedChapters.map((chapter, idx) => {
              let prevPicNum = idx === 0 ? completedChapters.length - 1 : idx;
              let nextPicNum =
                idx === completedChapters.length - 1 ? 1 : idx + 2;
              return (
                <div
                  className="single-story-completed-chapter-img"
                  key={chapter.id}
                >
                  <input
                    type="radio"
                    name="radio-btn"
                    id={`img-${idx + 1}`}
                    checked
                  />
                  <li className="slide-container">
                    <div className="slide">
                      {!chapter.imageUrl ? (
                        <div className="no-image-div">{chapter.title}</div>
                      ) : (
                        <img src={chapter.imageUrl} width="224" />
                      )}
                    </div>

                    <div className="nav">
                      <label htmlFor={`img-${prevPicNum}`} className="prev">
                        &#x2039;
                      </label>
                      <label htmlFor={`img-${nextPicNum}`} className="next">
                        &#x203a;
                      </label>
                    </div>
                  </li>
                </div>
              );
            })}
            <div className="bird-container bird-container--one">
              <div className="bird bird--one" />
            </div>

            <div className="bird-container bird-container--two">
              <div className="bird bird--two" />
            </div>

            <div className="bird-container bird-container--three">
              <div className="bird bird--three" />
            </div>

            <div className="bird-container bird-container--four">
              <div className="bird bird--four" />
            </div>
            <li className="nav-dots">
              {completedChapters.map((ele, idx) => (
                <label
                  htmlFor={`img-${idx + 1}`}
                  className="nav-dot"
                  id={`img-dot-${idx + 1}`}
                  key={ele.title + idx}
                />
              ))}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapToState = state => {
  return {
    completedChapters: state.chapters,
    story: state.stories.currentStory
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
