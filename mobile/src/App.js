import React, { Component } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux';
import * as WebSocket from './websocket';
import { WebSocketStatusBar } from './modules/websocket';
import { AppNavigator } from './modules/app';

class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    WebSocket.init();
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <WebSocketStatusBar />
            <AppNavigator />
          </View>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});

export default App;
