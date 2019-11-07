import axios from 'axios';

import { ATO_COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, PED_TASKS__FETCH, ROUTE_ATO_GENERATION, COLLECTION_PLAN_TO_ATO_GENERATION,
  FOP_ATO_PLATFORM__FETCH, FOP_PLATFORM__FETCH, FOP_ATO_CREW__FETCH, FOP_CREW__FETCH, 
  PED_TASKS_ATO_GENERATION__FETCH, SEARCH_MISSION_FILTER, ATO_GEN_TO_FLIGHT_OPS__MOVE, FLIGHT_OPS_TO_ATO_GEN__MOVE,
   ATO_GEN_TO_PED_TASK__MOVE, MISSION_REPORT_UPLOAD, PED_TASK_TO_ATO_GEN__MOVE, ATO_GEN_TO_COLLECTION_PLAN__MOVE, MISSION_SUMMARY__FETCH, MISSION_DETAIL__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';


// ATO Tab APIs
export function fetchATOCollectionPlans(statusId, unitId) {
  return createAction({
    type: ATO_COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionCollectionPlanIntelRequest?statusId=${statusId}&unitId=${unitId}`, {headers:requestHeaders}),
  });
}

export function fetchATOGenerations(unitId) {
  return createAction({
    type: ATO_GENERATION__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionATOIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}

export function routeATOGeneration(unitId, statusId) {
  return createAction({
    type: ROUTE_ATO_GENERATION,
    action: () => axios.put(`${baseUrl}/IntelRequest/RouteToMissionATOIntelRequest?unitId=${unitId}&statusId=${statusId}`, { }, {headers:requestHeaders}),
  });
}

export function moveToATOGenerationFromCollectionPlan(data) {
  return createAction({
    type: COLLECTION_PLAN_TO_ATO_GENERATION,
    action: () => axios.post(`${baseUrl}/Mission/PostMission`, data, {headers:requestHeaders}),
  });
}

export function moveToCollectionPlanFromATOGeneration(missionId) {
  return createAction({
    type: ATO_GEN_TO_COLLECTION_PLAN__MOVE,
    action: () => axios.delete(`${baseUrl}/Mission/DeleteMission/${missionId}`, {headers:requestHeaders}),
  });
}

// Flight Ops Platform
export function flightOpsAtoPlatform(unitId) {
  return createAction({
    type: FOP_ATO_PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPlatformATOIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}
export function flightOpsPlatforms(unitId) {
  return createAction({
    type: FOP_PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPlatformFlightOPSIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}

// Flight Ops Crew
export function flightOpsAtoCrew(unitId) {
  return createAction({
    type: FOP_ATO_CREW__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionCrewTeamATOIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}
export function flightOpsCrew(unitId) {
  return createAction({
    type: FOP_CREW__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionCrewTeamFlightOPSIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}

/* 
// Flight Ops Common.  Left => Right Move
export function moveToFlightOPSFromATO(missionId, data) {
  return createAction({
    type: ATO_GEN_TO_FLIGHT_OPS__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/${missionId}`, data, {headers:requestHeaders}),
  });
} */

// Flight Ops Common.  Left => Right Move
export function moveToFlightOPSFromATO(missionId, data) {
  const formData = new FormData();
  formData.append('missionFormData', JSON.stringify(data));
  return createAction({
    type: ATO_GEN_TO_FLIGHT_OPS__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/${missionId}`, formData, { headers: formDataRequestHeader }),
  });
}

// Upload Mission Report
export function uploadMissionReport(missionId, data) {
  return createAction({
    type: MISSION_REPORT_UPLOAD,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/${missionId}`, data, { headers: formDataRequestHeader }),
  });
}

// Flight Ops Common. Right => Left Move
export function moveToATOFromFlightOPS(data) {
  return createAction({
    type: FLIGHT_OPS_TO_ATO_GEN__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/MoveToMissionATO`, data, { headers: requestHeaders }),
  });
}

// PED Task APIs
export function fetchPedTasksATO(unitId) {
  return createAction({
    type: PED_TASKS_ATO_GENERATION__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPEDTeamATOIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}

export function fetchPedTasks(unitId) {
  return createAction({
    type: PED_TASKS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPEDTaskingIntelRequest?unitId=${unitId}`, {headers:requestHeaders}),
  });
}

export function moveToPedTaskFromATOGeneration(missionId, data) {
  return createAction({
    type: ATO_GEN_TO_PED_TASK__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/missionId=${missionId}`, data, {headers:requestHeaders}),
  });
}

export function moveToATOGenerationFromPedTask(missionId) {
  return createAction({
    type: PED_TASK_TO_ATO_GEN__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/MoveOutFromFlightOPS?missionId=${missionId}`, { } ,{headers:requestHeaders}),
  });
}

// SEARCH and FILTER APIS
export function platformFilter(data) {
  return createAction({
    type: SEARCH_MISSION_FILTER,
    action: () => axios.put(`${baseUrl}/Search/SearchMissionPlatformInventory`, data, {headers:requestHeaders}),
  });
}

export function teamFilter(data) {
  return createAction({
    type: SEARCH_MISSION_FILTER,
    action: () => axios.put(`${baseUrl}/Search/SearchMissionTeams`, data, {headers:requestHeaders}),
  });
}

export function fetchMissionSummary() {

  return createAction({
    type: MISSION_SUMMARY__FETCH,
    action: () => axios.get(`${baseUrl}/Mission/GetSummaryMission`,  {headers:requestHeaders}),
  });
}

export function fetchMissionDetailById(unitId) {
  return createAction({
    type: MISSION_DETAIL__FETCH,
    action: () => axios.get(`${baseUrl}/Mission/GetSummaryMissionById/${unitId}`, {headers:requestHeaders}),
  });
}
