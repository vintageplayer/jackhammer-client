/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_FULFILLED, DASHBOARD_DATA_OPERATION_REJECTED} from '../Actions/ActionTypes'

// The initial dashboard state
let initialState = {
  dashboardData: null,
  currentOwnerType: null,
  currentScanType: null,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the dashboard state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_DASHBOARD_DATA_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentOwnerType: action.payload.ownerType,
        currentScanType: action.payload.scanType,
        dashboardData: action.payload.items[0],
      }
    case DASHBOARD_DATA_OPERATION_REJECTED:
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
