import axios from 'axios';

import { COCOM_LIST__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchCocoms() {
  return createAction({
    type: COCOM_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/COCOM`, {headers:requestHeaders}),
  });
}
