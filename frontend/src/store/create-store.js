import { applyMiddleware, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

export default function(options = {}) {
  const middlewares = [
    thunk
  ];

  if (options.logger) {
    middlewares.unshift(createLogger({collapsed: true}));
  }

  return createStore(
    combineReducers(reducers),
    applyMiddleware(...middlewares)
  );
}
