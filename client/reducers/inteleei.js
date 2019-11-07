import { INTEL_EEI__FETCH, INTEL_EEI__FETCH_ONE, INTEL_EEI__DELETE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function inteleei(state = initialState.inteleei, { payload, type }) {
  switch (type) {
    case INTEL_EEI__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_EEI__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        eeis: payload.data,
      };
    case INTEL_EEI__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case INTEL_EEI__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneEei: payload.data,
      };
      case INTEL_EEI__DELETE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case INTEL_EEI__DELETE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case INTEL_EEI__DELETE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
}
