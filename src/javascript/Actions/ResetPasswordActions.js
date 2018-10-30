import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL, UNAUTH_BASE_URL, DEFAULT_HEADERS} from '../Config/Constants'
import {
  RESET_PASSWORD_INSTRUCTIONS,
  RESET_PASSWORD_INSTRUCTIONS_FULFILLED,
  VERIFY_RESET_PASSWORD_TOKEN,
  VERIFY_RESET_PASSWORD_TOKEN_FULFILLED,
  RESET_PASSWORD,
  RESET_PASSWORD_FULFILLED,
  VERIFY_PASSWORD_TOEKN_ERROR,
  RESET_PASSWORD_ERROR,
  AUTH_USER
} from './ActionTypes'

export function sendResetPasswordInstructions(payload) {
  return function(dispatch) {
    dispatch({type: RESET_PASSWORD_INSTRUCTIONS});
    axios
      .post(UNAUTH_BASE_URL + 'send_reset_password_instructions', payload, DEFAULT_HEADERS)
      .then(function(response) {
        dispatch({type: RESET_PASSWORD_INSTRUCTIONS_FULFILLED, payload: response.data,});
      })
      .catch(function(error) {
        dispatch({type: RESET_PASSWORD_ERROR, payload: error.response,})
      })
  }
}

export function verifyResetPasswordToken(resetPasswordToken) {
  return function(dispatch) {
    dispatch({type: VERIFY_RESET_PASSWORD_TOKEN});
    axios.get(AUTH_BASE_URL + 'verify_reset_password_token', {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': resetPasswordToken
      },
      })
      .then(function(response) {
        dispatch({type: VERIFY_RESET_PASSWORD_TOKEN_FULFILLED, payload: response.data,});
      })
      .catch(function(error) {
        dispatch({type: VERIFY_PASSWORD_TOEKN_ERROR, payload: {}})
      })
  }
}

export function resetPassword(password, resetPasswordToken) {
  return function(dispatch) {
    dispatch({type: RESET_PASSWORD});
    axios.post(AUTH_BASE_URL + 'reset_password', {
      password: password
    }, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': resetPasswordToken
      },
      })
      .then(function(response) {
        localStorage.setItem("token", response.headers.accesstoken);
        dispatch({type: AUTH_USER, payload: response.data, userToken: response.headers.accesstoken});
      })
      .catch(function(error) {
        dispatch({type: RESET_PASSWORD_ERROR, payload: error.response,})
      })
  }
}
