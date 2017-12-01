import express from 'express';
import expressWs from 'express-ws';

import logger from './logger';
import { middlewares } from './express';

import { handlers } from './modules';

const wss = expressWs(express());
const { app } = wss;

app.set('trust proxy', 1);

app.use(middlewares);

app.use('/static', express.static('public'));

app.ws('/', (ws, req) => {
  ws.on('close', () => logger.info('Connection closed.'));
  ws.on('message', m => {
    logger.info(m);
    const message = JSON.parse(m);

    handlers[message.resource][message.action]({...message, ws });
  });
});

app.listen(process.env.PORT || 18080);