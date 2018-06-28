import axios from 'axios';
import history from '../history';

const GET_CHAPTER = 'GET_CHAPTER';

const getChapter = chapter => ({ type: GET_CHAPTER, chapter });

export const getChapterThunk = (chapterId, storyId) => async dispatch => {
    let res = await axios.get(`/api/stories/${storyId}/${chapterId}`)
    dispatch(getChapter(res.data))
    history.push(`/stories/${storyId}`)
}

export const saveChapterImageThunk = image => async dispatch => {
    // save it to firebase storage
    // save the link to DB
    // dispatch new chapter to the state
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CHAPTER:
      return Object.assign({}, state, action.chapter);
    default:
      return state;
  }
};
