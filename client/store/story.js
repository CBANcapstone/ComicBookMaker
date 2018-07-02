'use strict';
import axios from 'axios';
import history from '../history';

// add category prop to the state

// buttons will change this category

// in state we will filter current stories based on the category: created, contributed, all.

const initialState = {
  currentStory: {},
  currentStories: [],
  category: 'all',
  filteredStories: []
};

const GET_CURRENT_STORY = 'GET_CURRENT_STORY';
const GET_USER_STORIES = 'GET_USER_STORIES';
const SET_CATEGORY = 'SET_CATEGORY';

const getCurrentStory = currentStory => ({
  type: GET_CURRENT_STORY,
  currentStory
});

const getUserStories = currentStories => ({
  type: GET_USER_STORIES,
  currentStories
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  category
});

export const createStoryThunk = templateId => async dispatch => {
  try {
    let createdStory = await axios.post(`/api/stories/createstory`, {
      templateId
    });
    history.push(`/stories/${createdStory.data.id}`);
  } catch (err) {
    console.error(err);
  }
};

export const fetchStoryThunk = storyId => async dispatch => {
  let story = await axios.get(`/api/stories/${storyId}`);
  dispatch(getCurrentStory(story.data));
};

export const getUserStoriesThunk = () => async dispatch => {
  try {
    let stories = await axios.get(`/api/stories/user`);
    dispatch(getUserStories(stories.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_STORY:
      return Object.assign({}, state, { currentStory: action.currentStory });
    case GET_USER_STORIES:
      return Object.assign({}, state, {
        currentStories: action.currentStories,
        filteredStories: action.currentStories
      });
    case SET_CATEGORY:
      let stories =
        action.category !== 'all'
          ? state.currentStories.filter(
              story => story.user_role.role === action.category
            )
          : state.currentStories;
      return Object.assign({}, state, {
        category: action.category,
        filteredStories: stories
      });
    default:
      return state;
  }
}

// we add a prop category to the state
// stories are filtered
