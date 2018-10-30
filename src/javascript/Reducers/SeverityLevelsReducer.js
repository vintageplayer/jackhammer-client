/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_SEVERITY_LEVELS,
  FETCH_SEVERITY_LEVELS_FULFILLED,
  UPDATE_SEVERITY_LEVELS,
  UPDATE_SEVERITY_LEVELS_FULFILLED,
  SEVERITY_LEVELS_OPERATION_REJECTED,
} from '../Actions/ActionTypes'

// The initial severity level state
let initialState = {
  severityLevels: null,
  updateResponse: false,
  fetching: false,
  fetched: false,
  updateAllowed: false,
  error: null,
}

// Takes care of changing the severity level state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEVERITY_LEVELS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false
      }
    case FETCH_SEVERITY_LEVELS_FULFILLED:
      return {
        ...state,
        fetched: true,
        severityLevels: action.payload.items,
        updateAllowed: action.payload.updateAllowed,
      }
    case UPDATE_SEVERITY_LEVELS:
      return {
        ...state,
        fetching: true,
        updateResponse: false
      }
    case UPDATE_SEVERITY_LEVELS_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true
      }
    case SEVERITY_LEVELS_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer;
