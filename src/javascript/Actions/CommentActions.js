/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_COMMENTS,
  FETCH_ALL_COMMENTS_FULFILLED,
  CREATE_COMMENT,
  CREATE_COMMENT_FULFILLED,
  COMMENT_OPERATION_REJECTED,
} from './ActionTypes'

/**
 * Fetch all comments
 */
export function fetchAllComments(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_COMMENTS});
    axios.post(AUTH_BASE_URL + "comments/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_COMMENTS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: COMMENT_OPERATION_REJECTED, payload: err,})
    })
  }
}

export function createComment(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_COMMENT});
    axios.post(AUTH_BASE_URL + "comments", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_COMMENT_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: COMMENT_OPERATION_REJECTED, payload: err,})
    })
  }
}
