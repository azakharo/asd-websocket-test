import api from 'services/ApiService';
import {
  ACTION__SUBSCRIBE,
  ACTION__SUBSCRIBE_FAIL,
  ACTION__SUBSCRIBE_SUCCESS,
} from 'constants/actions';

/* eslint-disable-next-line import/prefer-default-export */
export const subscribe = () => dispatch => {
  dispatch({
    type: ACTION__SUBSCRIBE,
  });

  return api.subscribe().then(
    socketServerUrl =>
      dispatch({
        type: ACTION__SUBSCRIBE_SUCCESS,
        payload: socketServerUrl,
      }),
    error =>
      dispatch({
        type: ACTION__SUBSCRIBE_FAIL,
        error,
      }),
  );
};
