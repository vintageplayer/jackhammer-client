/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_FINDINGS,
  FETCH_ALL_FINDINGS_FULFILLED,
  FETCH_FINDING,
  FETCH_FINDING_FULFILLED,
  UPDATE_FINDING,
  UPDATE_FINDING_FULFILLED,
  DELETE_FINDING,
  DELETE_FINDING_FULFILLED,
  FINDING_OPERATION_REJECTED,
} from '../Actions/ActionTypes'

// The initial findings state
let initialState = {
  fetchedFindings: [],
  findingsSummary: null,
  totalSize: 0,
  finding: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  fetching: false,
  fetched: false,
  error: null
}

// Takes care of changing the findings state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_FINDINGS:
      return {
        ...state,
        fetching: true,
        fetchedFindings: [],
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
        updateAllowed: false
      }
    case FETCH_ALL_FINDINGS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedFindings: action.payload.items,
        findingsSummary: action.payload.item,
        totalSize: action.payload.total,
        updateAllowed: action.payload.updateAllowed
      }
    case FETCH_FINDING:
      return {
        ...state,
        fetchedFindings: [],
        updateResponse: null,
        deleteResponse: null,
        updateResponse: null,
        fetching: true,
        finding: null,
      }
    case FETCH_FINDING_FULFILLED:
      return {
        ...state,
        fetched: true,
        finding: action.payload
      }
    case UPDATE_FINDING:
      return {
        ...state,
        fetching: true,
      }
    case UPDATE_FINDING_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload,
      }
    case DELETE_FINDING:
      return {
        ...state,
        fetching: true,
      }
    case DELETE_FINDING_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload,
      }
    case FINDING_OPERATION_REJECTED:
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
