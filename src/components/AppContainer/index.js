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
import ApiService from 'services/ApiService';
import socketConnectionMiddleware from 'middlewares/socketConnection';
import App from 'components/App';
import history from '../../history';

const persistedState = loadState();
ApiService.setAccessToken(persistedState?.auth?.user?.token);

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      socketConnectionMiddleware,
    ),
  ),
);

store.subscribe(
  throttle(() => {
    const state = store.getState();
    const authState = state.auth;

    if (!authState) {
      return;
    }

    const {isAuthenticated, user} = authState;

    saveState({
      auth: {
        isAuthenticated,
        user,
      },
    });
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
