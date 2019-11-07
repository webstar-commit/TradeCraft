import axios from 'axios';
import qs from 'qs';

import { ORGANIC_ORG__FETCH, ORGANIC_ORG__ADD, DEPLOYED_ORG__FETCH, UNIT__FETCH_ONE, UNIT__UPDATE, UNIT__NEXT_HIGHER } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicOrg(id) {
  return createAction({
    type: ORGANIC_ORG__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=${id}`, {headers:requestHeaders}),
  });
}

export function fetchDeployedOrg(id) {
  return createAction({
    type: DEPLOYED_ORG__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=${id}&CommandRelationship=4`, {headers:requestHeaders}),
  });
}

export function addOraganicOrg(org) {
  return createAction({
    type: ORGANIC_ORG__ADD,
    action: () => axios.post(`${baseUrl}/Units/PostUnits`, JSON.stringify(org), {headers:requestHeaders}),
  });
}

export function fetchUnitById(id) {
  return createAction({
    type: UNIT__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Units/GetUnits/${id}`, {headers:requestHeaders}),
  });
}

export function updateUnit(id, unit) {
  return createAction({
    type: UNIT__UPDATE,
    action: () => axios.put(`${baseUrl}/Units/PutUnitUpdate/${id}`, unit, {headers:requestHeaders}),
  });
}

export function fetchNextHigherUnit(unitid, CommandRelationship = 1) {
  return createAction({
    type: UNIT__NEXT_HIGHER,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetSuperiorUnit?unitID=${unitid}&CommandRelationship=${CommandRelationship}`, { headers: requestHeaders }),
  });
}
