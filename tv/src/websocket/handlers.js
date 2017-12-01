import { store } from '../redux';

export const onMessage = (m) => {
  if (!m.data) return;
  const message = JSON.parse(m.data);

  if (!message.resource || !message.action) return;
  // store.dispatch({
  //   type: message.action,
  //   gyms: message.data
  // });
};

export const onClose = (m) => {
  store.dispatch({
    type: 'websocket/CLOSED'
  });
}

export const onError = (m) => {
  store.dispatch({
    type: 'websocket/ERROR'
  });
}

export const onOpen = (m) => {
  store.dispatch({
    type: 'websocket/OPEN'
  });
}