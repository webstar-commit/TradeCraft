import axios from 'axios';
import qs from 'qs';

import { INTEL_EEI__ADD, INTEL_EEI__FETCH, INTEL_EEI__FETCH_ONE, INTEL_EEI__UPDATE, INTEL_EEI__DELETE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addIntelEei(intelEei) {
  return createAction({
    type: INTEL_EEI__ADD,
    action: () => axios.post(`${baseUrl}/IntelReqEEI/PostIntelReqEEI`, JSON.stringify(intelEei), {headers:requestHeaders}),
  });
}

export function updateIntelEei(id, data) {
  return createAction({
    type: INTEL_EEI__UPDATE,
    action: () => axios.put(`${baseUrl}/IntelReqEEI/PutIntelReqEEI/${id}`, JSON.stringify(data), {headers:requestHeaders}),
  });
}


export function fetchIntelEeiById(id) {
  return createAction({
    type: INTEL_EEI__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetIntelReqEEI/${id}`, {headers:requestHeaders}),
  });
}

export function fetchIntelEeisByIntelId(intelReqId) {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetAllIntelReqEEIByIntelReqId/${intelReqId}`, {headers:requestHeaders}),
  });
}

export function fetchIntelEEI() {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetIntelReqEEIs`, {headers:requestHeaders}),
  });
}

export function deleteIntelEEIById(id) {
  return createAction({
    type: INTEL_EEI__DELETE,
    action: () => axios.delete(`${baseUrl}/IntelReqEEI/DeleteIntelReqEEI/${id}`, {headers:requestHeaders}),
  });
}



