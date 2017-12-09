import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0, 
    zIndex: 0
  }
});

const Screen = (props) => (
  <View
    style={styles.screen}
  >
    <AnimatedLinearGradient customColors={presetColors.firefox} speed={2000} style={styles.gradient} />
    { props.children }
  </View>
);

export default Screen;
