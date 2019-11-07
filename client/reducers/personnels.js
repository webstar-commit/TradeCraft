import { PERSONNEL__FETCH, PERSONNEL__FETCH_ONE, PERSONNEL__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function personnels(state = initialState.personnels, { payload, type }) {
  switch (type) {
    case PERSONNEL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PERSONNEL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPersonnels: payload.data,
      };
    case PERSONNEL__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case PERSONNEL__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        onePersonnel: payload.data,
      };
      case PERSONNEL__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PERSONNEL__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case PERSONNEL__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
}
