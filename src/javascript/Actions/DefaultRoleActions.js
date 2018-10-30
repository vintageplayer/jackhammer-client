/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_DEFAULT_ROLE,
  FETCH_DEFAULT_ROLE_FULFILLED,
  CREATE_DEFAULT_ROLE,
  CREATE_DEFAULT_ROLE_FULFILLED,
  UPDATE_DEFAULT_ROLE,
  UPDATE_DEFAULT_ROLE_FULFILLED,
  DEFAULT_ROLE_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch  smtp details and create or update smtp details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_DEFAULT_ROLE});
    axios.get(AUTH_BASE_URL + "default_role/" + id, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_DEFAULT_ROLE_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: DEFAULT_ROLE_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_DEFAULT_ROLE});
    axios.post(AUTH_BASE_URL + "default_role", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_DEFAULT_ROLE_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: DEFAULT_ROLE_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_DEFAULT_ROLE});
    axios.put(AUTH_BASE_URL + "default_role/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_DEFAULT_ROLE_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: DEFAULT_ROLE_OPERATION_REJECTED, payload: err,})
    })
  }
}
