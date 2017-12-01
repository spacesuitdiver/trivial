import { onMessage, onClose, onError, onOpen } from './handlers';

const connection = new WebSocket('ws://localhost:18080');

export const init = (store) => {
  connection.onmessage = onMessage;
  connection.onclose = onClose;
  connection.onerror = onError;
  connection.onopen = onOpen;
};

export const send = (action) => {
  connection.send(JSON.stringify(action));
};