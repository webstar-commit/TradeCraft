import axios from 'axios';

import { RANK_LIST__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchRanksByBranch(id) {
  return createAction({
    type: RANK_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Ranks/GetRanksByBranch?branchID=${id}`, {headers:requestHeaders}),
  });
}
