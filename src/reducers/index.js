import {combineReducers} from 'redux';

import auth from './auth';
import socketConnection from './socketConnection';

export default combineReducers({
  auth,
  socketConnection,
});
