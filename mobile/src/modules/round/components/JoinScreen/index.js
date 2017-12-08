import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { iOSColors, iOSUIKit, human } from 'react-native-typography';
import * as roundActions from '../../actions';

const { width: deviceWidth } = Dimensions.get('window');

class JoinScreen extends React.Component {
  state = {
    name: '',
  };

  join = () => {
    const { actions, navigation, websocketStatus } = this.props;

    if (websocketStatus === 'connected') {
      actions.round.play(this.state.name);
      navigation.navigate('Question');
    } else {
      alert('Please wait to be connected to server.');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: iOSColors.black, justifyContent: 'center', padding: 12 }}>
        <Text style={iOSUIKit.largeTitleEmphasizedWhite}>Welcome</Text>
        <TextInput
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
          style={[human.body,
            {
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: iOSColors.lightGray,
              borderRadius: 8,
              padding: 12,
              marginTop: 8,
            },
          ]}
          placeholder="What is your name?"
          placeholderTextColor={iOSColors.gray}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          style={{ marginBottom: deviceWidth * 0.6 }}
          onPress={this.join}
        >
          <View
            style={{
              borderRadius: 8,
              backgroundColor: iOSColors.orange,
              marginTop: 8,
              padding: 12,
            }}
          >
            <Text style={[human.bodyWhite, { textAlign: 'center' }]}>Join!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  websocketStatus: state.websocket.default.status,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    round: bindActionCreators(roundActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinScreen);
