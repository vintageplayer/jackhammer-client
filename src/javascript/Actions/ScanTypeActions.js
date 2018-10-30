/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type

import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_SCAN_TYPES,
  FETCH_ALL_SCAN_TYPES_FULFILLED,
  CREATE_SCAN_TYPE,
  CREATE_SCAN_TYPE_FULFILLED,
  FETCH_SCAN_TYPE,
  FETCH_SCAN_TYPE_FULFILLED,
  UPDATE_SCAN_TYPE,
  UPDATE_SCAN_TYPE_FULFILLED,
  DELETE_SCAN_TYPE,
  DELETE_SCAN_TYPE_FULFILLED,
  SCAN_TYPE_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch all scan types
 */
export function fetchAllScanTypes(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_SCAN_TYPES});
    axios.post(AUTH_BASE_URL + "scan_types/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_SCAN_TYPES_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: SCAN_TYPE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function createScanType(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_SCAN_TYPE});
    axios.post(AUTH_BASE_URL + "scan_types", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_SCAN_TYPE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: SCAN_TYPE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function fetchScanType(scanTypeId) {
  return function(dispatch) {
    dispatch({type: FETCH_SCAN_TYPE});
    axios.get(AUTH_BASE_URL + "scan_types/" + scanTypeId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_SCAN_TYPE_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: SCAN_TYPE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function updateScanType(payload, scanTypeId) {
  return function(dispatch) {
    dispatch({type: UPDATE_SCAN_TYPE});
    axios.put(AUTH_BASE_URL + "scan_types/" + scanTypeId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_SCAN_TYPE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: SCAN_TYPE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function deleteScanType(scanTypeId) {
  return function(dispatch) {
    dispatch({type: DELETE_SCAN_TYPE});
    axios.delete(AUTH_BASE_URL + "scan_types/" + scanTypeId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: DELETE_SCAN_TYPE_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: SCAN_TYPE_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
