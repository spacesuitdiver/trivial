import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { iOSColors, iOSUIKit, human } from 'react-native-typography';
import * as roundActions from '../../actions';

import AnswersList from '../AnswersList';


class QuestionScreen extends React.Component {

  static navigationOptions = {
    gesturesEnabled: false,
  };

  componentDidUpdate() {
    const { websocketStatus, navigation } = this.props;

    if (websocketStatus === 'disconnected' || websocketStatus === 'error') {
      navigation.goBack();
    }
  }

  render() {
    const { question } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: iOSColors.black }}>
        {question ?
          <ScrollView style={{ flex: 1 }}>
            <Text style={[human.bodyWhite, { marginVertical: 18, marginHorizontal: 12 }]}>{question.text}</Text>
            <AnswersList answers={question.answers} />
          </ScrollView>
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[iOSUIKit.largeTitleEmphasizedWhite, { textAlign: 'center' }]}>Waiting for next question...</Text>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  question: state.round.default.question,
  websocketStatus: state.websocket.default.status,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    question: bindActionCreators(roundActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
