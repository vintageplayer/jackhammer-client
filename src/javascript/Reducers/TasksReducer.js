/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_ALL_TASKS, FETCH_ALL_TASKS_FULFILLED, FETCH_ALL_TASKS_REJECTED,} from '../Actions/ActionTypes'
// The initial task state
let initialState = {
  fetchedTasks: [],
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the task state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_TASKS:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_ALL_TASKS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedTasks: action.payload.items,
      }
    case FETCH_ALL_TASKS_REJECTED:
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
