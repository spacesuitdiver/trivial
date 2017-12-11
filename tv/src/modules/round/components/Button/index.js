import React from 'react';
import {
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const colors = {
  transparent: 'transparent',
};

const styles = StyleSheet.create({
  touchableHighlight: { borderRadius: 30, overflow: 'hidden' },
  linearGradient: { backgroundColor: colors.transparent, padding: 30 },
});

const Button = ({ onPress, children, style }) => (
  <View style={style}>
    <TouchableHighlight
      onPress={onPress}
      style={styles.touchableHighlight}
    >
      <LinearGradient
        colors={['#222222', '#2b2b2b', '#2f2f2f']}
        style={styles.linearGradient}
      >
        { children }
      </LinearGradient>
    </TouchableHighlight>
  </View>
);

export default Button;
