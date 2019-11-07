import { PAYGRADE_LIST__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function paygrades(state = initialState.paygrades, { payload, type }) {
  switch (type) {
    case PAYGRADE_LIST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYGRADE_LIST__FETCH.SUCCESS:
      return {
        ...state,
        paygradeList: payload.data,
        isFetching: false,
      };
    default:
      return state;
  }
}
