import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getTemplatesThunk } from '../store'
import {Link} from 'react-router-dom'

function Thumbnail(props) {
  const {title, coverImgUrl, description, id} = props.template
  return (
    <Link to={`/newstory/${id}`}>
    <div className="template-thumbnail">
      <h1>{title}</h1>
      <h1>{description}</h1>
      <img className="template-thumbnail-image" src={coverImgUrl} />
    </div>
    </Link>
  )
}

class Templates extends Component {
  componentDidMount() {
    this.props.getTemplates()
  }
  render() {
    const {templates} = this.props
    return (
      <div>
        <h1>Templates</h1>
        {templates.length &&
          templates.map(template => <Thumbnail template={template} key={template.id}/>)}
      </div>
    )
  }
}

function mapState(state) {
  return {
    templates: state.template
  }
}

function mapDispatch(dispatch){
  return {
    getTemplates: () => dispatch(getTemplatesThunk())
  }
}

export default connect(mapState, mapDispatch)(Templates)
