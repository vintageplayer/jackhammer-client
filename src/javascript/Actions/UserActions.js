/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_FULFILLED,
  FETCH_USER,
  FETCH_USER_FULFILLED,
  UPDATE_USER,
  UPDATE_USER_FULFILLED,
  DELETE_USER,
  DELETE_USER_FULFILLED,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FULFILLED,
  USER_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch all users
 */

export function fetchAllUsers(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_USERS});
    axios.post(AUTH_BASE_URL + "users/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_USERS_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: USER_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function fetchUser(userId) {
  return function(dispatch) {
    dispatch({type: FETCH_USER});
    axios.get(AUTH_BASE_URL + "users/" + userId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_USER_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: USER_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function updateUser(payload, userId) {
  return function(dispatch) {
    dispatch({type: UPDATE_USER});
    axios.put(AUTH_BASE_URL + "users/" + userId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_USER_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: USER_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function deleteUser(userId) {
  return function(dispatch) {
    dispatch({type: DELETE_USER});
    axios.delete(AUTH_BASE_URL + "users/" + userId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_USER_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: USER_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function updatePassword(payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_PASSWORD});
    axios.post(AUTH_BASE_URL + "users/change_password", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_PASSWORD_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: USER_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
