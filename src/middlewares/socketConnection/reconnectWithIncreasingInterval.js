import {
  ACTION__LOGOUT,
  ACTION__SUBSCRIBE_FAIL,
  ACTION__SUBSCRIBE_SUCCESS,
} from 'constants/actions';
import {subscribe} from 'actionCreators/socketConnection';
import isAuthenticated from './isAuthenticated';

const RESUBSCRIBE_INITIAL_TIMEOUT = 250;
let resubscribeTimeout = RESUBSCRIBE_INITIAL_TIMEOUT;
let resubscribeTimer = null;

const clearResubscribeTimer = () => {
  if (resubscribeTimer) {
    clearTimeout(resubscribeTimer);
    resubscribeTimer = null;
  }
  resubscribeTimeout = RESUBSCRIBE_INITIAL_TIMEOUT;
};

export default store => next => action => {
  /* eslint-disable-next-line default-case */
  switch (action.type) {
    case ACTION__SUBSCRIBE_FAIL:
      next(action);

      resubscribeTimeout = Math.min(10000, resubscribeTimeout * 2);
      resubscribeTimer = setTimeout(() => {
        if (isAuthenticated(store)) {
          store.dispatch(subscribe());
        }
      }, resubscribeTimeout);

      return undefined;

    case ACTION__SUBSCRIBE_SUCCESS:
    case ACTION__LOGOUT:
      clearResubscribeTimer();
      return next(action);
  }

  return next(action);
};
