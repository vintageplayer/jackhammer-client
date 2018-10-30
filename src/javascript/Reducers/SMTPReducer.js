/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_SMTP_DETAILS,
  FETCH_SMTP_DETAILS_FULFILLED,
  CREATE_SMTP_DETAILS,
  CREATE_SMTP_DETAILS_FULFILLED,
  UPDATE_SMTP_DETAILS,
  UPDATE_SMTP_DETAILS_FULFILLED,
  SMTP_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial smtp state
let initialState = {
  smtpDetails: null,
  createResponse: false,
  updateResponse: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the smtp state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SMTP_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        updateResponse: false,
        error: null
      }
    case FETCH_SMTP_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        smtpDetails: action.payload
      }
    case CREATE_SMTP_DETAILS:
      return {
        ...state,
        fetching: true,
        createResponse: false,
        error: null,
      }
    case CREATE_SMTP_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true,
      }
    case UPDATE_SMTP_DETAILS:
      return {
        ...state,
        fetching: true,
        updateResponse: false,
        error: null,
      }
    case UPDATE_SMTP_DETAILS_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: true,
      }
    case SMTP_OPERATION_REJECTED:
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
