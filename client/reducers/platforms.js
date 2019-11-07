import {PLATFORM__FETCH, PLATFORM__FETCH_ONE, PLATFORM__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function platforms(state = initialState.platforms, { payload, type }) {
  switch (type) {
    case PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPlatforms: payload.data,
      };
    case PLATFORM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePlatform: payload.data,
      };
      case PLATFORM__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PLATFORM__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case PLATFORM__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
}
