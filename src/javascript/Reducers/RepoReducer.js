/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_GROUP_REPOS, FETCH_GROUP_REPOS_FULFILLED, REPO_OPERATION_REJECTED,} from '../Actions/ActionTypes'
// The initial repos state
let initialState = {
  groupRepos: [],
  currentGroup: null,
  totalCount: 0,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the repos state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROUP_REPOS:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_GROUP_REPOS_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentGroup: action.payload.item,
        groupRepos: action.payload.items,
        totalCount: action.payload.total,
      }
    case REPO_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export default reducer
