import { AppRegistry } from 'react-native';
import App from './src/App';

console.ignoredYellowBox = ["Sending: 'onTVNavEvent'"];

AppRegistry.registerComponent('Trivial', () => App);
