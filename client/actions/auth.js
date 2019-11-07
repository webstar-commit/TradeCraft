import axios from 'axios';
import qs from 'qs';

import { ACCOUNT__REGISTER, ACCOUNT__LOGIN, ACCOUNT__CHANGE_PASSWORD, ACCOUNT__LOGOUT, REFRESH__TOKEN } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function addRegister(register) {
  return createAction({
    type: ACCOUNT__REGISTER,
    action: () => axios.post(`${baseUrl}/Account/Register`, qs.stringify(register), requestHeaders),
  });
}

export function changePassword(register) {
  return createAction({
    type: ACCOUNT__CHANGE_PASSWORD,
    action: () => axios.post(`${baseUrl}/Account/ChangePassword`, qs.stringify(register), { headers: requestHeaders }),
  });
}

export function login(data) {
  return createAction({
    type: ACCOUNT__LOGIN,
    action: () => axios.post(`${baseUrl}/Token`, qs.stringify(data), requestHeaders),
  });
}

export function refresh(data) {
  return createAction({
    type: REFRESH__TOKEN,
    action: () => axios.post(`${baseUrl}/Token`, qs.stringify(data), requestHeaders),
  });
}

export function logout() {
  return createAction({
    type: ACCOUNT__LOGOUT,
    action: () => callLogout(),
  });
}

function callLogout () {
  console.log('Logged Out');
}

