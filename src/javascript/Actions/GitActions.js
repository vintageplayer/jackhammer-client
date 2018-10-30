/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_GIT_DETAILS,
  FETCH_GIT_DETAILS_FULFILLED,
  CREATE_GIT_DETAILS,
  CREATE_GIT_DETAILS_FULFILLED,
  UPDATE_GIT_DETAILS,
  UPDATE_GIT_DETAILS_FULFILLED,
  GIT_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch  git details and create or update git details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_GIT_DETAILS});
    axios.get(AUTH_BASE_URL + "git/" + id, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_GIT_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: GIT_OPERATION_REJECTED, payload: error.response})
    })
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_GIT_DETAILS});
    axios.post(AUTH_BASE_URL + "git", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: CREATE_GIT_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: GIT_OPERATION_REJECTED, payload: error.response})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_GIT_DETAILS});
    axios.put(AUTH_BASE_URL + "git/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_GIT_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: GIT_OPERATION_REJECTED, payload: error.response})
    })
  }
}
