import { Animated } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Question, Welcome, Winner } from '../../round';

const fade = () => ({
  transitionSpec: {
    duration: 800,
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps) => {
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
    Welcome: { screen: Welcome },
    Question: { screen: Question },
    Winner: { screen: Winner },
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
