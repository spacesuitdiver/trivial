import { createStore, applyMiddleware, compose } from 'redux';
import middlewares from './middlewares';

export default (reducers) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  return store;
};
