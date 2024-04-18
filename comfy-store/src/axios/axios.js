import axios from 'axios'
const BASE_URL = 'http://localhost:4002/store'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
  //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  //   'Access-Control-Allow-Credentials': 'true',
  // },
  withCredentials: true,
})
