import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchChaptersThunk} from '../store';

class CompletedChapter extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
    const storyId = this.props.match.params.storyId;
    this.props.getChapters(storyId);
  }

  render(){
    return(
      <div className='single-story-completed-chapters'>
        {
          this.props.completedChapters.map(chapter => {
            return (
                  <div className='single-story-completed-chapter-img' key={chapter.id}>
                    <h3>{chapter.title}</h3>
                    <img src={chapter.imageUrl} width='224'/>
                  </div>
            )
          })
        }
      </div>
    )
  }
}

const mapToState = (state) => {
  return{
    completedChapters: state.chapters
  }
}

const mapDispatch = (dispatch) => {
  return{
    getChapters: (storyId) => {
      dispatch(fetchChaptersThunk(storyId))
    }
  }
}

export default connect(mapToState, mapDispatch)(CompletedChapter)
