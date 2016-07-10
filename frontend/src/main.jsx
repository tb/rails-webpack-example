import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import createStore from 'store/create-store';

import {
  App,
  Hello,
} from 'components';

export default () => {
  const store = createStore({
    logger: process.env.NODE_ENV == 'development'
  });

  const history = syncHistoryWithStore(hashHistory, store);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Hello}/>
        </Route>
      </Router>
    </Provider>
  );
};
