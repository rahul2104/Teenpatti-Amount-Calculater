import getConfig from 'next/config'

import Api from "../api";

const {publicRuntimeConfig} = getConfig()
const {BASE_PATH,AUTHORISATION} = publicRuntimeConfig

const headers= {
  'Content-Type': 'application/json',
  'Authorization': AUTHORISATION
}

async function login(params) {
  let response = await axios({
    method: "post",
    url:  Api.LOGIN,
    data: params,
    headers:headers,
  })
  console.log("response",response);
  return response.data;
}

async function forgot(params) {
  let response = await axios({
    method: "post",
    url:  Api.FORGOT,
    data: params,
    headers:headers,
  })
  return response.data;
}

async function reset(params) {
  headers.accessToken=params.token
  let response = await axios({
    method: "post",
    url:  Api.RESET,
    data: {password:params.password},
    headers:headers,
  })
  return response.data;
}

async function changePassword(params) {
  let accessToken = sessionStorage.getItem('accessToken')
  headers.accessToken=accessToken;
  let response = await axios({
    method: "post",
    url:  Api.CHANGE_PASSWORD,
    data: params,
    headers:headers,
  })
  return response.data;
}

export const authService = {
  login,
  forgot,
  reset,
  changePassword
};