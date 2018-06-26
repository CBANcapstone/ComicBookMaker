import { db, auth, provider } from '../config/firebase';

const userSession = (user, dispatch) => {
  let { displayName, email, photoURL } = user;

  db.collection('users')
    .doc(email)
    .get()
    .then(user => {
      if (user.exists) {
        return user;
      } else {
        return db
          .collection('users')
          .doc(email)
          .set({
            displayName,
            email,
            photoURL,
            chapters: []
          });
      }
    })
    .then(user => {
      dispatch(getUser(user.data()));
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

//Action creators
export const login = user => ({ type: LOGIN, user });
export const logout = user => ({ type: LOGOUT, user });
export const getUser = user => ({ type: GET_USER, user });

//Thunk creators
export const loginThunk = () => dispatch => {
  auth.signInWithPopup(provider).then(result => {
    userSession(result.user, dispatch);
  });
};

export const logoutThunk = () => dispatch => {
  auth.signOut().then(() => {
    dispatch(logout(null));
  });
};

export const getUserThunk = user => dispatch => {
  userSession(user, dispatch);
};

export default function(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return action.user;
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
