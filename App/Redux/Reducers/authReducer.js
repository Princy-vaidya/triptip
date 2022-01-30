import {LOGIN_USER} from '../type'

export default function(state = [], action) {
    switch (action.type) {
      case LOGIN_USER:
        return action.payload;
      default :
    }
    return state
  }
  