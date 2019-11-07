import axios from 'axios';
import qs from 'qs';

import { MUNITION__ADD, MUNITION__UPDATE, MUNITION__FETCH, MUNITION__FETCH_ONE, MUNITION__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addMunition(munition) {
  return createAction({
    type: MUNITION__ADD,
    action: () => axios.post(`${baseUrl}/Munition/PostMunition`, munition, {headers: formDataRequestHeader}),
  });
}

export function updateMunition(id, munition) {
  return createAction({
    type: MUNITION__UPDATE,
    action: () => axios.put(`${baseUrl}/Munition/PutMunition/${id}`, munition, {headers: formDataRequestHeader}),
  });
}

export function fetchMunitions() {
  return createAction({
    type: MUNITION__FETCH,
    action: () => axios.get(`${baseUrl}/Munition/GetMunitionsData`, {headers: requestHeaders}),
  });
}


export function fetchMunitionsById(id) {
  return createAction({
    type: MUNITION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Munition/GetMunition/${id}`, {headers: requestHeaders}),
  });
}

export function deleteMunitionsById(id) {
  return createAction({
    type: MUNITION__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Munition/DeleteMunition/${id}`, {headers: requestHeaders}),
  });
}