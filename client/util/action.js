/**
 * Creates the function to dispatch all action type derivatives for the given action.
 * @param   {Object}    config          The configuration object.
 * @param   {Function}  config.action   The action function.
 * @param   {Object}    [config.header] The action header.
 * @param   {Object}    config.type     The action type.
 * @returns {Function}
 */

import { refreshToken } from './auth';

export function createAction({ action, headers = {}, type }) {
  return async(dispatch) => {
    dispatch({ type: type.REQUEST, headers });

    try {
      dispatch({ type: type.SUCCESS, headers, payload: await action() });
      
    } catch (error) {
      
      dispatch({ type: type.FAILURE, headers, error});
      // if(error.response.status === 401)
      // { console.log("Unauthorized-call"); 
      // refreshToken();
      // }
      //alert('API ERROR:'+JSON.stringify(error));
      console.log('API ERROR:'+JSON.stringify(error));
    }
  };
}

/**
 * Creates the failure, request, and success type derivatives for the given action identifier.
 * @param   {string}  id  The identifier of the action.
 * @returns {Object}
 */
export function createActionType(id) {
  return {
    FAILURE: `${id}__FAILURE`,
    REQUEST: `${id}__REQUEST`,
    SUCCESS: `${id}__SUCCESS`,
  };
}
