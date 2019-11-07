import axios from 'axios';
import qs from 'qs';

import { ORGANIC_PERSONNEL__FETCH, ORGANIC_PERSONNEL__ADD, DEPLOYED_PERSONNEL__FETCH, ORGANIC_PERSONNEL__FETCH_LIST } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicPersonnel() {
  return createAction({
    type: ORGANIC_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=1&returnData=PERSONNEL`, {headers:requestHeaders}),
  });
}

export function addOraganicPersonnel(personnel) {
  return createAction({
    type: ORGANIC_PERSONNEL__ADD,
    action: () => axios.put(`${baseUrl}/Personnel/SetPersonnelUnits`, personnel, {headers:requestHeaders}),
  });
}

export function fetchDeployedPersonnel(id) {
  return createAction({
    type: DEPLOYED_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=${id}&CommandRelationship=4&returnData=PERSONNEL`, {headers:requestHeaders}),
  });
}

export function fetchPersonnelsByFilter(id) {
    return createAction({
      type: ORGANIC_PERSONNEL__FETCH_LIST,
      action: () => axios.put(`${baseUrl}/Search/SearchPersonnel/`, id, {headers:requestHeaders}),
    });
  }
