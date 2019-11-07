import { RANK_LIST__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function ranks(state = initialState.ranks, { payload, type }) {
  switch (type) {
    case RANK_LIST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case RANK_LIST__FETCH.SUCCESS:
      return {
        ...state,
        rankList: payload.data,
        isFetching: false,
      };
    default:
      return state;
  }
}
