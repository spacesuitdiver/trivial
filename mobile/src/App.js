import React, { Component } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux';
import * as WebSocket from './websocket';
import { ScreenOrientation } from 'expo';

import { AppNavigator } from './modules/app';

class App extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', false);
    WebSocket.init();
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
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
    backgroundColor: '#0F0F0F',
  },
});

export default App;
