import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux';
import * as WebSocket from './websocket';

import { AppNavigator } from './modules/app';

const TVEventHandler = require('TVEventHandler'); // eslint-disable-line

class App extends Component {

  componentDidMount() {
    WebSocket.init();
    this._enableTVEventHandler();
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
  }

  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, (cmp, evt) => {});
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
