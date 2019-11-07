import { ACCOUNT__LOGIN, ACCOUNT__LOGOUT, REFRESH__TOKEN } from 'dictionary/action';
import React from 'react';
import initialState from 'store/initialState';
import { Redirect } from 'react-router-dom';
import { showAlert } from '../util/helpers';

export default function auth(state = initialState.auth, { payload, type }) {
  switch (type) {
    case ACCOUNT__LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACCOUNT__LOGIN.SUCCESS:
      return {
        ...state,
        loginData: payload.data,
        authenticated:true,
        isFetching: false,
        userRoles: payload.data.UserRoles
      };
      case ACCOUNT__LOGIN.FAILURE:
      showAlert('Invalid Credentials');
      return {
        ...state,
        authenticated:false,
      };
    case ACCOUNT__LOGOUT.REQUEST:
      return {
        
      };
    case ACCOUNT__LOGOUT.SUCCESS:
    localStorage.removeItem('jwtToken');
    <Redirect to='/login'/>
      return {
        ...state,
        loginData: {},
        authenticated:false,
      };
      case REFRESH__TOKEN.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REFRESH__TOKEN.SUCCESS:
      return {
        ...state,
        loginData: payload.data,
        authenticated:true,
        isFetching: false,
        userRoles: payload.data.UserRoles
      };
    case REFRESH__TOKEN.FAILURE:
      localStorage.clear();
      state.authenticated = false;
      showAlert('Session Expired - Please Login');
      window.location.href='/login';  
      return {
        ...state,
        authenticated:false,
      };
    default:
      return state;
  }
}
