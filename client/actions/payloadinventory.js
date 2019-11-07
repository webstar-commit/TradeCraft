import axios from 'axios';


import { PAYLOAD_INVENTORY__ADD, PAYLOAD_INVENTORY__FETCH, PAYLOAD_INVENTORY__FETCH_ONE, PAYLOAD_INVENTORY__UPDATE, PAYLOAD_LIST__FETCH, PAYLOAD_INVENTORY__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayloadInventory(payload) {
  return createAction({
    type: PAYLOAD_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PayloadInventory/PostPayloadInventory`, JSON.stringify(payload), {headers:requestHeaders}),
  });
}

export function updatePayloadInventory(id, data) {
  console.log('updating'+JSON.stringify(data));
  
  return createAction({
    type: PAYLOAD_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/PayloadInventory/PutPayloadInventory/${id}`, JSON.stringify(data), {headers:requestHeaders}),
  });
}

export function fetchPayloadInventory() {
  return createAction({
    type: PAYLOAD_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventoryData`, {headers:requestHeaders}),
  });
}

export function fetchPayloadInventoryById(id) {
  return createAction({
    type: PAYLOAD_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventory/${id}`, {headers:requestHeaders}),
  });
}

export function deletePayloadInventoryById(id) {
  return createAction({
    type: PAYLOAD_INVENTORY__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/PayloadInventory/DeletePayloadInventory/${id}`, {headers:requestHeaders}),
  });
}


export function fetchPayloadList() {
  return createAction({
    type: PAYLOAD_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloads`, {headers:requestHeaders}),
  });
}

// export function fetchPayloadTypes() {
//   return createAction({
//     type: PAYLOAD_TYPE__FETCH,
//     action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders),
//   });
// }