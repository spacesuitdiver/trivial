import React, { Component } from 'react';
import {
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

import { AppNavigator } from './modules/app';

class App extends Component {

  componentDidMount() {
    WebSocket.init();
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
