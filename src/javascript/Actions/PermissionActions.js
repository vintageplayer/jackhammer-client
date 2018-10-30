/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_PERMISSIONS,
  FETCH_ALL_PERMISSIONS_FULFILLED,
  CREATE_PERMISSION,
  CREATE_PERMISSION_FULFILLED,
  FETCH_PERMISSION,
  FETCH_PERMISSION_FULFILLED,
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_FULFILLED,
  DELETE_PERMISSION,
  DELETE_PERMISSION_FULFILLED,
  PERMISSION_OPERATION_REJECTED,
} from './ActionTypes'

/**
 * Fetch all permissions
 */

export function fetchAllPermissions(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_PERMISSIONS});
    axiosInstance
      .post("permissions/list", payload)
      .then((response) => {
        dispatch({type: FETCH_ALL_PERMISSIONS_FULFILLED, payload: response.data});
      })
      .catch((err) => {
        dispatch({type: PERMISSION_OPERATION_REJECTED, payload: err})
      })
  }
}

export function createPermission(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_PERMISSION});
    axiosInstance
      .post("permissions", payload)
      .then((response) => {
        dispatch({type: CREATE_PERMISSION_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: PERMISSION_OPERATION_REJECTED, payload: err})
      })
  }
}

export function fetchPermission(permissionId) {
  return function(dispatch) {
    dispatch({type: FETCH_PERMISSION});
    axiosInstance
      .get("permissions/" + permissionId)
      .then((response) => {
        dispatch({type: FETCH_PERMISSION_FULFILLED, payload: response.data});
      })
      .catch((err) => {
        dispatch({type: PERMISSION_OPERATION_REJECTED, payload: err})
      })
  }
}
export function updatePermission(payload, permissionId) {
  return function(dispatch) {
    dispatch({type: UPDATE_PERMISSION});
    axiosInstance
      .put("permissions/" + permissionId, payload)
      .then((response) => {
        dispatch({type: UPDATE_PERMISSION_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: PERMISSION_OPERATION_REJECTED, payload: err})
      })
  }
}
export function deletePermission(permissionId) {
  return function(dispatch) {
    dispatch({type: DELETE_PERMISSION});
    axiosInstance
      .delete("permissions/" + permissionId)
      .then((response) => {
        dispatch({type: DELETE_PERMISSION_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: PERMISSION_OPERATION_REJECTED, payload: err})
      })
  }
}
