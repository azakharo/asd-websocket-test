import {hot} from 'react-hot-loader/root';
import throttle from 'lodash/throttle';
import React from 'react';
import {Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {loadState, saveState} from 'helpers/persistState';
import rootReducer from 'reducers';
import App from 'components/App';
import history from '../../history';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
  ),
);

store.subscribe(
  throttle(() => {
    const state = store.getState();
    const {auth} = state;

    saveState({auth});
  }, 1000),
);

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

export default hot(AppContainer);
