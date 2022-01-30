import { combineReducers } from 'redux' 
import authReducer from './authReducer'
import locationReducer from './locationReducer'

export default combineReducers({
    userdata: authReducer,
    location: locationReducer
})