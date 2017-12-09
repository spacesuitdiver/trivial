import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Stylesheet
} from 'react-native';
import { connect } from 'react-redux';

import Screen from '../Screen';

const styles = StyleSheet.create({
  question: {
    backgroundColor: 'transparent'
  },
  questionText: {
    fontSize: 72,
    textAlign: 'center'
  }
})

const QuestionScreen = ({ question }) => (
  <Screen>
    { question && <View style={styles.question}><Text style={styles.questionText}>{ question.text }</Text></View>}
  </Screen>
);

const mapStateToProps = state => ({
  question: state.round.default.question,
});

export default connect(mapStateToProps)(QuestionScreen);
