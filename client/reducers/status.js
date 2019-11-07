import { STATUS_PLATFORM__FETCH, STATUS_PAYLOAD__FETCH, STATUS_PERSONNEL__FETCH, STATUS_MUNITION__FETCH, STATUS_PLATFORM__FETCH_ONE, STATUS_PAYLOAD__FETCH_ONE, STATUS_PERSONNEL__FETCH_ONE, STATUS_MUNITION__FETCH_ONE, UNIT_LOGO__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function status(state = initialState.status, { payload, type }) {
  switch (type) {
    case STATUS_PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        platforms: payload.data,
      };
      case STATUS_PLATFORM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PLATFORM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePlatform: payload.data,
      };
    case STATUS_PAYLOAD__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PAYLOAD__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        payloads: payload.data
      };
      case STATUS_PAYLOAD__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PAYLOAD__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePayload: payload.data
      };
      case STATUS_PERSONNEL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PERSONNEL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        personnels: payload.data
      };
    case STATUS_PERSONNEL__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_PERSONNEL__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePersonnel: payload.data
      };
    case STATUS_MUNITION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_MUNITION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        munitions: payload.data,
      };  
    case STATUS_MUNITION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case STATUS_MUNITION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneMunition: payload.data,
      };
    case UNIT_LOGO__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UNIT_LOGO__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        logo: payload.data,
      };
    default:
      return state;
  }
}
