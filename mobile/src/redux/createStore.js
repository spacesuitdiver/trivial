import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import middlewares from './middlewares';

export default (reducers) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers,
    composeEnhancers(
      applyMiddleware(...middlewares),
      autoRehydrate(),
    ),
  );

  AsyncStorage.clear();

  // persistStore(store, {
  //   storage: AsyncStorage,
  // });

  return store;
};
