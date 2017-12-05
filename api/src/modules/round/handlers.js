export const join = event => {
  event.ws.send({
    word: 'up'
  });
};
