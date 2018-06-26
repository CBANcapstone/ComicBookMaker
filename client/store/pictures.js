import { db, auth, provider } from '../config/firebase';

const GET_USER_PICTURES = 'GET_USER_PICTURES';

const getUserPictures = pictures => {
  type : GET_USER_PICTURES,
  pictures
}


// [sdgd, sgd, ersdgtf]
export const getUserPicturesThunk = (pictures) => dispatch => {
  const pics = Promise.all(pictures.map(picId => {
    // return db.collection('pictures').where('id', '==', picId)
    // .get()
  }))
  console.log('PICS', pics)
};

export default function(state = null, action) {
  switch (action.type) {
    case GET_USER_PICTURES:
      return action.pictures;
    default:
      return state;
  }
}
