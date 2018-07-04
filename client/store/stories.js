import axios from 'axios';
import history from '../history';

const stories = {
  openStories: [],
  userStories: [],
  currentStory: {}
};

const GET_USER_STORIES = 'GET_USER_STORIES';
const GET_OPEN_STORIES = 'GET_OPEN_STORIES';
const GET_CURRENT_STORY = 'GET_CURRENT_STORY';

const getCurrentStory = story => ({
  type: GET_CURRENT_STORY,
  story
});

const getUserStories = userStories => ({
  type: GET_USER_STORIES,
  userStories
});

const getOpenStories = openStories => ({
  type: GET_OPEN_STORIES,
  openStories
});

export const createStoryThunk = templateId => async () => {
  try {
    let res = await axios.post('/api/stories/', { templateId });
    history.push(`/stories/${res.data.id}`);
  } catch (err) {
    console.error('Create story route', err);
  }
};

export const fetchStoryThunk = storyId => async dispatch => {
  try {
    let story = await axios.get(`/api/stories/${storyId}`);
    dispatch(getCurrentStory(story.data));
  } catch (err) {
    console.error('Error fetching a single story', err);
  }
};

export const getUserStoriesThunk = category => async dispatch => {
  try {
    let stories = await axios.get(
      `/api/stories/user-stories?category=${category}`
    );
    dispatch(getUserStories(stories.data));
  } catch (err) {
    console.error('Error fetching user stories', err);
  }
};

export const fetchOpenStoriesThunk = () => async dispatch => {
  try {
    let res = await axios.get('/api/stories/open-stories');
    dispatch(getOpenStories(res.data));
  } catch (err) {
    console.error('Error fetching open stories', err);
  }
};

export default function(state = stories, action) {
  switch (action.type) {
    case GET_OPEN_STORIES:
      return Object.assign({}, state, { openStories: action.openStories });
    case GET_USER_STORIES:
      return Object.assign({}, state, { userStories: action.userStories });
    case GET_CURRENT_STORY:
      return Object.assign({}, state, { currentStory: action.story });
    default:
      return state;
  }
}
