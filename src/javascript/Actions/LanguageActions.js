/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
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
  LANGUAGE_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch all languages
 */
export function fetchAllLanguages(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_LANGUAGES});
    axios.post(AUTH_BASE_URL + "languages/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_LANGUAGES_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: LANGUAGES_OPERATION_REJECTED, payload: err})
    })
  }
}
export function createLanguage(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_LANGUAGES});
    axios.post(AUTH_BASE_URL + "languages", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: CREATE_LANGUAGE_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: LANGUAGE_OPERATION_REJECTED, payload: err})
    })
  }
}

export function fetchLanguage(languageId) {
  return function(dispatch) {
    dispatch({type: FETCH_LANGUAGE});
    axios.get(AUTH_BASE_URL + "languages/" + languageId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_LANGUAGE_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: LANGUAGE_OPERATION_REJECTED, payload: err})
    })
  }
}
export function updateLanguage(payload, languageId) {
  return function(dispatch) {
    dispatch({type: UPDATE_LANGUAGE});
    axios.put(AUTH_BASE_URL + "languages/" + languageId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_LANGUAGE_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: LANGUAGE_OPERATION_REJECTED, payload: err})
    })
  }
}
export function deleteLanguage(languageId) {
  return function(dispatch) {
    dispatch({type: DELETE_LANGUAGE});
    axios.delete(AUTH_BASE_URL + "languages/" + languageId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_LANGUAGE_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: LANGUAGE_OPERATION_REJECTED, payload: err})
    })
  }
}
