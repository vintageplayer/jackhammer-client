import axios from 'axios'
import localStorage from 'localStorage'
import configureStore from '../Store'
import {AUTH_BASE_URL} from './Constants'
const {store} = configureStore();
export const axiosInstance = axios.create({
  baseURL: AUTH_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  },
});
