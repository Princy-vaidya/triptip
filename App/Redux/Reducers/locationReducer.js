import {SET_LOCATION} from '../type'

export default function(state = null, action) {
    switch (action.type) {
      case SET_LOCATION:
        return action.payload;
      default :
    }
    return state
  }
  