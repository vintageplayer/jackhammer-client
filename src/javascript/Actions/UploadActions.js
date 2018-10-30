import axios from 'axios'
import {axiosInstance} from '../Config/AxiosInstance'
import {AUTH_BASE_URL} from '../Config/Constants'
import localStorage from 'localStorage'
import {
  FETCH_ALL_FINDING_UPLOADS,
  FETCH_ALL_FINDING_UPLOADS_FULFILLED,
  UPLOAD_FILE,
  UPLOAD_FILE_FULFILLED,
  FETCH_UPLOADED_FILE,
  FETCH_UPLOADED_FILE_FULFILLED,
  UPLOAD_OPERATION_REJECTED
} from './ActionTypes'
/**
 * Fetch all uploads
 */
export function fetchAllFindingUploads(payload) {
  return function(dispatch) {
    dispatch({type: FETCH_ALL_FINDING_UPLOADS});
    axios.post(AUTH_BASE_URL + "uploads/list", payload, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((response) => {
      dispatch({type: FETCH_ALL_FINDING_UPLOADS_FULFILLED, payload: response.data,});
    }).catch((err) => {
      dispatch({type: UPLOAD_OPERATION_REJECTED, payload: err,})
    })
  }
}
export function uploadFile(payload) {
  return function(dispatch) {
    dispatch({type: UPLOAD_FILE});
    axios.defaults.withCredentials = true;
    const headers = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token')
      }
    };
    axios
      .post(AUTH_BASE_URL + "uploads", payload, headers)
      .then((response) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: response.data,});
      })
      .catch((err) => {
        dispatch({type: UPLOAD_OPERATION_REJECTED, payload: err,})
      })
  }
}
export function downloadFile(fileId) {
  return function(dispatch) {
    dispatch({type: FETCH_UPLOADED_FILE});
    axios.get(AUTH_BASE_URL + "uploads/" + fileId, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }).then((response) => {
      fileDownload(response.data, "test.png")
      dispatch({type: FETCH_UPLOADED_FILE_FULFILLED, payload: response.data});
    }).catch((err) => {
      dispatch({type: UPLOAD_OPERATION_REJECTED, payload: err,})
    });
  }
}
