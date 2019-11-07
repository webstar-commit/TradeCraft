import { COLLECTION_PLAN__FETCH, INTEL_APPROVED_REQUEST__FETCH, INTEL_APPROVED_REQUEST__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(state = initialState.collections, { payload, type }) {
  switch (type) {

    case COLLECTION_PLAN__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case COLLECTION_PLAN__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCollectionsPlan: payload.data,
      };
    case INTEL_APPROVED_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_APPROVED_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allApprovedIntelRequests: payload.data,
      };
      case INTEL_APPROVED_REQUEST__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case INTEL_APPROVED_REQUEST__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case INTEL_APPROVED_REQUEST__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
}
