import {
  ORGANIC_ORG__FETCH,
  DEPLOYED_ORG__FETCH,
  UNIT__FETCH_ONE,
  UNIT__NEXT_HIGHER,
} from 'dictionary/action';
import initialState from 'store/initialState';

export default function organicorgs(state = initialState.organicorgs, {
  payload,
  type
}) {
  switch (type) {
    case ORGANIC_ORG__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ORGANIC_ORG__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allOrganicOrgs: payload.data,
      };
    case DEPLOYED_ORG__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DEPLOYED_ORG__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allDeployedOrgs: payload.data,
      };
    case UNIT__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UNIT__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneUnit: payload.data,
      };
    case UNIT__NEXT_HIGHER.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UNIT__NEXT_HIGHER.SUCCESS:
      return {
        ...state,
        isFetching: false,
        nextHigherUnit: payload.data,
      };
    default:
      return state;
  }
}
