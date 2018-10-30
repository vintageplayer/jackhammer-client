/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_GROUPS,
  FETCH_ALL_GROUPS_FULFILLED,
  CREATE_GROUP,
  CREATE_GROUP_FULFILLED,
  FETCH_GROUP,
  FETCH_GROUP_FULFILLED,
  UPDATE_GROUP,
  UPDATE_GROUP_FULFILLED,
  DELETE_GROUP,
  DELETE_GROUP_FULFILLED,
  GROUP_OPERATION_REJECTED,
  FETCH_GROUP_REPOS,
  FETCH_GROUP_REPOS_FULFILLED,
  FETCH_GROUP_REPOS_REJECTED,
} from './ActionTypes'

/**
 * Fetch all GROUPs
 */

export function fetchAllGroups(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_GROUPS});
    axios.post(AUTH_BASE_URL + "groups/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_GROUPS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: GROUP_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function createGroup(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_GROUP});
    axios.post(AUTH_BASE_URL + "groups", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: CREATE_GROUP_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: GROUP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function fetchGroup(groupId) {
  return function(dispatch) {
    dispatch({type: FETCH_GROUP});
    axios.get(AUTH_BASE_URL + "groups/" + groupId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_GROUP_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: GROUP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function updateGroup(payload, groupId) {
  return function(dispatch) {
    dispatch({type: UPDATE_GROUP});
    axios.put(AUTH_BASE_URL + "groups/" + groupId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_GROUP_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: GROUP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function deleteGroup(groupId) {
  return function(dispatch) {
    dispatch({type: DELETE_GROUP});
    axios.delete(AUTH_BASE_URL + "groups/" + groupId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_GROUP_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: GROUP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
