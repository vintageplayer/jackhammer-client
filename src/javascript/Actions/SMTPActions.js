/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_SMTP_DETAILS,
  FETCH_SMTP_DETAILS_FULFILLED,
  CREATE_SMTP_DETAILS,
  CREATE_SMTP_DETAILS_FULFILLED,
  UPDATE_SMTP_DETAILS,
  UPDATE_SMTP_DETAILS_FULFILLED,
  SMTP_OPERATION_REJECTED
} from './ActionTypes'

/**
 * Fetch  smtp details and create or update smtp details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_SMTP_DETAILS});
    axios.get(AUTH_BASE_URL + "smtp/" + id, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_SMTP_DETAILS_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: SMTP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_SMTP_DETAILS});
    axios.post(AUTH_BASE_URL + "smtp", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_SMTP_DETAILS_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: SMTP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_SMTP_DETAILS});
    axios.put(AUTH_BASE_URL + "smtp/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_SMTP_DETAILS_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: SMTP_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
