/*
 * The reducer takes care of state changes in our app through actions
 */

import {FETCH_ALL_SCHEDULE_TYPES, FETCH_SCHEDULE_TYPES_FULFILLED, SCHEDULE_TYPE_OPERATION_REJECTED,} from '../Actions/ActionTypes'
// The initial scheduled  state
let initialState = {
  fetchedScheduleTypes: [],
  ownerType: null,
  scanType: null,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the scheduled state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SCHEDULE_TYPES:
      return {
        ...state,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        fetching: true,
      }
    case FETCH_SCHEDULE_TYPES_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedScheduleTypes: action.payload.items,
        ownerType: action.payload.ownerType,
        scanType: action.payload.scanType
      }
    case SCHEDULE_TYPE_OPERATION_REJECTED:
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
