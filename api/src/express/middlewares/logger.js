import logger from '../../logger';
import uuid from 'uuid';

export default (req, res, next) => {
  logger.info({ req, res, req_id: uuid.v4() });

  next();
};
