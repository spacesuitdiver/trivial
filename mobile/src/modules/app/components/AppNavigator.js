import { StackNavigator } from 'react-navigation';

import { JoinScreen, QuestionScreen } from '../../round';

const AppNavigator = StackNavigator(
  {
    Join: { screen: JoinScreen },
    Question: { screen: QuestionScreen },
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
