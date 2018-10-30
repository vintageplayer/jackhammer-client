/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_ROLES,
  FETCH_ALL_ROLES_FULFILLED,
  CREATE_ROLE,
  CREATE_ROLE_FULFILLED,
  FETCH_ROLE,
  FETCH_ROLE_FULFILLED,
  UPDATE_ROLE,
  UPDATE_ROLE_FULFILLED,
  DELETE_ROLE,
  DELETE_ROLE_FULFILLED,
  ROLE_OPERATION_REJECTED,
} from '../Actions/ActionTypes'

// The initial roles state
let initialState = {
  fetchedRoles: [],
  totalSize: 0,
  role: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  readAllowed: false,
  createAllowed: false,
  deleteAllowed: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the roles state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_ROLES:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        error: null,
      }
    case FETCH_ALL_ROLES_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedRoles: action.payload.items,
        totalSize: action.payload.total,
        error: null,
        createAllowed: action.payload.createAllowed,
        updateAllowed: action.payload.updateAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed
      }
    case CREATE_ROLE:
      return {
        ...state,
        fetching: true,
      }
    case CREATE_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload,
      }
    case FETCH_ROLE:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        role: action.payload
      }
    case UPDATE_ROLE:
      return {
        ...state,
        fetching: true,
      }
    case UPDATE_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case DELETE_ROLE:
      return {
        ...state,
        fetching: true,
      }
    case DELETE_ROLE_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload
      }
    case ROLE_OPERATION_REJECTED:
      return {
        ...state,
        fetched: true,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer
