import { LOCALIZATION__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function localization(state = initialState.localization, { payload, type }) {
  switch (type) {
    case LOCALIZATION__UPDATE.SUCCESS:
      return payload;
    default:
      return state;
  }
}
