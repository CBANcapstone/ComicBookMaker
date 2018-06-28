import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTemplatesThunk, createStoryThunk} from '../store'
import ThumbnailsGrid from './ThumbnailGrid'

class TemplatesContainer extends Component {
  componentDidMount() {
    this.props.getTemplates()
  }
  render() {
    return <ThumbnailsGrid list={this.props.templates} createStory={this.props.createStory} />
  }
}


function mapState(state) {
  return {
    templates: state.templates
  }
}

function mapDispatch(dispatch) {
  return {
    getTemplates: () => dispatch(getTemplatesThunk()),
    createStory: templateId => dispatch(createStoryThunk(templateId))
  }
}

export default connect(mapState, mapDispatch)(TemplatesContainer)

