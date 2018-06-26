import { createStore, combineReducers, applyMiddleware } from 'redux'
// import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import pictures from './pictures'


const reducer = combineReducers({
user, pictures
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);
const store = createStore(reducer, middleware);


export default store;
export * from './user';
