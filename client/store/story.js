import axios from 'axios';
import history from '../history';

const GET_STORY = 'GET_STORY';
const GET_USER_STORY = 'GET_USER_STORY';

const getStory = stories => ({
  type: GET_STORY,
  stories
});

const getUserStories = stories => ({
  type: GET_USER_STORY,
  stories
});

export const createStoryThunk = templateId => async () => {
  try {
    let res = await axios.post('/api/stories/', {templateId})
    history.push(`/stories/${res.data.id}`);
  } catch (err) {
    console.err('Create story route', err)
  }
};

export const fetchStoryThunk = storyId => async dispatch => {
  let story = await axios.get(`/api/stories/${storyId}`);
  dispatch(getStory(story.data));
};

export const getUserStoriesThunk = userId => dispatch => {
  axios
    .get(`/api/stories/user/${userId}`)
    .then(stories => {
      console.log(stories)
      // dispatch(getUserStories(stories.data));
      // history.push('/templates');
    })
    .catch(err => console.log(err));
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_STORY:
      return Object.assign({}, state, action.stories);
    case GET_USER_STORY:
      return Object.assign([], state, action.stories);
    default:
      return state;
  }
}
