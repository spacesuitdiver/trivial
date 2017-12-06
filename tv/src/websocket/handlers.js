import { store } from '../redux';

export const onMessage = (m) => {
  if (!m.data) return;
  const message = JSON.parse(m.data);

  if (!message.resource || !message.action) return;

  store.dispatch({
    type: `${message.resource}/${message.action}`,
    payload: message.payload || null,
  });
};

export const onClose = () => {
  store.dispatch({
    type: 'websocket/DISCONNECTED',
  });
};

export const onError = () => {
  store.dispatch({
    type: 'websocket/ERROR',
  });
};

export const onOpen = () => {
  store.dispatch({
    type: 'websocket/CONNECTED',
  });
};
