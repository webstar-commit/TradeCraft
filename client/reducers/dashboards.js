import {
  FETCH_DASHBOARD_OPS_PAYLOAD,
  FETCH_DASHBOARD_OPS_PLATFORM,
  FETCH_DASHBOARD_OPS_MISSION,
  FETCH_A_ISR_OPERATION_MISSION,
  FETCH_LATEST_INTELLIGENCE,
  FETCH_UPCOMING_MISSION,
  FETCH_LIVE_OPERATION,
} from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(
  state = initialState.dashboards, { payload, type }) {
  switch (type) {
    case FETCH_DASHBOARD_OPS_PAYLOAD.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DASHBOARD_OPS_PAYLOAD.SUCCESS:
      return {
        ...state,
        isFetching: false,
        opsPayload: payload.data,
      };

    case FETCH_DASHBOARD_OPS_PLATFORM.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DASHBOARD_OPS_PLATFORM.SUCCESS:
      return {
        ...state,
        isFetching: false,
        opsPlatform: payload.data,
      };
    case FETCH_DASHBOARD_OPS_MISSION.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DASHBOARD_OPS_MISSION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        opsMission: payload.data,
      };
    case FETCH_A_ISR_OPERATION_MISSION.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_A_ISR_OPERATION_MISSION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        aisrOperation: payload.data,
      };
    case FETCH_LATEST_INTELLIGENCE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LATEST_INTELLIGENCE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        latestIntelligence: payload.data,
      };
    case FETCH_UPCOMING_MISSION.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_UPCOMING_MISSION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        upcomingMissions: payload.data,
      }; 
    case FETCH_LIVE_OPERATION.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIVE_OPERATION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        liveOperations: payload.data,
      };     
    default:
      return state;
  }
}