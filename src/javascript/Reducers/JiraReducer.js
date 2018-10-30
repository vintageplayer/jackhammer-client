/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_JIRA_DETAILS,
  FETCH_JIRA_DETAILS_FULFILLED,
  CREATE_JIRA_DETAILS,
  CREATE_JIRA_DETAILS_FULFILLED,
  UPDATE_JIRA_DETAILS,
  UPDATE_JIRA_DETAILS_FULFILLED,
  JIRA_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial jira state
let initialState = {
  jiraDetails: null,
  createResponse: false,
  updateResponse: false,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the jira state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_JIRA_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
        error: null,
      }
    case FETCH_JIRA_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        jiraDetails: action.payload,
      }
    case CREATE_JIRA_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        error: null,
      }
    case CREATE_JIRA_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true
      }
    case UPDATE_JIRA_DETAILS:
      return {
        ...state,
        fetching: true,
        updateResponse: false,
        error: null,
      }
    case UPDATE_JIRA_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true
      }
    case JIRA_OPERATION_REJECTED:
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
