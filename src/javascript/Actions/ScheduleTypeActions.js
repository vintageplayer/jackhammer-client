/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_ALL_SCHEDULE_TYPES, FETCH_SCHEDULE_TYPES_FULFILLED, SCHEDULE_TYPE_OPERATION_REJECTED} from './ActionTypes'

/**
 * Fetch all schedule types
 */

export function fetchAllScheduleTypes(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_SCHEDULE_TYPES});
    axios.post(AUTH_BASE_URL + "schedule_types/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_SCHEDULE_TYPES_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: SCHEDULE_TYPE_OPERATION_REJECTED, payload: err})
    })
  }
}
