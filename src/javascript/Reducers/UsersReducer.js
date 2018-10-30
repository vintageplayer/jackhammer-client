/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_FULFILLED,
  FETCH_ALL_USERS_REJECTED,
  CREATE_USER,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  UPDATE_USER,
  UPDATE_USER_FULFILLED,
  DELETE_USER,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FULFILLED,
  USER_OPERATION_REJECTED,
} from '../Actions/ActionTypes'
// The initial users state
let initialState = {
  fetchedUsers: [],
  totalSize: 0,
  user: null,
  updateResponse: null,
  updatePassword: null,
  deleteResponse: null,
  createResponse: null,
  updateAllowed: false,
  readAllowed: false,
  deleteAllowed: false,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the users state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        error: null,
      }
    case FETCH_ALL_USERS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedUsers: action.payload.items,
        totalSize: action.payload.total,
        updateAllowed: action.payload.updateAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed
      }
    case FETCH_USER:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        fetched: true,
        user: action.payload,
      }
    case UPDATE_USER:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case UPDATE_USER_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        fetching: true,
        updatePassword: null,
        error: null,
      }
    case UPDATE_PASSWORD_FULFILLED:
      return {
        ...state,
        fetched: true,
        updatePassword: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case DELETE_USER_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload,
      }
    case USER_OPERATION_REJECTED:
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
