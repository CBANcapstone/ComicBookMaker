import axios from 'axios'
import history from '../history'

const GET_STORY = 'GET_STORY'

const getStory = story => ({
  type: GET_STORY,
  story
})

export const createStoryThunk = templateId => dispatch => {
  axios
    .post('/api/stories/createstory', {
      templateId
    })
    .then(res => {
      dispatch(getStory(res.data))
      history.push(`/stories/${res.data.id}`)
    })
    .catch(err => console.log(err))
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_STORY:
      return Object.assign({}, state, action.story)
    default:
      return state
  }
}
