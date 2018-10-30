/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_GROUPS,
  FETCH_ALL_GROUPS_FULFILLED,
  FETCH_ALL_GROUPS_REJECTED,
  CREATE_GROUP,
  CREATE_GROUP_FULFILLED,
  CREATE_GROUP_REJECTED,
  FETCH_GROUP,
  FETCH_GROUP_FULFILLED,
  FETCH_GROUP_REJECTED,
  UPDATE_GROUP,
  UPDATE_GROUP_FULFILLED,
  DELETE_GROUP,
  DELETE_GROUP_FULFILLED,
  DELETE_GROUP_REJECTED,
  FETCH_GROUP_REPOS,
  FETCH_GROUP_REPOS_FULFILLED,
  GROUP_OPERATION_REJECTED
} from '../Actions/ActionTypes'
// The initial groups state
let initialState = {
  fetchedGroups: [],
  totalSize: 0,
  group: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  createResponse: null,
  updateAllowed: false,
  readAllowed: false,
  createAllowed: false,
  deleteAllowed: false,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the groups state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GROUPS:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        error: null,
      }
    case FETCH_ALL_GROUPS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedGroups: action.payload.items,
        totalSize: action.payload.total,
        createAllowed: action.payload.createAllowed,
        updateAllowed: action.payload.updateAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed,
      }
    case CREATE_GROUP:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case CREATE_GROUP_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload
      }
    case FETCH_GROUP:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case FETCH_GROUP_FULFILLED:
      return {
        ...state,
        fetched: true,
        group: action.payload
      }
    case UPDATE_GROUP:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case UPDATE_GROUP_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload
      }
    case DELETE_GROUP:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case DELETE_GROUP_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload
      }
    case GROUP_OPERATION_REJECTED:
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
