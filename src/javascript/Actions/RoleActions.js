/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
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
} from './ActionTypes'

/**
 * Fetch all roles
 */
export function fetchAllRoles(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_ROLES});
    axios.post(AUTH_BASE_URL + "roles/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_ROLES_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: ROLE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function createRole(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_ROLE});
    axios.post(AUTH_BASE_URL + "roles", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_ROLE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: ROLE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function fetchRole(roleId) {
  return function(dispatch) {
    dispatch({type: FETCH_ROLE});
    axios.get(AUTH_BASE_URL + "roles/" + roleId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ROLE_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: ROLE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function updateRole(payload, roleId) {
  return function(dispatch) {
    dispatch({type: UPDATE_ROLE});
    axios.put(AUTH_BASE_URL + "roles/" + roleId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_ROLE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: ROLE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function deleteRole(roleId) {
  return function(dispatch) {
    dispatch({type: DELETE_ROLE});
    axios.delete(AUTH_BASE_URL + "roles/" + roleId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: DELETE_ROLE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: ROLE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
