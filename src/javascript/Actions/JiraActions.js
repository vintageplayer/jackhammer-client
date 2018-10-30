/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_JIRA_DETAILS,
  FETCH_JIRA_DETAILS_FULFILLED,
  CREATE_JIRA_DETAILS,
  CREATE_JIRA_DETAILS_FULFILLED,
  UPDATE_JIRA_DETAILS,
  UPDATE_JIRA_DETAILS_FULFILLED,
  JIRA_OPERATION_REJECTED,
} from './ActionTypes'

/**
 * Fetch  jira details and create or update jira details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_JIRA_DETAILS});
    axios.get(AUTH_BASE_URL + "jira/" + id, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_JIRA_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: JIRA_OPERATION_REJECTED, payload: error.response})
    })
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_JIRA_DETAILS});
    axios.post(AUTH_BASE_URL + "jira", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_JIRA_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: JIRA_OPERATION_REJECTED, payload: error.response})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_JIRA_DETAILS});
    axios.put(AUTH_BASE_URL + "jira/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_JIRA_DETAILS_FULFILLED, payload: response.data});
    }).catch((error) => {
      dispatch({type: JIRA_OPERATION_REJECTED, payload: error.response})
    })
  }
}
