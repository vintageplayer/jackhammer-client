/*
 * The reducer takes care of state changes in our app through actions
 */
import {
  FETCH_ALL_SCAN_TYPES,
  FETCH_ALL_SCAN_TYPES_FULFILLED,
  CREATE_SCAN_TYPE,
  CREATE_SCAN_TYPE_FULFILLED,
  FETCH_SCAN_TYPE,
  FETCH_SCAN_TYPE_FULFILLED,
  UPDATE_SCAN_TYPE,
  UPDATE_SCAN_TYPE_FULFILLED,
  DELETE_SCAN_TYPE,
  DELETE_SCAN_TYPE_FULFILLED,
  SCAN_TYPE_OPERATION_REJECTED,
} from '../Actions/ActionTypes'

// The initial scan type state
let initialState = {
  fetchedScanTypes: [],
  ownerType: null,
  scanType: null,
  totalSize: 0,
  scanType: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  updateAllowed: false,
  readAllowed: false,
  createAllowed: false,
  deleteAllowed: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the scan type state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SCAN_TYPES:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        error: null
      }
    case FETCH_ALL_SCAN_TYPES_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedScanTypes: action.payload.items,
        ownerType: action.payload.ownerType,
        scanType: action.payload.scanType,
        totalSize: action.payload.total,
        createAllowed: action.payload.createAllowed,
        updateAllowed: action.payload.updateAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed
      }
    case CREATE_SCAN_TYPE:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case CREATE_SCAN_TYPE_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload,
      }
    case FETCH_SCAN_TYPE:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case FETCH_SCAN_TYPE_FULFILLED:
      return {
        ...state,
        fetched: true,
        scanType: action.payload,
      }
    case UPDATE_SCAN_TYPE:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case UPDATE_SCAN_TYPE_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case DELETE_SCAN_TYPE:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case DELETE_SCAN_TYPE_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload,
      }
    case SCAN_TYPE_OPERATION_REJECTED:
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
