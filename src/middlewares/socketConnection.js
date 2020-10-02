import {
  ACTION__APP__INIT,
  ACTION__LOGIN_SUCCESS,
  ACTION__LOGOUT,
  ACTION__SOCKET_CONNECTION__CLOSED,
  ACTION__SOCKET_CONNECTION__GOT_MSG,
  ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT,
  ACTION__SUBSCRIBE_FAIL,
  ACTION__SUBSCRIBE_SUCCESS,
} from 'constants/actions';
import {subscribe} from 'actionCreators/socketConnection';
import SocketService from 'services/SocketService';

let socketService = null;

const isAuthenticated = store => store.getState().auth.isAuthenticated;

const NEXT_MSG_TIMEOUT = 5000;
let nextMsgTimer = null;

export default store => next => action => {
  /* eslint-disable-next-line default-case */
  switch (action.type) {
    case ACTION__LOGIN_SUCCESS:
    case ACTION__SUBSCRIBE_FAIL:
      next(action);
      return store.dispatch(subscribe());
    case ACTION__APP__INIT:
    case ACTION__SOCKET_CONNECTION__CLOSED:
      next(action);
      if (isAuthenticated(store)) {
        return store.dispatch(subscribe());
      }
      return undefined;
    case ACTION__SUBSCRIBE_SUCCESS:
      next(action);
      socketService = new SocketService(action.payload, store.dispatch);
      socketService.connect();
      return undefined;
    case ACTION__LOGOUT:
      if (socketService) {
        socketService.disconnect();
        socketService = null;
      }
      return next(action);
    // New msg received - clear the prev timer and start the new one.
    case ACTION__SOCKET_CONNECTION__GOT_MSG:
      next(action);

      if (nextMsgTimer) {
        clearTimeout(nextMsgTimer);
      }

      nextMsgTimer = setTimeout(() => {
        if (socketService) {
          socketService.disconnect();
          socketService = null;
        }

        // Looks like the current subscription is out-of-date
        store.dispatch({type: ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT});
      }, NEXT_MSG_TIMEOUT);

      return undefined;
    // New msg timeout - force re-connect.
    case ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT:
      next(action);
      // Looks like the current subscription is out-of-date
      store.dispatch({type: ACTION__SUBSCRIBE_FAIL});
      return undefined;
  }

  return next(action);
};
