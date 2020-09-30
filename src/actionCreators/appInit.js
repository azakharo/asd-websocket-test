import {ACTION__APP__INIT, ACTION__APP__UNINIT} from 'constants/actions';

export const init = () => dispatch =>
  dispatch({
    type: ACTION__APP__INIT,
  });

export const uninit = () => dispatch =>
  dispatch({
    type: ACTION__APP__UNINIT,
  });
