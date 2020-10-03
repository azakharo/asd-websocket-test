import {
  ACTION__LOGOUT,
  ACTION__SOCKET_CONNECTION__CLOSED,
  ACTION__SOCKET_CONNECTION__GOT_MSG,
  ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT,
  ACTION__SOCKET_CONNECTION__OPENED,
  ACTION__SUBSCRIBE,
  ACTION__SUBSCRIBE_FAIL,
} from '../constants/actions';

// Be carefull, the following values are also used for the styling
const STATUS_DISCONNECTED = 'disconnected';
const STATUS_CONNECTING = 'connecting';
const STATUS_CONNECTED = 'connected';

const initialState = {
  status: STATUS_DISCONNECTED,
  time: null, // unix timestamp
  error: null,
};

export default function socketConnectionReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION__SUBSCRIBE:
      return {
        ...initialState,
        time: state.time, // persist time
        status: STATUS_CONNECTING,
      };
    case ACTION__SOCKET_CONNECTION__OPENED:
      return {
        ...state,
        status: STATUS_CONNECTED,
      };
    case ACTION__SOCKET_CONNECTION__CLOSED:
      return {
        ...state,
        status: STATUS_DISCONNECTED,
        error: action.error
          ? action.error.message || JSON.stringify(action.error)
          : null,
      };
    case ACTION__SOCKET_CONNECTION__GOT_MSG:
      return {
        ...state,
        time: action.payload,
      };
    case ACTION__LOGOUT:
      return {
        ...initialState,
      };
    case ACTION__SOCKET_CONNECTION__NEXT_MSG_TIMEOUT:
    case ACTION__SUBSCRIBE_FAIL:
      return {
        ...initialState,
        time: state.time,
        error: action.error || null,
      };
    default:
      return state;
  }
}
