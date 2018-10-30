/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_ALL_NAVIGATION_ACTIONS, FETCH_ALL_NAVIGATION_ACTIONS_FULFILLED, FETCH_ALL_NAVIGATION_ACTIONS_REJECTED,} from './ActionTypes'

/**
 * Fetch all navigation actions
 */
export function fetchAllNavigationActions(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_NAVIGATION_ACTIONS});
    axios.post(AUTH_BASE_URL + "actions/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_NAVIGATION_ACTIONS_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: FETCH_ALL_NAVIGATION_ACTIONS_REJECTED, payload: err})
    })
  }
}
