import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import { send } from '../../../../websocket';

class Welcome extends React.Component {
  componentDidMount() {
    setTimeout(() => send({
      resource: 'round',
      action: 'moderate',
      user: {
        name: 'Apple Tv',
        deviceId: '1',
      },
    }), 1000);
  }

  render() {
    return (<View>
      <TouchableHighlight
        onPress={() => {
          send({
            resource: 'round',
            action: 'nextQuestion',
          });
          this.props.navigation.navigate('Question');
        }}
      >
        <Text>Begin!</Text>
      </TouchableHighlight>
    </View>);
  }
}

export default Welcome;
