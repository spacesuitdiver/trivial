import ReconnectingWebSocket from 'reconnecting-websocket';
import { onMessage, onClose, onError, onOpen } from './handlers';

let connection;

export const init = () => {
  connection = new ReconnectingWebSocket('ws://localhost:8080');

  connection.onmessage = onMessage;
  connection.onclose = onClose;
  connection.onerror = onError;
  connection.onopen = onOpen;
};

export const send = (action) => {
  connection.send(JSON.stringify(action));
};
