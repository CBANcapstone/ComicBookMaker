import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOpenStoriesThunk } from '../../store';

class OpenStories extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getOpenStories();
  }

  render() {
    return (
      <div className="open-stories">
        {this.props.openStories.length ? (
          this.props.openStories.map(story => {
            return <UnitStory key={story.id} story={story} />;
          })
        ) : (
          <h1>There are no open stories yet.</h1>
        )}
      </div>
    );
  }
}

function UnitStory(props) {
  const { coverImgUrl, title, contributors, creator, id } = props.story;

  return (
    <div className="single-story-info">
      <img className="single-story-info-img" src={coverImgUrl} alt="cover" />
      <div className="single-story-info-title">
        <div>Story name: {title}</div>
        <div>Creator: {creator.name}</div>
        <div>
          CONTRIBUTORS:
          {!contributors.length
            ? ' No contributors yet'
            : contributors.map((contr, i) => {
                return <p key={i}>{contr.email}</p>;
              })}
        </div>
        <div type="button" className="single-story-btn">
          <Link to={`/stories/${id}`}>
            <span style={{ color: 'white' }}> Go to Story</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapToState = state => {
  return {
    openStories: state.stories.openStories
  };
};

const mapDispatch = dispatch => {
  return {
    getOpenStories: () => {
      dispatch(fetchOpenStoriesThunk());
    }
  };
};

export default connect(mapToState, mapDispatch)(OpenStories);
