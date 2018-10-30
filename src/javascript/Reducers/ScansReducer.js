/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_SCANS,
  FETCH_ALL_SCANS_REJECTED,
  FETCH_ALL_SCANS_FULFILLED,
  CREATE_SCAN,
  CREATE_SCAN_FULFILLED,
  CREATE_SCAN_REJECTED,
  FETCH_SCAN,
  FETCH_SCAN_FULFILLED,
  FETCH_SCAN_REJECTED,
  UPDATE_SCAN,
  UPDATE_SCAN_FULFILLED,
  DELETE_SCAN,
  DELETE_SCAN_FULFILLED,
  DELETE_SCAN_REJECTED,
  SCAN_OPERATION_REJECTED
} from '../Actions/ActionTypes'

// The initial scans state
let initialState = {
  fetchedScans: [],
  currentOwnerType: null,
  currentScanType: null,
  createAllowed: false,
  readAllowed: false,
  deleteAllowed: false,
  readFindingsAllowed: false,
  scan: null,
  totalSize: 0,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the scans state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SCANS:
      return {
        ...state,
        fetching: true,
        fetchedScans: [],
        deleteResponse: null,
        updateResponse: null,
        createResponse: null
      }
    case FETCH_ALL_SCANS_FULFILLED:
      return {
        ...state,
        fetched: true,
        currentScanType: action.payload.scanType,
        currentOwnerType: action.payload.ownerType,
        fetchedScans: action.payload.items,
        totalSize: action.payload.total,
        createAllowed: action.payload.createAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed,
        readFindingsAllowed: action.payload.readFindingsAllowed,
      }
    case CREATE_SCAN:
      return {
        ...state,
        fetching: true
      }
    case CREATE_SCAN_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload
      }
    case FETCH_SCAN:
      return {
        ...state,
        fetching: true
      }
    case FETCH_SCAN_FULFILLED:
      return {
        ...state,
        fetched: true,
        scan: action.payload
      }
    case UPDATE_SCAN:
      return {
        ...state,
        fetching: true
      }
    case UPDATE_SCAN_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload
      }
    case DELETE_SCAN:
      return {
        ...state,
        fetching: true
      }
    case DELETE_SCAN_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload
      }
    case SCAN_OPERATION_REJECTED:
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
