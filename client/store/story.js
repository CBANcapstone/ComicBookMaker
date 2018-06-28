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

export const fetchStoryThunk = storyId => async dispatch => {
  let story = await axios.get(`/api/stories/${storyId}`)
  console.log('FETCHED STORY', story.data)
  dispatch(getStory(story.data))
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_STORY:
      return Object.assign({}, state, action.story)
    default:
      return state
  }
}
