/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  FETCH_ALL_LANGUAGES,
  FETCH_ALL_LANGUAGES_FULFILLED,
  CREATE_LANGUAGE,
  CREATE_LANGUAGE_FULFILLED,
  FETCH_LANGUAGE,
  FETCH_LANGUAGE_FULFILLED,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_FULFILLED,
  DELETE_LANGUAGE,
  DELETE_LANGUAGE_FULFILLED,
  LANGUAGE_OPERATION_REJECTED,
} from '../Actions/ActionTypes'
// The initial language state
let initialState = {
  fetchedLanguages: [],
  totalSize: 0,
  language: null,
  updateResponse: null,
  deleteResponse: null,
  createResponse: null,
  fetching: false,
  fetched: false,
  error: null,
}

// Takes care of changing the language state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_LANGUAGES:
      return {
        ...state,
        fetching: true,
        deleteResponse: null,
        updateResponse: null,
        createResponse: null,
      }
    case FETCH_ALL_LANGUAGES_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedLanguages: action.payload.items,
        totalSize: action.payload.total,
      }
    case CREATE_LANGUAGE:
      return {
        ...state,
        fetching: true
      }
    case CREATE_LANGUAGE_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload
      }
    case FETCH_LANGUAGE:
      return {
        ...state,
        fetching: true
      }
    case FETCH_LANGUAGE_FULFILLED:
      return {
        ...state,
        fetched: true,
        language: action.payload
      }
    case UPDATE_LANGUAGE:
      return {
        ...state,
        fetching: true
      }
    case UPDATE_LANGUAGE_FULFILLED:
      return {
        ...state,
        fetched: true,
        updateResponse: action.payload
      }
    case DELETE_LANGUAGE:
      return {
        ...state,
        fetching: true
      }
    case DELETE_LANGUAGE_FULFILLED:
      return {
        ...state,
        fetched: true,
        deleteResponse: action.payload
      }
    case LANGUAGE_OPERATION_REJECTED:
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
