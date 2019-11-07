import axios from 'axios';
import qs from 'qs';

import { INTEL_LIBRARY_REQUEST__FETCH_ONE, INTEL_LIBRARY_REQUEST__FETCH, INTEL_LIBRARY_SEND__EMAIL } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchIntelLibraryRequestById(id) {
  return createAction({
    type: INTEL_LIBRARY_REQUEST__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequest/${id}`, { headers: requestHeaders }),
  });
}

export function fetchIntelLibraryRequests(unitId) {
  return createAction({
    type: INTEL_LIBRARY_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/Mission/GetIntelLibraryMissions?unitId=${unitId}`, { headers: requestHeaders }),
  });
}

export function sendEmails(data, id) {
  return createAction({
    type: INTEL_LIBRARY_SEND__EMAIL,
    action: () => axios.post(`${baseUrl}/Email/SendEmailForMission/${id}`, data, { headers: requestHeaders }),
  });
}
