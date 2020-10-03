import {
  ACTION__LOGOUT,
  ACTION__SOCKET_CONNECTION__GOT_MSG,
  ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT,
} from 'constants/actions';

const NEXT_MSG_TIMEOUT = 5000;

let nextMsgTimer = null;

const clearNextMsgTimer = () => {
  if (nextMsgTimer) {
    clearTimeout(nextMsgTimer);
    nextMsgTimer = null;
  }
};

export default store => next => action => {
  /* eslint-disable-next-line default-case */
  switch (action.type) {
    case ACTION__LOGOUT:
      clearNextMsgTimer();
      return next(action);

    // New msg received - clear the prev timer and start the new one.
    case ACTION__SOCKET_CONNECTION__GOT_MSG:
      clearNextMsgTimer();
      next(action);

      nextMsgTimer = setTimeout(() => {
        store.dispatch({type: ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT});
      }, NEXT_MSG_TIMEOUT);

      return undefined;
  }

  return next(action);
};
