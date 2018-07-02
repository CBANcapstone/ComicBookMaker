import React, { Component } from 'react';
import axios from 'axios';
import {UnitStory} from '/';

export default class extends Component{

  constructor(){
    super();

    this.state = {
      openStories: []
    };
  }

  componentDidMount(){
    this.getOpenStories();
  }

  getOpenStories(){
    axios.get('/api/stories')
      .then(res => res.data)
      .then(stories => {
        const openStories = stories.filter(story => {
          return !story.completed
        })

        this.setState({
          openStories
        })
      })
  }

  render(){
    console.log(this.state.openStories)
    return(
      <div className='open-stories'>
        {this.state.openStories ? this.state.openStories.map(story => {
                                    return <UnitStory story={story} />
                                  }): <h1>There are no open stories yet.</h1>
        }
      </div>
    )
  }
}
