import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';

import Screen from '../Screen';

import { send } from '../../../../websocket';

const colors = {
  black: 'black',
  orange: 'orange',
  white: 'white',
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'transparent',
    marginBottom: 60,
    flex: 0,
    flexDirection: 'row',
    padding: 40
  },
  titleText: {
    fontSize: 144,
    color: '#222222'
  },
  button: {
    backgroundColor: 'transparent',
    padding: 30,
  },
  text: {
    color: colors.white,
    fontSize: 72,
  },
});

class Welcome extends React.Component {
  componentDidMount() {
    setTimeout(() => send({
      resource: 'round',
      action: 'moderate',
      user: {
        name: 'Apple Tv',
        deviceId: '1',
      },
    }), 1000);
  }

  render() {
    return (
      <Screen>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome to</Text>
          <Text style={[styles.titleText, { fontStyle: 'italic' }]}>TRIVIAL</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => {
              send({
                resource: 'round',
                action: 'nextQuestion',
              });
              this.props.navigation.navigate('Question');
            }}
            style={{ borderRadius: 30, overflow: 'hidden' }}
          >
            <LinearGradient
              colors={['#222222', '#2b2b2b', '#2f2f2f']}
              style={styles.button}
            >
              <Text style={styles.text}>START NEW GAME!</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>
      </Screen>
    );
  }
}

export default Welcome;
