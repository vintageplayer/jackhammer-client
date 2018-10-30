/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_APPLICATIONS_DATA, FETCH_APPLICATIONS_DATA_FULFILLED, APPLICATIONS_DATA_OPERATION_REJECTED} from '../Actions/ActionTypes'

// The initial application state
let initialState = {
  applicationsData: null,
  currentScanType: null,
  currentOwnerType: null,
  totalCount: 0,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the application state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPLICATIONS_DATA:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_APPLICATIONS_DATA_FULFILLED:
      console.log("action.payload", action.payload);
      return {
        ...state,
        fetched: true,
        currentScanType: action.payload.scanType,
        currentOwnerType: action.payload.ownerType,
        applicationsData: action.payload.items,
        totalCount: action.payload.total,
      }
    case APPLICATIONS_DATA_OPERATION_REJECTED:
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
