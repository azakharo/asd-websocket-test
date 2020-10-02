import {
  ACTION__LOGOUT,
  ACTION__SOCKET__CONNECT,
  ACTION__SOCKET_CONNECTION__CLOSED,
  ACTION__SOCKET_CONNECTION__GOT_MSG,
  ACTION__SOCKET_CONNECTION__OPENED,
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
    case ACTION__SOCKET__CONNECT:
      return {
        ...initialState,
        status: STATUS_CONNECTING,
      };
    case ACTION__SOCKET_CONNECTION__OPENED:
      return {
        ...initialState,
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
    default:
      return state;
  }
}
