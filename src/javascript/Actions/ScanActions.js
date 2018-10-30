/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_SCANS,
  FETCH_ALL_SCANS_FULFILLED,
  CREATE_SCAN,
  CREATE_SCAN_FULFILLED,
  FETCH_SCAN,
  FETCH_SCAN_FULFILLED,
  UPDATE_SCAN,
  UPDATE_SCAN_FULFILLED,
  DELETE_SCAN,
  DELETE_SCAN_FULFILLED,
  SCAN_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch all scans
 */

export function fetchAllScans(payload, scanType) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_SCANS});
    axios.post(AUTH_BASE_URL + "scans/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_SCANS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function createScan(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_SCAN});
    axios.post(AUTH_BASE_URL + "scans/create_scan", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: CREATE_SCAN_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function createMobileScan(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_SCAN});
    axios.post(AUTH_BASE_URL + "scans", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: CREATE_SCAN_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function fetchScan(scanId) {
  return function(dispatch) {
    dispatch({type: FETCH_SCAN});
    axios.get(AUTH_BASE_URL + "scans/" + scanId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_SCAN_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}
export function updateScan(payload, scanId) {
  return function(dispatch) {
    dispatch({type: UPDATE_SCAN});
    axios.put(AUTH_BASE_URL + "scans/" + scanId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_SCAN_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}
export function deleteScan(scanId) {
  return function(dispatch) {
    dispatch({type: DELETE_SCAN});
    axios.delete(AUTH_BASE_URL + "scans/" + scanId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_SCAN_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: SCAN_OPERATION_REJECTED, payload: err,})
    })
  }
}
