import axios from 'axios'
import history from '../history'

const SELECTED_STORY = 'SELECTED_STORY';

const selectedStory = story => ({
  type: SELECTED_STORY,
  story
})

export const selectedStoryThunk = (templates, id) => dispatch =>{

  axios.post('/api/stories/createstory', {
    tempId: id
  } )
  .then(res=>console.log(res))
  .catch(err=>console.log(err))


  // dispatch(selectedStory(templates.filter(template => template.id == id)[0]));
 }

export default function(state = {}, action) {
  switch (action.type) {
    case SELECTED_STORY:
      return Object.assign({}, state, action.story)
    default:
      return state
  }
}
