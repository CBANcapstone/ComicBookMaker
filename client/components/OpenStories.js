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
    console.log('OPEN STORIES', this.props.openStories )
    return (
      <div className="open-stories">
        {this.props.openStories.length ? (
          this.props.openStories.map(story => {
            return <UnitStory key={story.id} story={story} />;
          })
        ) : (
          <h1>There are no open stories yet.</h1>
        )
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
