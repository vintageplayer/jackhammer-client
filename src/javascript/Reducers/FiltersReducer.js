/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_FILTER_RESULTS, FETCH_FILTER_RESULTS_FULFILLED, FETCH_FILTER_VALUES, FETCH_FILTER_VALUES_FULFILLED, FILTER_OPERATION_REJECTED} from '../Actions/ActionTypes'

// The initial filters state
let initialState = {
  fetchedResults: [],
  filterValues: null,
  currentOwnerType: null,
  currentScanType: null,
  findingsUpdateAllowed: false,
  totalSize: 0,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the filters state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTER_VALUES:
      return {
        ...state,
        fetching: true
      }
    case FETCH_FILTER_VALUES_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentScanType: action.payload.scanType,
        currentOwnerType: action.payload.ownerType,
        filterValues: action.payload.items[0],
        totalSize: action.payload.total,
      }
    case FETCH_FILTER_RESULTS:
      return {
        ...state,
        fetching: true
      }
    case FETCH_FILTER_RESULTS_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentScanType: action.payload.scanType,
        currentOwnerType: action.payload.ownerType,
        fetchedResults: action.payload.items,
        totalSize: action.payload.total,
        findingsUpdateAllowed: action.payload.updateAllowed
      }
    case FILTER_OPERATION_REJECTED:
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
