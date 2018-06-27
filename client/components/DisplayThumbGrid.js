import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Thumbnail = props => {
  return (
    <div>
      <h2>THUMB</h2>
      <h1> TEMPLATE </h1>
    </div>
  )
}

const DisplayThumbnailGrid = props => {
  return (
    <div>
      {props.templates.length &&
        props.templates.map(template => {
          ;<Thumbnail key={template.id} template={template} />
        })}
    </div>
  )
}

function mapState(state) {
  return {
    user: state.user,
    templates: state.templates
  }
}

export default connect(mapState)(DisplayThumbnailGrid)
