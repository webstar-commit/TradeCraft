import axios from 'axios';
import qs from 'qs';

import { PAYLOAD__ADD, PAYLOAD__FETCH, PAYLOAD__UPDATE, PAYLOAD_LIST__FETCH, PAYLOAD_TYPE__FETCH, PAYLOAD__FETCH_ONE, PAYLOAD__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayload(payload) {
  return createAction({
    type: PAYLOAD__ADD,
    action: () => axios.post(`${baseUrl}/Payload/PostPayload`, payload, {headers: formDataRequestHeader }),
  });
}

export function updatePayload(id, payload) {
  return createAction({
    type: PAYLOAD__UPDATE,
    action: () => axios.put(`${baseUrl}/Payload/PutPayload/${id}`, payload, {headers: formDataRequestHeader }),
  });
}

export function fetchPayloadList() {
  return createAction({
    type: PAYLOAD_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloads`, {headers: requestHeaders}),
  });
}

export function fetchPayloads() {
  return createAction({
    type: PAYLOAD__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloadsData`, {headers: requestHeaders }),
  });
}

export function fetchPayloadTypes() {
  return createAction({
    type: PAYLOAD_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadType`, {headers: requestHeaders }),
  })
}

export function fetchPayloadsById(id) {
  return createAction({
    type: PAYLOAD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Payload/GetPayload/${id}`, {headers:requestHeaders}),
  });
}

export function deletePayloadsById(id) {
  return createAction({
    type: PAYLOAD__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Payload/DeletePayload/${id}`, {headers:requestHeaders}),
  });
}
