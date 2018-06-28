import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTemplatesThunk, createStoryThunk} from '../store'

class TemplatesContainer extends Component {
  componentDidMount() {
    this.props.getTemplates()
  }
  render() {
    return <ThumbnailsGrid list={this.props.templates} createStory={this.props.createStory} />
  }
}

function ThumbnailsGrid(props) {
  const {list} = props
  return (
    <div className="grid">
      <h1 className="grid-header">Templates</h1>
      <div className="grid-thumbnails-container">
        {list.length &&
          list.map(item => <Thumbnail item={item} key={item.id} createStory={props.createStory} />)}
      </div>
    </div>
  )
}

function Thumbnail(props) {
  const {title, coverImgUrl, description, id} = props.item
  return (
    <div className="grid-thumbnail">
      <div className="grid-thumbnail-title">{title}</div>
      <img className="grid-thumbnail-image" src={coverImgUrl} />
      <div className="grid-thumbnail-description">{description}</div>
      <div className="grid-thumbnail-btn" onClick={() => props.createStory(id)}>
        Create Story
      </div>
      {/* TODO: Attach handler to create story in DB and set it to the state as selected story*/}
    </div>
  )
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

