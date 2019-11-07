import { LOCATION__FETCH, LOCATION__FETCH_ONE, LOCATION_LIST__FETCH, LOCATION_TYPE__FETCH, LOCATION__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function locations(state = initialState.locations, { payload, type }) {
  switch (type) {
    case LOCATION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOCATION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allLocations: payload.data,
      };
      case LOCATION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOCATION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneLocation: payload.data,
      };
    case LOCATION_LIST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case LOCATION_LIST__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        locationList: payload.data,
      };
    case LOCATION_TYPE__FETCH.REQUEST:
      return {
        ...state,
        isTypesFetching: true,
      };
    case LOCATION_TYPE__FETCH.SUCCESS:
      return {
        ...state,
        isTypesFetching: false,
        locationTypes: payload.data,
      };
      case LOCATION__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case LOCATION__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case LOCATION__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
}
