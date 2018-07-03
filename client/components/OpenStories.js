import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UnitStory } from '/';
import { fetchOpenStoriesThunk } from '../store';

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
        {this.props.openStories ? (
          this.props.openStories.map((story, i) => {
            return <UnitStory key={i} story={story} />;
          })
        ) : (
          <h1>There are no open stories yet.</h1>
        )}
        }
      </div>
    );
  }
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
