/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_ANALYTICS_DATA, FETCH_ANALYTICS_DATA_FULFILLED, ANALYTICS_DATA_OPERATION_REJECTED,} from './ActionTypes'

/**
 * Fetch  jira details and create or update jira details
 */
export function fetch(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ANALYTICS_DATA});
    axios.post(AUTH_BASE_URL + "analytics/view", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ANALYTICS_DATA_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: ANALYTICS_DATA_OPERATION_REJECTED, payload: err})
    })
  }
}
