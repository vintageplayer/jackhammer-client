/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_ANALYTICS_DATA, FETCH_ANALYTICS_DATA_FULFILLED, ANALYTICS_DATA_OPERATION_REJECTED} from '../Actions/ActionTypes'

// The initial analytics state
let initialState = {
  analyticsData: null,
  currentOwnerType: null,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the analytics state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ANALYTICS_DATA:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_ANALYTICS_DATA_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentOwnerType: action.payload.ownerType,
        analyticsData: action.payload.items[0],
      }
    case ANALYTICS_DATA_OPERATION_REJECTED:
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
