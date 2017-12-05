import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import TabBarBottom from './TabBarBottom';
import { QuestionScreen } from '../../question';
import { JoinScreen } from '../../round';


const AppNavigator = StackNavigator(
  {
    Join: { screen: JoinScreen },
    Question: { screen: QuestionScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

export default AppNavigator;
