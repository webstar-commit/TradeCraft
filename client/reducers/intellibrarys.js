import { INTEL_LIBRARY_REQUEST__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function intellibraries(state = initialState.intellibraries, { payload, type }) {
  switch (type) {

    case INTEL_LIBRARY_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_LIBRARY_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allIntelLibraries: payload.data,
      };
    default:
      return state;
  }
}
