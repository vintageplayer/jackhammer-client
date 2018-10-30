/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_ALL_NAVIGATION_ACTIONS, FETCH_ALL_NAVIGATION_ACTIONS_FULFILLED, FETCH_ALL_NAVIGATION_ACTIONS_REJECTED} from '../Actions/ActionTypes'
// The initial navaigation actions state
let initialState = {
  fetchedActions: [],
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the navaigation actions state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_NAVIGATION_ACTIONS:
      return {
        ...state,
        fetching: true
      }
    case FETCH_ALL_NAVIGATION_ACTIONS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedActions: action.payload.items
      }
    case FETCH_ALL_NAVIGATION_ACTIONS_REJECTED:
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
