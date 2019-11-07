import axios from 'axios';
import qs from 'qs';

import { CCIRPIR__ADD, CCIRPIR__FETCH, CCIRPIR__FETCH_ONE, CCIRPIR__UPDATE, CCIRPIR__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders , formDataRequestHeader} from 'dictionary/network';
import { createAction } from 'util/action';

// function to add New CCIRPIR Record
export function addCcirPir(ccirpir) {
  return createAction({
    type: CCIRPIR__ADD,
    action: () => axios.post(`${baseUrl}/CCIRPIR`, ccirpir, { headers:formDataRequestHeader }),
  });
}

// function to update  CCIRPIR Record by Id
export function updateCcirPir(id, ccirpir) {
  return createAction({
    type: CCIRPIR__UPDATE,
    action: () => axios.put(`${baseUrl}/CCIRPIR/PutCCIRPIR?id=${id}`, ccirpir, { headers:formDataRequestHeader }),
  });
}

// function to Fetch All List of CCIRPIR Records
export function fetchCcirPirs() {
  return createAction({
    type: CCIRPIR__FETCH,
    action: () => axios.get(`${baseUrl}/CCIRPIR/GetCCIRPIRData`, {headers:requestHeaders}),
  });
}

// function to fecth one CCIRPIR Record detail by ID
export function fetchCcirPirById(id) {
  return createAction({
    type: CCIRPIR__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/CCIRPIR/GetCCIRPIRData/${id}`, {headers:requestHeaders}),
  });
}

// function to Delete  CCIRPIR Record by Id
export function deleteCcirPirById(id) {
    return createAction({
      type: CCIRPIR__DELETE_ONE,
      action: () => axios.delete(`${baseUrl}/CCIRPIR/DeleteCCIRPIR/${id}`, {headers:requestHeaders}),
    });
  }
/* 
export function fetchCcirPirList() {
  return createAction({
    type: CCIRPIR_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloads`, requestHeaders),
  });
}
 */
// export function fetchPayloadTypes() {
//   return createAction({
//     type: PAYLOAD_TYPE__FETCH,
//     action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders),
//   });
// }