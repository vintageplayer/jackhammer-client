/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_ALL_TASKS, FETCH_ALL_TASKS_FULFILLED, FETCH_ALL_TASKS_REJECTED} from './ActionTypes'

/**
 * Fetch all navigation actions
 */
export function fetchAllTasks(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_TASKS});
    axios.post(AUTH_BASE_URL + "tasks/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_TASKS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: FETCH_ALL_TASKS_REJECTED, payload: err,})
    })
  }
}
