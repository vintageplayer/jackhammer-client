/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {FETCH_GROUP_REPOS, FETCH_GROUP_REPOS_FULFILLED, REPO_OPERATION_REJECTED} from './ActionTypes'

/**
 * Fetch all repos
 */
export function fetchGroupRepos(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_GROUP_REPOS});
    axios.post(AUTH_BASE_URL + "repos/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    },).then((response) => {
      dispatch({type: FETCH_GROUP_REPOS_FULFILLED, payload: response.data,})
    }).catch((err) => {
      dispatch({type: REPO_OPERATION_REJECTED, payload: err})
    })
  }
}
