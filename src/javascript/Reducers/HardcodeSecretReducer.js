/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_HARDCODE_SECRET,
  FETCH_HARDCODE_SECRET_FULFILLED,
  CREATE_HARDCODE_SECRET,
  CREATE_HARDCODE_SECRET_FULFILLED,
  UPDATE_HARDCODE_SECRET,
  UPDATE_HARDCODE_SECRET_FULFILLED,
  HARDCODE_SECRET_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial hardcode secret state
let initialState = {
  hardcodeSecrets: null,
  createResponse: false,
  updateResponse: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the hardcode secret state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HARDCODE_SECRET:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
      }
    case FETCH_HARDCODE_SECRET_FULFILLED:
      return {
        ...state,
        fetched: true,
        hardcodeSecrets: action.payload
      }
    case CREATE_HARDCODE_SECRET:
      return {
        ...state,
        fetching: true,
        createResponse: false,
      }
    case CREATE_HARDCODE_SECRET_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true,
      }
    case UPDATE_HARDCODE_SECRET:
      return {
        ...state,
        fetching: true,
        updateResponse: false,
      }
    case UPDATE_HARDCODE_SECRET_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true,
      }
    case HARDCODE_SECRET_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer;
