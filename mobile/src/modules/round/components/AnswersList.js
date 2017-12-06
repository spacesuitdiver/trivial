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
        style={{
        	marginTop: 12,
        	backgroundColor: '#181819',
        }}
        data={answers}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: answer, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderBottomWidth: 1,
              borderColor: iOSColors.black,
            }}
          >
            <Text style={{ color: 'white' }}>
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
