import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTemplatesThunk} from '../store'
import {Link} from 'react-router-dom'
import axios from 'axios'
import history from '../history'

function Thumbnail(props) {


  function creatingStory(template) {

    axios.post('/api/stories/createstory', {
      template
    } )
    .then(res=>console.log(res))
    .catch(err=>console.log(err))


  }

  const {title, coverImgUrl, description, id} = props.template
  return (
    <div className="template-thumbnail">
      <h1>{title}</h1>
      <h1>{description}</h1>
      <img className="template-thumbnail-image" src={coverImgUrl} />
      <button onClick={() => creatingStory(props.template)}>
        {' '}
        Create Story{' '}
      </button>
    </div>
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
          templates.map(template => (
            <Thumbnail template={template} key={template.id} />
          ))}
      </div>
    )
  }
}

function mapState(state) {
  return {
    templates: state.template
  }
}

function mapDispatch(dispatch) {
  return {
    getTemplates: () => dispatch(getTemplatesThunk())
  }
}

export default connect(mapState, mapDispatch)(Templates)
