/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_COMMENTS,
  FETCH_ALL_COMMENTS_FULFILLED,
  CREATE_COMMENT,
  CREATE_COMMENT_FULFILLED,
  COMMENT_OPERATION_REJECTED,
} from '../Actions/ActionTypes'

// The initial comments state
let initialState = {
  fetchedComments: [],
  createResponse: null,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the comments state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_COMMENTS:
      return {
        ...state,
        fetching: true,
        fetchedComments: [],
        createResponse: null,
      }
    case FETCH_ALL_COMMENTS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedComments: action.payload.items,
      }
    case CREATE_COMMENT:
      return {
        ...state,
        fetching: true
      }
    case CREATE_COMMENT_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload
      }
    case COMMENT_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer
