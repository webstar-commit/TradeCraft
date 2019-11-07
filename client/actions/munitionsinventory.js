import axios from 'axios';
import qs from 'qs';

import { MUNITION_INVENTORY__ADD, MUNITION_INVENTORY__FETCH, MUNITION_INVENTORY__UPDATE, MUNITION_INVENTORY__FETCH_ONE, MUNITION_INVENTORY__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addMunitionInventory(munition) {
  return createAction({
    type: MUNITION_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/MunitionsInventory/PostMunitionsInventory`, JSON.stringify(munition), {headers:requestHeaders}),
  });
}

export function updateMunitionInventory(id, data) {  
  return createAction({
    type: MUNITION_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/MunitionsInventory/PutMunitionsInventory/${id}`, JSON.stringify(data), {headers:requestHeaders}),
  });
}

export function fetchMunitionInventoryById(id) {
  return createAction({
    type: MUNITION_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/MunitionsInventory/GetMunitionsInventory/${id}`, {headers:requestHeaders}),
  });
}

export function fetchMunitionInventory() {
  return createAction({
    type: MUNITION_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/MunitionsInventory/GetMunitionsInventoryData`, {headers:requestHeaders}),
  });
}

export function deleteMunitionInventoryById(id) {
  return createAction({
    type: MUNITION_INVENTORY__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/MunitionsInventory/DeleteMunitionsInventory/${id}`, {headers:requestHeaders}),
  });
}