import {LOGIN_USER, SET_LOCATION} from '../type';

export const loginUser = (userdata) => {
  return async (dispatch) => {
    if (userdata && userdata._id) {
      dispatch({
        type: LOGIN_USER,
        payload: userdata,
      });
    }
  };
};

export const logoutUser = () => {

  return async (dispatch) => {
      dispatch({
        type: LOGIN_USER,
        payload: null,
      });
  };
};

export const setLocation = (location) => {
  return async (dispatch) => {
      dispatch({
        type: SET_LOCATION,
        payload: location,
      });
  };
};
