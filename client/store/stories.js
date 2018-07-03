import axios from 'axios';

const GET_OPEN_STORIES = 'GET_OPEN_STORIES';

const getOpenStories = stories => ({
  type: GET_OPEN_STORIES,
  stories
})

export const fetchOpenStoriesThunk = () => dispatch => {
  axios.get('/api/stories/open-stories')
    .then(res => {
      dispatch(getOpenStories(res.data))
    })
    .catch(err => console.log(err))
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_OPEN_STORIES:
      return Object.assign([], state, action.stories);
    default:
      return state;
  }
}

