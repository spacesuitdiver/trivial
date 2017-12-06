import ReconnectingWebSocket from 'reconnecting-websocket';
import { onMessage, onClose, onError, onOpen } from './handlers';

let connection = new ReconnectingWebSocket('ws://leblancc-mbp.taillight.corp:8080');

export const init = () => {
  connection.onmessage = onMessage;
  connection.onclose = onClose;
  connection.onerror = onError;
  connection.onopen = onOpen;
};

export const send = (action) => {
  connection.send(JSON.stringify(action));
};
