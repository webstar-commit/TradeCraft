import { COCOM_LIST__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function cocoms(state = initialState.cocoms, { payload, type }) {
  switch (type) {
    case COCOM_LIST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case COCOM_LIST__FETCH.SUCCESS:
      return {
        ...state,
        cocomList: payload.data,
        isListFetching: false,
      };
    default:
      return state;
  }
}
