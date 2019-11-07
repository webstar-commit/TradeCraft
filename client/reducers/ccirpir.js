import { CCIRPIR__FETCH, CCIRPIR__FETCH_ONE, CCIRPIR__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function ccirpir(state = initialState.ccirpir, { payload, type }) {
  switch (type) {
    case CCIRPIR__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCcirPirs: payload.data,
      };
    case CCIRPIR__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneCcirPir: payload.data,
      };
      case CCIRPIR__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case CCIRPIR__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case CCIRPIR__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
   

    default:
      return state;
  }
}
