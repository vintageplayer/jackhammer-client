/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_TOOLS,
  FETCH_ALL_TOOLS_FULFILLED,
  CREATE_TOOL,
  CREATE_TOOL_FULFILLED,
  FETCH_TOOL,
  FETCH_TOOL_FULFILLED,
  UPDATE_TOOL,
  UPDATE_TOOL_FULFILLED,
  DELETE_TOOL,
  DELETE_TOOL_FULFILLED,
  TOOL_OPERATION_REJECTED,
} from '../Actions/ActionTypes'
// The initial tool state
let initialState = {
  fetchedTools: [],
  totalSize: 0,
  tool: null,
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

// Takes care of changing the tools state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_TOOLS:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        error: null
      }
    case FETCH_ALL_TOOLS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedTools: action.payload.items,
        totalSize: action.payload.total,
        createAllowed: action.payload.createAllowed,
        updateAllowed: action.payload.updateAllowed,
        readAllowed: action.payload.readAllowed,
        deleteAllowed: action.payload.deleteAllowed,
      }
    case CREATE_TOOL:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case CREATE_TOOL_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload,
      }
    case FETCH_TOOL:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case FETCH_TOOL_FULFILLED:
      return {
        ...state,
        fetched: true,
        tool: action.payload,
      }
    case UPDATE_TOOL:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case UPDATE_TOOL_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case DELETE_TOOL:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case DELETE_TOOL_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload,
      }
    case TOOL_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer;
