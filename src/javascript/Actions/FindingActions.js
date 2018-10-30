/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
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
} from './ActionTypes'

/**
 * Fetch all findings
 */
export function fetchAllFindings(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_FINDINGS});
    axios.post(AUTH_BASE_URL + "findings/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_FINDINGS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: FINDING_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function fetchFinding(findingId, repoPage) {
  return function(dispatch) {
    dispatch({type: FETCH_FINDING});
    axios.get(AUTH_BASE_URL + "findings/" + findingId + "?repoPage=" + repoPage, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_FINDING_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: FINDING_OPERATION_REJECTED, payload: err,})
    })
  }
}
export function updateFinding(payload, findingId) {
  return function(dispatch) {
    dispatch({type: UPDATE_FINDING});
    axios.put(AUTH_BASE_URL + "findings/" + findingId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_FINDING_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: FINDING_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function updateFindingStatus(payload, findingId) {
  return function(dispatch) {
    dispatch({type: UPDATE_FINDING});
    axios.put(AUTH_BASE_URL + "update_status", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_FINDING_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: FINDING_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function deleteFinding(findingId, task = null, ownerType = null, scanType = null, repoId = null, toolName = null) {
  return function(dispatch) {
    dispatch({type: DELETE_FINDING});
    var apiUri = AUTH_BASE_URL + "findings/" + findingId;
    if (toolName) {
      apiUri = apiUri + "?toolName=" + toolName;
      apiUri = apiUri + "&task=" + task;
      apiUri = apiUri + "&ownerType=" + ownerType;
      apiUri = apiUri + "&scanType=" + scanType;
      apiUri = apiUri + "&repoId=" + repoId;
      apiUri = apiUri + "&toolName=" + toolName;
    }
    axios.delete(apiUri, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_FINDING_FULFILLED, payload: response.data})
    }).catch((err) => {
      dispatch({type: FINDING_OPERATION_REJECTED, payload: err,})
    });
  }
}
