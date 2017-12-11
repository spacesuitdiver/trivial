import os from 'os';
import express from 'express';
import expressWs from 'express-ws';

import logger from './logger';
import { middlewares } from './express';

import store from './store';
import { handlers } from './modules';

const wss = expressWs(express());
const { app } = wss;

app.set('trust proxy', 1);

app.use(middlewares);

app.use('/static', express.static('public'));

app.ws('/', (ws, req) => {
  ws.on('close', () => logger.info('Connection closed.'));
  ws.on('message', (m) => {
    logger.info(m);
    const message = JSON.parse(m);

    handlers[message.resource][message.action]({ ...message, ws });
  });
});

app.get('/nextQuestion', (req, res) => {
  handlers.round.nextQuestion();
  res.send({
    ...store,
    players: store.players.map(({ ws, ...rest }) => rest),
    moderators: store.moderators.map(({ ws, ...rest }) => rest),
  });
});

app.get('/store', (req, res) => {
  res.send({
    ...store,
    players: store.players.map(({ ws, ...rest }) => rest),
    moderators: store.moderators.map(({ ws, ...rest }) => rest),
  });
});

const port = process.env.PORT || 8080;
app.listen(port);
logger.info(`Listening on http://${os.hostname()}:${port}.`);
