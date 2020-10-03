import {
  ACTION__APP__INIT,
  ACTION__LOGIN_SUCCESS,
  ACTION__LOGOUT,
  ACTION__SOCKET_CONNECTION__CLOSED,
  ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT,
  ACTION__SUBSCRIBE_SUCCESS,
} from 'constants/actions';
import {subscribe} from 'actionCreators/socketConnection';
import SocketService from 'services/SocketService';

let socketService = null;

const deleteSocketService = () => {
  if (socketService) {
    socketService.disconnect();
    socketService = null;
  }
};

export default store => next => action => {
  /* eslint-disable-next-line default-case */
  switch (action.type) {
    case ACTION__LOGIN_SUCCESS:
      next(action);
      return store.dispatch(subscribe());

    case ACTION__APP__INIT:
      next(action);
      return store.dispatch(subscribe());

    case ACTION__SUBSCRIBE_SUCCESS:
      next(action);

      socketService = new SocketService(action.payload, store.dispatch);
      socketService.connect();

      return undefined;

    case ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT:
      deleteSocketService();
      next(action);
      return store.dispatch(subscribe());

    case ACTION__SOCKET_CONNECTION__CLOSED:
      deleteSocketService();
      next(action);
      return store.dispatch(subscribe());

    case ACTION__LOGOUT:
      deleteSocketService();
      return next(action);
  }

  return next(action);
};
