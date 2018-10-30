/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_DEFAULT_ROLE,
  FETCH_DEFAULT_ROLE_FULFILLED,
  CREATE_DEFAULT_ROLE,
  CREATE_DEFAULT_ROLE_FULFILLED,
  UPDATE_DEFAULT_ROLE,
  UPDATE_DEFAULT_ROLE_FULFILLED,
  DEFAULT_ROLE_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial default role state
let initialState = {
  defaultRole: null,
  createResponse: false,
  updateResponse: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the default role state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEFAULT_ROLE:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
      }
    case FETCH_DEFAULT_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        defaultRole: action.payload
      }
    case CREATE_DEFAULT_ROLE:
      return {
        ...state,
        fetching: true,
        createResponse: false,
      }
    case CREATE_DEFAULT_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true,
      }
    case UPDATE_DEFAULT_ROLE:
      return {
        ...state,
        fetching: true,
        updateResponse: false,
      }
    case UPDATE_DEFAULT_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true,
      }
    case DEFAULT_ROLE_OPERATION_REJECTED:
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
