import { PAYLOAD__FETCH, PAYLOAD_LIST__FETCH, PAYLOAD_TYPE__FETCH, PAYLOAD__FETCH_ONE, PAYLOAD__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function payloads(state = initialState.payloads, { payload, type }) {
  switch (type) {
    case PAYLOAD__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYLOAD__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPayloads: payload.data,
      };
    case PAYLOAD_LIST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case PAYLOAD_LIST__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        payloadList: payload.data,
      };
    case PAYLOAD_TYPE__FETCH.REQUEST:
      return {
        ...state,
        isTypesFetching: true,
      };
    case PAYLOAD_TYPE__FETCH.SUCCESS:
      return {
        ...state,
        isTypesFetching: false,
        payloadTypes: payload.data,
      };
      case PAYLOAD__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYLOAD__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePayload: payload.data,
      };
      case PAYLOAD__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PAYLOAD__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case PAYLOAD__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
}
