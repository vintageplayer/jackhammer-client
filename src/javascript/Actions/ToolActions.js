/*
 * Actions describe changes of state in your application
 */
// We import constants to name our Actions' type
import axios from 'axios'
import localStorage from 'localStorage'
import {AUTH_BASE_URL} from '../Config/Constants'
import {axiosInstance} from '../Config/AxiosInstance'
import {
  FETCH_ALL_TOOLS,
  FETCH_ALL_TOOLS_FULFILLED,
  CREATE_TOOL,
  CREATE_TOOL_FULFILLED,
  FETCH_TOOL,
  FETCH_TOOL_FULFILLED,
  UPDATE_TOOL,
  UPDATE_TOOL_FULFILLED,
  DELETE_TOOL,
  DELETE_TOOL_FULFILLED,
  TOOL_OPERATION_REJECTED,
} from './ActionTypes'

/**
 * Fetch all tools
 */
export function fetchAllTools(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_TOOLS});
    axios.post(AUTH_BASE_URL + "tools/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_ALL_TOOLS_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: TOOL_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function createTool(payload) {
  return function(dispatch) {
    dispatch({type: CREATE_TOOL});
    axios.post(AUTH_BASE_URL + "tools", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: CREATE_TOOL_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: TOOL_OPERATION_REJECTED, payload: error.response,})
    })
  }
}

export function fetchTool(toolId) {
  return function(dispatch) {
    dispatch({type: FETCH_TOOL});
    axios.get(AUTH_BASE_URL + "tools/" + toolId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: FETCH_TOOL_FULFILLED, payload: response.data,});
    }).catch((error) => {
      dispatch({type: TOOL_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function updateTool(payload) {
  return function(dispatch) {
    dispatch({type: UPDATE_TOOL});
    axios.put(AUTH_BASE_URL + "tools", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: UPDATE_TOOL_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: TOOL_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
export function deleteTool(toolId) {
  return function(dispatch) {
    dispatch({type: DELETE_TOOL});
    axios.delete(AUTH_BASE_URL + "tools/" + toolId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      dispatch({type: DELETE_TOOL_FULFILLED, payload: response.data,})
    }).catch((error) => {
      dispatch({type: TOOL_OPERATION_REJECTED, payload: error.response,})
    })
  }
}
