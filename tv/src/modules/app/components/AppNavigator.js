import React from 'react';
import { View, Text, Easing, Animated } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { CategoriesScreen, CategoryScreen } from '../../category';

const fade = () => ({
  transitionSpec: {
    duration: 800,
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { position, scene } = sceneProps;
    const { index } = scene;

    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [0, 1],
    });

    return { opacity };
  },
});

const AppNavigator = StackNavigator(
  {
    Home: { screen: CategoriesScreen },
    Category: { screen: CategoryScreen },
  }, 
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: 'false',
    },
    transitionConfig: fade,
  },
);

export default AppNavigator;
