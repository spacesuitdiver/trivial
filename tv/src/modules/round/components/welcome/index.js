import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Screen from '../Screen';
import Button from '../Button';

import { send } from '../../../../websocket';

const colors = {
  black: 'black',
  orange: 'orange',
  white: 'white',
  transparent: 'transparent',
  grey: '#222222',
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.transparent,
    marginBottom: 60,
    flex: 0,
    flexDirection: 'row',
    padding: 40,
  },
  titleText: {
    fontSize: 144,
    color: colors.grey,
  },
  text: {
    color: colors.white,
    fontSize: 72,
  },
  italic: { fontStyle: 'italic' },
});

class Welcome extends React.Component {
  begin = () => {
    send({
      resource: 'round',
      action: 'moderate',
      payload: {
        user: {
          name: 'Apple Tv',
          deviceId: '1',
        },
      },
    });
    this.props.navigation.navigate('Question');
  };

  render() {
    return (
      <Screen>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome to</Text>
          <Text style={[styles.titleText, styles.italic]}>TRIVIAL</Text>
        </View>
        <Button
          onPress={this.begin}
          hasTVPreferredFocus
        >
          <Text style={styles.text}>Let&rsquo;s Play!</Text>
        </Button>
      </Screen>
    );
  }
}

export default Welcome;
