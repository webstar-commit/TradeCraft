import {
  INTEL_EEI__FETCH,
  INTEL_REQUEST__FETCH,
  INTEL_REQUEST__FETCH_ONE,
  INTEL_REQUEST__ADD,
  INTEL_REQUEST__UPDATE,
  INTEL_REQUEST__DELETE,
  INTEL_APPROVED_VALIDATED__STATUS_UPDATE,
} from 'dictionary/action';
import initialState from 'store/initialState';

export default function intel(state = initialState.intelrequest, {
  payload,
  type,
}) {
  switch (type) {
    case INTEL_EEI__FETCH.REQUEST:
      return {
        ...state,
        isFetchingEEI: true,
      };
    case INTEL_EEI__FETCH.SUCCESS:
      return {
        ...state,
        isFetchingEEI: false,
        eeis: payload.data,
      };
    case INTEL_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allRequests: payload.data,
      };
    case INTEL_REQUEST__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case INTEL_REQUEST__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneIntelRequest: payload.data,
      };
    case INTEL_REQUEST__ADD.REQUEST || INTEL_REQUEST__UPDATE:
      return {
        ...state,
        isFetchingOne: true,
      };
    case INTEL_REQUEST__ADD.SUCCESS || INTEL_REQUEST__UPDATE:
      return {
        ...state,
        isFetchingOne: false,
        oneIntelRequest: payload.data,
      };
    case INTEL_REQUEST__DELETE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case INTEL_REQUEST__DELETE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case INTEL_REQUEST__DELETE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    case INTEL_APPROVED_VALIDATED__STATUS_UPDATE.REQUEST:
      return {
        ...state,
        isStatusUpdated: false,
      };
    case INTEL_APPROVED_VALIDATED__STATUS_UPDATE.SUCCESS:
      return {
        ...state,
        isStatusUpdated: true,
      };
    case INTEL_APPROVED_VALIDATED__STATUS_UPDATE.FAILURE:
      return {
        ...state,
        isStatusUpdated: false,
      };



    default:
      return state;
  }
}
