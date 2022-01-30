//Config for redux globel store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../Redux/Reducers/index';

const middleware = [
  thunk,
  // logger
]

export default configReduxStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)))
}
