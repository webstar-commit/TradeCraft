import { MUNITION__FETCH, MUNITION__FETCH_ONE, MUNITION__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function munitions(state = initialState.munitions, { payload, type }) {
  switch (type) {
    case MUNITION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MUNITION__FETCH.SUCCESS:
      return {
        ...state,
        allMunitions: payload.data,
        isFetching: false,
      };
      case MUNITION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MUNITION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneMunition: payload.data,
      };
      case MUNITION__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case MUNITION__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case MUNITION__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      }; 
    default:
      return state;
  }
}
