/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_SEVERITY_LEVELS, FETCH_SEVERITY_LEVELS_FULFILLED, UPDATE_SEVERITY_LEVELS, UPDATE_SEVERITY_LEVELS_FULFILLED, SEVERITY_LEVELS_OPERATION_REJECTED} from './ActionTypes'

/**
 * Fetch  smtp details and create or update smtp details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_SEVERITY_LEVELS});
    axios.post(AUTH_BASE_URL + "severities/list", {}, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_SEVERITY_LEVELS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: SEVERITY_LEVELS_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_SEVERITY_LEVELS});
    axios.put(AUTH_BASE_URL + "severities/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_SEVERITY_LEVELS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: SEVERITY_LEVELS_OPERATION_REJECTED, payload: err,})
    })
  }
}
