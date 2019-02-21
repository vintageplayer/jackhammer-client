/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_FILTER_RESULTS,
  FETCH_FILTER_RESULTS_FULFILLED,
  FETCH_FILTER_VALUES,
  FETCH_FILTER_VALUES_FULFILLED,
  UPDATE_FILTER_FINDING,
  UPDATE_FILTER_FINDING_FULFILLED,
  FILTER_OPERATION_REJECTED
} from './ActionTypes'
/**
 * Fetch all filters
 */
export function fetchFilterValues(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_FILTER_VALUES});
    axios.post(AUTH_BASE_URL + "filters/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_FILTER_VALUES_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: FILTER_OPERATION_REJECTED, payload: err})
    })
  }
}

export function fetchAllFilterResults(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_FILTER_RESULTS});
    axios.post(AUTH_BASE_URL + "filters/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_FILTER_RESULTS_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: FILTER_OPERATION_REJECTED, payload: err})
    })
  }
}

export function updateFilterFinding(payload, findingId) {
  return function(dispatch) {
    dispatch({type: UPDATE_FILTER_FINDING});
    axios.put(AUTH_BASE_URL + "findings/" + findingId, payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: UPDATE_FILTER_FINDING_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: FILTER_OPERATION_REJECTED, payload: err})
    })
  }
}
