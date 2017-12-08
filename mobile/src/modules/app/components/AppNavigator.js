import { StackNavigator } from 'react-navigation';

import { JoinScreen, QuestionScreen } from '../../round';


export default StackNavigator(
  {
    Join: { screen: JoinScreen },
    Question: { screen: QuestionScreen },
  },
  {
    headerMode: 'none',
  },
);
