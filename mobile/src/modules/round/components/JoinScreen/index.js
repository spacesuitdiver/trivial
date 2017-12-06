import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity, TextInput, Button, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { iOSColors, iOSUIKit, human } from 'react-native-typography';
import * as roundActions from '../../actions';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class JoinScreen extends React.Component {
  state = {
    name: '',
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: iOSColors.black, justifyContent: 'center', padding: 12 }}>
        <Text style={iOSUIKit.largeTitleEmphasizedWhite}>Join Trivia</Text>
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
        />
        <TouchableOpacity
          style={{ marginBottom: deviceWidth * 0.6 }}
          onPress={() => this.props.actions.round.play(this.state.name)}
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

// const mapStateToProps = state => ({
//   round: state.channel.default.round,
// });

const mapDispatchToProps = dispatch => ({
  actions: {
    round: bindActionCreators(roundActions, dispatch),
  },
});

export default connect(null, mapDispatchToProps)(JoinScreen);
