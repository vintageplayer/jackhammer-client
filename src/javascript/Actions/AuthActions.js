/**
 * Logging
 */

import {UNAUTH_BASE_URL, AUTH_BASE_URL, DEFAULT_HEADERS,} from '../Config/Constants'
import {
  SIGNUP,
  LOGIN,
  AUTH_USER,
  LOGOUT,
  UNAUTH_USER,
  AUTH_ERROR,
} from './ActionTypes'
import axios from 'axios'
import {axiosInstance} from '../Config/AxiosInstance'
import localStorage from 'localStorage'

export function login(payload) {
  return function(dispatch) {
    dispatch({type: LOGIN});
    localStorage.removeItem("token");
    axios
      .post(UNAUTH_BASE_URL + 'login', payload, DEFAULT_HEADERS)
      .then((response) => {
        localStorage.setItem("token", response.headers.accesstoken);
        dispatch({type: AUTH_USER, payload: response.data, userToken: response.headers.accesstoken,});
      })
      .catch((error) => {
        dispatch({type: AUTH_ERROR, payload: error.response,})
      })
  }
}

export function signup(payload) {
  return function(dispatch) {
    dispatch({type: SIGNUP});
    localStorage.removeItem("token");
    axios
      .post(UNAUTH_BASE_URL + 'signup', payload, DEFAULT_HEADERS)
      .then(function(response) {
        localStorage.setItem('token', response.headers.accesstoken);
        dispatch({type: AUTH_USER, payload: response.data, userToken: response.headers.accesstoken,});
      })
      .catch(function(error) {
        dispatch({type: AUTH_ERROR, payload: error.response,})
      })
  }
}

export function userSignout() {
  return function(dispatch) {
    axios.delete(AUTH_BASE_URL + 'logout', {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
        }
      })
      .then(function(response) {
        localStorage.removeItem("token");
        dispatch({type: LOGOUT});
      })
      .catch(function(error) {
        dispatch({type: LOGOUT});
        dispatch({type: AUTH_ERROR, payload: error.response,})
      });
  }
}
