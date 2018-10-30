import axios from 'axios'
import {axiosInstance} from '../Config/AxiosInstance'
import {AUTH_BASE_URL} from '../Config/Constants'
import localStorage from 'localStorage'
import {FETCH_ALL_FINDING_TAGS, FETCH_ALL_FINDING_TAGS_FULFILLED, ADD_TAG, ADD_TAG_FULFILLED, TAG_OPERATION_REJECTED} from './ActionTypes'

/**
 * Fetch all tags
 */
export function fetchAllFindingTags(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_FINDING_TAGS});
    axios.post(AUTH_BASE_URL + "tags/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_FINDING_TAGS_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: TAG_OPERATION_REJECTED, payload: err})
    })
  }
}
export function addTag(payload) {
  return function(dispatch) {
    dispatch({type: ADD_TAG});
    axios.post(AUTH_BASE_URL + "tags", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: ADD_TAG_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: TAG_OPERATION_REJECTED, payload: err})
    })
  }
}
