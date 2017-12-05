import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import { TabBarBottom } from 'react-navigation';

export default props => (
  <View style={styles.tabBarContainer}>
    <TabBarBottom {...props} />
    <View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#1E1E1F',
        padding: 40,
      }}
    >
      <TouchableHighlight
        onPress={() => props.navigation.navigate('Camera')}
        style={styles.tabBarBiggie}
      >
        <Image style={{ tintColor: 'white' }} source={require('./add.png')} />
      </TouchableHighlight>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'relative',
  },
  tabBarBiggie: {
    position: 'absolute',
    top: -20,
    backgroundColor: '#0C0C0C',
    borderWidth: 2,
    borderColor: '#1E1E1F',
    alignSelf: 'center',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
