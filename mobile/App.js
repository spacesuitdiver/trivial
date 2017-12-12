import React from 'react';
import { Animated, View, Dimensions, StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import App from './src/App';

import splashImage from './assets/splash.png';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ExpoApp extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    StatusBar.setHidden(true, 'fade');
    StatusBar.setBarStyle('light-content');

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        StatusBar.setHidden(false, 'fade');
        Animated.spring(
          this.fadeAnimatedValue,
          { toValue: 0, tension: 10, friction: 1000, useNativeDriver: true, delay: 200 },
        ).start();
      });
    }, 2000);
  }

  fadeAnimatedValue = new Animated.Value(1);

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? <AppLoading /> : <App />}
        <Animated.Image
          source={splashImage}
          style={{
            top: 0,
            position: 'absolute',
            height: deviceHeight,
            width: deviceWidth,
            resizeMode: 'cover',
            opacity: this.fadeAnimatedValue,
            transform: [
              {
                scale: this.fadeAnimatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [3, 1],
                }),
              },
            ],
          }}
        />
      </View>
    );
  }
}

export default ExpoApp;
