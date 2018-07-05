import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTemplatesThunk, createStoryThunk } from '../../store';
import ThumbnailsGrid from '../Static/ThumbnailsGrid';

class TemplatesContainer extends Component {
  componentDidMount() {
    this.props.getTemplates();
  }
  render() {
    return (
      <div>
        <h1 className="grid-header">Select a Theme for Your Comic</h1>
        <ThumbnailsGrid
          list={this.props.templates}
          createStory={this.props.createStory}
          profile={false}
        />
      </div>
    );
  }
}

function mapState(state) {
  return {
    templates: state.templates
  };
}

function mapDispatch(dispatch) {
  return {
    getTemplates: () => dispatch(getTemplatesThunk()),
    createStory: templateId => dispatch(createStoryThunk(templateId))
  };
}

export default connect(mapState, mapDispatch)(TemplatesContainer);
