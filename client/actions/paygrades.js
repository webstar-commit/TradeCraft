import axios from 'axios';

import { PAYGRADE_LIST__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchPaygrades() {
  return createAction({
    type: PAYGRADE_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/PayGrades/GetPayGrades`, {headers:requestHeaders}),
  });
}
