import {
  ACTION__LOGIN,
  ACTION__LOGIN_FAIL,
  ACTION__LOGIN_SUCCESS,
  ACTION__LOGOUT,
} from '../constants/actions';

const initialState = {
  isInProgress: false,
  isAuthenticated: false,
  user: {},
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION__LOGIN:
      return {
        ...initialState,
        isInProgress: true,
      };
    case ACTION__LOGIN_SUCCESS:
      return {
        ...initialState,
        isAuthenticated: true,
        user: action.payload,
      };
    case ACTION__LOGIN_FAIL:
      return {
        ...initialState,
        error: action.error.message,
      };
    case ACTION__LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
