import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyDW4x3Cvt28hIG3RV9KR4i7vKOBZ5ht-cg',
  authDomain: 'exquisite-comics.firebaseapp.com',
  databaseURL: 'https://exquisite-comics.firebaseio.com',
  projectId: 'exquisite-comics',
  storageBucket: 'exquisite-comics.appspot.com',
  messagingSenderId: '106821778451'
};
firebase.initializeApp(config);

export const storage = firebase.storage();
// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();
// export default firebase;
