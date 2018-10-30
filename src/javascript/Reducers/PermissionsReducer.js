/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_PERMISSIONS,
  FETCH_ALL_PERMISSIONS_FULFILLED,
  FETCH_ALL_PERMISSIONS_REJECTED,
  CREATE_PERMISSION,
  CREATE_PERMISSION_FULFILLED,
  CREATE_PERMISSION_REJECTED,
  FETCH_PERMISSION,
  FETCH_PERMISSION_FULFILLED,
  FETCH_PERMISSION_REJECTED,
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_FULFILLED,
  DELETE_PERMISSION,
  DELETE_PERMISSION_FULFILLED,
  DELETE_PERMISSION_REJECTED,
  PERMISSION_OPERATION_REJECTED,
} from '../Actions/ActionTypes'
// The initial permission state
let initialState = {
  fetchedPermissions: [],
  totalSize: 0,
  permission: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the permission state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_PERMISSIONS:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null
      }
    case FETCH_ALL_PERMISSIONS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedPermissions: action.payload.items,
        totalSize: action.payload.total
      }
    case CREATE_PERMISSION:
      return {
        ...state,
        fetching: true,
      }
    case CREATE_PERMISSION_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload,
      }
    case FETCH_PERMISSION:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_PERMISSION_FULFILLED:
      return {
        ...state,
        fetched: true,
        permission: action.payload,
      }
    case UPDATE_PERMISSION:
      return {
        ...state,
        fetching: true,
      }
    case UPDATE_PERMISSION_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case DELETE_PERMISSION:
      return {
        ...state,
        fetching: true,
      }
    case DELETE_PERMISSION_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload,
      }
    case PERMISSION_OPERATION_REJECTED:
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
