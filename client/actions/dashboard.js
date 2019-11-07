import axios from 'axios';

import {
  FETCH_DASHBOARD_OPS_PAYLOAD,
  FETCH_DASHBOARD_OPS_PLATFORM,
  FETCH_DASHBOARD_OPS_MISSION,
  FETCH_A_ISR_OPERATION_MISSION,
  FETCH_LATEST_INTELLIGENCE,
  FETCH_UPCOMING_MISSION,
  FETCH_LIVE_OPERATION,
} from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


// API is uses to fetch OPS UTILIZATION PAYLOAD
export function fetchOPSUtilizationPayload() {
  return createAction({
    type: FETCH_DASHBOARD_OPS_PAYLOAD,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloadsAssignedToPlatform`, { headers: requestHeaders }),
  });
}

// API is uses to fetch OPS UTILIZATION Platform
export function fetchOPSUtilizationPlatform() {
  return createAction({
    type: FETCH_DASHBOARD_OPS_PLATFORM,
    action: () => axios.get(`${baseUrl}/Mission/GetAssignedPlatformstoMission`, { headers: requestHeaders }),
  });
}

// API is uses to fetch OPS UTILIZATION Mission (Flight, Line, PED)
export function fetchOPSUtilizationMission() {
  return createAction({
    type: FETCH_DASHBOARD_OPS_MISSION,
    action: () => axios.get(`${baseUrl}/Mission/GetAssignedUnitstoMission`, { headers: requestHeaders }),
  });
}

// A-ISR OPERATION STATUS
export function fetchAISROpreationStatus() {
  return createAction({
    type: FETCH_A_ISR_OPERATION_MISSION,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestCountBySatatusId`, { headers: requestHeaders }),
  });
}
//Latest Intelligence:- List of Missions with status Mission Pending.
export function fetchLatestIntelligence(statusId, unitId) {
  return createAction({
    type: FETCH_LATEST_INTELLIGENCE,
    action: () => axios.get(`${baseUrl}/Mission/GetMissionByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, { headers: requestHeaders }),
  });
}

//Upcoming Mission:- List of Missions with status Intel Posted. 
export function fetchUpcomingMission(statusId, unitId) {
  return createAction({
    type: FETCH_UPCOMING_MISSION,
    action: () => axios.get(`${baseUrl}/Mission/GetMissionByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, { headers: requestHeaders }),
  });
}
//LIVE OPERATION
export function fetchLiveOperation(statusId, unitId) {
  return createAction({
    type: FETCH_LIVE_OPERATION,
    action: () => axios.get(`${baseUrl}/Mission/GetMissionByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, { headers: requestHeaders }),
  });
}
