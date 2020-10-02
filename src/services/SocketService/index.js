import {
  ACTION__SOCKET__CONNECT,
  ACTION__SOCKET_CONNECTION__CLOSED,
  ACTION__SOCKET_CONNECTION__ERROR,
  ACTION__SOCKET_CONNECTION__GOT_MSG,
  ACTION__SOCKET_CONNECTION__OPENED,
} from '../../constants/actions';

export default class SocketService {
  // Input:
  // * socket server URL
  // * dispatch func for dispatching actions
  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.ws = null;
  }

  handleConnectionOpen = () => {
    console.log('connected to the websocket server');

    this.dispatch({type: ACTION__SOCKET_CONNECTION__OPENED});
  };

  handleNewMessage = event => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (err) {
      console.log(
        'Could not parse data received from the socket server. Ignore the data.',
      );
      console.error(err);
      return;
    }

    const time = data.server_time;

    this.dispatch({type: ACTION__SOCKET_CONNECTION__GOT_MSG, payload: time});
  };

  handleConnectionClose = error => {
    console.log(error);
    console.log('The socket connection has been closed');

    this.dispatch({type: ACTION__SOCKET_CONNECTION__CLOSED, error});
  };

  handleConnectionError = error => {
    console.error('Socket connection error: ', error, 'Closing socket...');

    this.dispatch({type: ACTION__SOCKET_CONNECTION__ERROR, error});
  };

  /**
   * @function connect
   * This function establishes connection to the websocket and ensures constant
   * reconnection if the connection is closed
   */
  connect = () => {
    this.dispatch({type: ACTION__SOCKET__CONNECT});

    console.log(`connecting to ${this.url}...`);

    this.ws = new WebSocket(this.url);
    this.ws.onopen = this.handleConnectionOpen;
    this.ws.onmessage = this.handleNewMessage;
    this.ws.onclose = this.handleConnectionClose;
    this.ws.onerror = this.handleConnectionError;
  };

  disconnect = () => {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  };
}
