import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectedStoryThunk} from '../store/'

const NewStory = (props) => {
console.log('***---',props)
const {coverImgUrl, title, chapters} = props.selectedTemplate
  return (
    <div className="create-story-container">
       <img className='create-story-container-img'
       src={coverImgUrl}
       alt="carousel" />
       <h2>{title}</h2>
       <h1>CHAPTERS</h1>
       <hr/>
        {chapters.map((chapter, id) => <h3 key={id}>{chapter}</h3>)}
    </div>
  )
}

function mapState(state, ownProps) {
  const {id} = ownProps.match.params
  return {
     template: state.template,
     selectedTemplate: state.template.filter(template => template.id == id)[0]
  }
}

function mapDispatch(dispatch) {
  return {
    selectedStory: () => {dispatch(selectedStoryThunk())}
  }
}


export default connect(mapState)(NewStory)
