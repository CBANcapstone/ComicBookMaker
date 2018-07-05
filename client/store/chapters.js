import axios from 'axios';

const GET_CHAPTERS = 'GET_CHAPTERS';

const getChapters = chapters => ({
  type: GET_CHAPTERS,
  chapters
});

export const fetchChaptersThunk = storyId => dispatch => {
  axios
    .get(`/api/stories/${storyId}/chapters`)
    .then(res => {
      dispatch(getChapters(res.data));
    })
    .catch(err => console.log(err));
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_CHAPTERS:
      return Object.assign([], state, action.chapters);
    default:
      return state;
  }
}
