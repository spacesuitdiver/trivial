import React, { Component } from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux';
import * as WebSocket from './websocket';
import { WebSocketStatusBar } from './modules/websocket';
import { App } from './modules/app';

export default class extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    WebSocket.init();
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <WebSocketStatusBar />
            <App />
          </View>
        </Provider>
      </View>
    );
  }
}
