/*
 * The reducer takes care of state changes in our app through actions
 */
// The initial application state
import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from '../Actions/ActionTypes';
import {purgeStoredState} from 'redux-persist'
const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  logout: false,
  authenticated: false,
  userToken: null,
  currentUser: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: false,
        userToken: null,
      };
    case SIGNUP:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: false,
        userToken: null,
      };
    case AUTH_USER:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: true,
        currentUser: action.payload,
        userToken: action.userToken
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        userToken: null
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        userToken: null,
        logout: true,
        currentUser: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
  }

  return state;
}
