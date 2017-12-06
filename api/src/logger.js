import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: require('../package.json').name,
  serializers: bunyan.stdSerializers,
  streams: [
    { stream: process.stdout },
  ],
});

export default logger;
