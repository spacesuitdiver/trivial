export const connect = event => {
  event.ws.send({
    word: 'up'
  });
};
