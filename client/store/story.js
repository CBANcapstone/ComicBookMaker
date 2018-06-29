import axios from 'axios';
import history from '../history';

const GET_STORY = 'GET_STORY'
const GET_USER_STORY = 'GET_USER_STORY'

const getStory = story => ({
  type: GET_STORY,
  story
});

const getUserStories = stories => ({
  type: GET_USER_STORY,
  stories
})

// const getUserStories = stories => ({
//   type: GET_USER_STORY,
//   stories
// })

export const createStoryThunk = templateId => dispatch => {
  axios
    .post('/api/stories/createstory', {
      templateId
    })
    .then(res => {
      // dispatch(getStory(res.data))
      history.push(`/stories/${res.data.id}`);
    })
    .catch(err => console.log(err));
};

export const fetchStoryThunk = storyId => async dispatch => {
  let story = await axios.get(`/api/stories/${storyId}`);
  console.log('FETCHED STORY', story.data);
  dispatch(getStory(story.data));
};

export const getUserStoriesThunk = userId => dispatch =>{
  axios
  .get(`/api/stories/user/${userId}`)
  .then(stories => {
    console.log('---',stories.data)
    dispatch(getUserStories(stories.data));
    // history.push('/templates');
  // .get(`{/api/stories/${1}}`)
  //
  })
  .catch(err => console.log(err));
}


// export const getUserStoriesThunk = userId => dispatch =>{
//   axios
//   .get(`/api/stories/${userId}`)
//   .then(stories => {
//     dispatch(getUserStories(stories.data));
//     // history.push('/templates');
//   // .get(`{/api/stories/${1}}`)
//   //
//   })
//   .catch(err => console.log(err));
// }

export default function(state = [], action) {
  switch (action.type) {
    case GET_STORY:
      return Object.assign({}, state, action.story)
    case GET_USER_STORY:
      return Object.assign([], state, action.stories)
    default:
      return state;
  }
}
