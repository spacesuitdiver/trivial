import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
});

const Screen = props => (
  <View
    style={styles.screen}
  >
    <AnimatedLinearGradient
      customColors={[
        'rgb(249, 190, 4)',
        'rgb(160, 72, 30)',
        'rgb(230, 160, 15)',
        'rgb(198, 113, 33)',
      ]}
      speed={3500}
      style={styles.gradient}
    />
    { props.children }
  </View>
);

export default Screen;
