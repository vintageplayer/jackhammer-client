/*
 * The reducer takes care of state changes in our app through actions
 */
import {
  FETCH_ALL_FINDING_UPLOADS,
  FETCH_ALL_FINDING_UPLOADS_FULFILLED,
  FETCH_UPLOADED_FILE,
  FETCH_UPLOADED_FILE_FULFILLED,
  UPLOAD_FILE,
  UPLOAD_FILE_FULFILLED,
  UPLOAD_OPERATION_REJECTED
} from '../Actions/ActionTypes'
// The initial uploads state
let initialState = {
  fetchedUploads: [],
  user: null,
  uploadResponse: null,
  downloadResponse: null,
  fetching: false,
  fetched: false,
  error: null,
}
// Takes care of changing the uploads state
function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_FINDING_UPLOADS:
      return {
        ...state,
        fetchedUploads: [],
        fetching: true,
        uploadResponse: null,
        error: null,
      }
    case FETCH_ALL_FINDING_UPLOADS_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetchedUploads: action.payload.items,
      }
    case UPLOAD_FILE:
      return {
        ...state,
        fetching: true
      }
    case UPLOAD_FILE_FULFILLED:
      return {
        ...state,
        fetched: true,
        uploadResponse: true,
        user: action.payload
      }
    case FETCH_UPLOADED_FILE:
      return {
        ...state,
        fetching: true
      }
    case FETCH_UPLOADED_FILE_FULFILLED:
      return {
        ...state,
        fetched: true,
        createResponse: action.payload
      }
    case UPLOAD_OPERATION_REJECTED:
      return {
        ...state,
        fetched: false,
        error: action.payload.response.data
      }
    default:
      return state
  }
}
export default reducer
