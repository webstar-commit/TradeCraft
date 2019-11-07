import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import createReducer from 'reducers/root';

import initialState from './initialState';

export const history = createBrowserHistory();

export default function configureStore() {
  /* The Root Reducer */
  const rootReducer = createReducer();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
  ];

  // @ifdef DEVELOPMENT
  middlewares.push(
    immutableStateInvariantMiddleware(),
    loggerMiddleware
  );
  // @endif

  /* The Redux Enhancements */
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  /* The Redux Store */
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer
  );

  if (module.hot) {
    /* Enables Redux Hot Reloading */
    module.hot.accept('reducers/root', () => {
      import('reducers/root')
        .then((getReducer) => {
          store.replaceReducer(getReducer());
        });
    });
  }

  return store;
}
