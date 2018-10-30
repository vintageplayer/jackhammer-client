/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_HARDCODE_SECRET,
  FETCH_HARDCODE_SECRET_FULFILLED,
  CREATE_HARDCODE_SECRET,
  CREATE_HARDCODE_SECRET_FULFILLED,
  UPDATE_HARDCODE_SECRET,
  UPDATE_HARDCODE_SECRET_FULFILLED,
  HARDCODE_SECRET_OPERATION_REJECTED,
} from './ActionTypes'

/**
 * Fetch  smtp details and create or update smtp details
 */
export function fetch(id) {
  return function(dispatch) {
    dispatch({type: FETCH_HARDCODE_SECRET});
    axios.get(AUTH_BASE_URL + "hardcode_secret/" + id, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_HARDCODE_SECRET_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: HARDCODE_SECRET_OPERATION_REJECTED, payload: err})
    })
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_HARDCODE_SECRET});
    axios.post(AUTH_BASE_URL + "hardcode_secret", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_HARDCODE_SECRET_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: HARDCODE_SECRET_OPERATION_REJECTED, payload: err})
    })
  }
}

export function update(id, payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_HARDCODE_SECRET});
    axios.put(AUTH_BASE_URL + "hardcode_secret/" + id, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_HARDCODE_SECRET_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: HARDCODE_SECRET_OPERATION_REJECTED, payload: err})
    })
  }
}
