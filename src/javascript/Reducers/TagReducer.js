/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_ALL_FINDING_TAGS, FETCH_ALL_FINDING_TAGS_FULFILLED, ADD_TAG, ADD_TAG_FULFILLED, TAG_OPERATION_REJECTED} from '../Actions/ActionTypes'

// The initial tag state
let initialState = {
  fetchedTags: [],
  createResponse: null,
  deleteResponse: null,
  fetching: false,
  fetched: false,
  error: null,
}
// Takes care of changing the tag state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_FINDING_TAGS:
      return {
        ...state,
        fetching: true,
        createResponse: null,
        error: null,
      }
    case FETCH_ALL_FINDING_TAGS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedTags: action.payload.items,
      }
    case ADD_TAG:
      return {
        ...state,
        fetching: true
      }
    case ADD_TAG_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: true,
      }
    case TAG_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload.response.data
      }
    default:
      return state
  }
}
export default reducer
