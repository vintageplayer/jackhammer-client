/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_GIT_DETAILS,
  FETCH_GIT_DETAILS_FULFILLED,
  CREATE_GIT_DETAILS,
  CREATE_GIT_DETAILS_FULFILLED,
  UPDATE_GIT_DETAILS,
  UPDATE_GIT_DETAILS_FULFILLED,
  GIT_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial git state
let initialState = {
  gitDetails: null,
  createResponse: false,
  updateResponse: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the git state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GIT_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
        error: null
      }
    case FETCH_GIT_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        gitDetails: action.payload
      }
    case CREATE_GIT_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        error: null
      }
    case CREATE_GIT_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true,
      }
    case UPDATE_GIT_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
        error: null
      }
    case UPDATE_GIT_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true,
      }
    case GIT_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        createResponse: false,
        updateResponse: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer;
