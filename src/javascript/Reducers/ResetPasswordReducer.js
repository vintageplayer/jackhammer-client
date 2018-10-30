/*
 * The reducer takes care of state changes in our app through actions
 */
// The initial application state

import {
  RESET_PASSWORD_INSTRUCTIONS,
  RESET_PASSWORD_INSTRUCTIONS_FULFILLED,
  VERIFY_RESET_PASSWORD_TOKEN,
  VERIFY_RESET_PASSWORD_TOKEN_FULFILLED,
  RESET_PASSWORD,
  RESET_PASSWORD_FULFILLED,
  VERIFY_PASSWORD_TOEKN_ERROR,
  RESET_PASSWORD_ERROR,
} from '../Actions/ActionTypes';
import {purgeStoredState} from 'redux-persist'
const INITIAL_STATE = {
  error: null,
  instructionSent: false,
  verifiedToken: false,
  resetPassword: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_PASSWORD_INSTRUCTIONS:
      return {
        ...state,
        error: null,
        instructionSent: false,
        verifiedToken: false,
        resetPassword: false,
      };
    case RESET_PASSWORD_INSTRUCTIONS_FULFILLED:
      return {
        ...state,
        instructionSent: true,
      };
    case VERIFY_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        error: null,
        verifiedToken: false
      };
    case VERIFY_RESET_PASSWORD_TOKEN_FULFILLED:
      return {
        ...state,
        verifiedToken: true
      };
    case RESET_PASSWORD:
      return {
        ...state,
        error: null,
        resetPassword: false,
      };
    case RESET_PASSWORD_FULFILLED:
      return {
        ...state,
        resetPassword: true,
      };
    case VERIFY_PASSWORD_TOEKN_ERROR:
      return {
        ...state,
        error: true,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
  }

  return state;
}
