import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { iOSColors, iOSUIKit, human } from 'react-native-typography';

import * as roundActions from '../actions';

const { width: deviceWidth } = Dimensions.get('window');

class AnswersList extends React.Component {

  render() {
    const { answers, actions } = this.props;

    return (
      <FlatList
        keyExtractor={(item, index) => index}
        data={answers}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: answer, index: answerIndex }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderColor: iOSColors.black,
              backgroundColor: '#181819',
            }}
            onPress={() => this.props.actions.round.answer({ answerIndex })}
          >
            <Text style={human.bodyWhite}>
              {answer}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    round: bindActionCreators(roundActions, dispatch),
  },
});

export default connect(null, mapDispatchToProps)(AnswersList);
