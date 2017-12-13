import React from 'react';
import { Animated, View, Dimensions, StatusBar, StyleSheet, Image } from 'react-native';
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
      this.setState({
        loading: false,
      }, () => {
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
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              background: 'transparent',
              opacity: this.fadeAnimatedValue,
              transform: [
                {
                  scale: this.fadeAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [3, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            fadeDuration={0}
            source={splashImage}
            style={{
              height: deviceHeight,
              width: deviceWidth,
              resizeMode: 'cover',
            }}
          />
        </Animated.View>
      </View>
    );
  }
}

export default ExpoApp;
