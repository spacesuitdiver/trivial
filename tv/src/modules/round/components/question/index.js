import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import Screen from '../Screen';
import Players from '../Players';

const styles = StyleSheet.create({
  question: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  questionText: {
    fontSize: 72,
    textAlign: 'center',
  },
});

const QuestionScreen = ({ question }) => (
  <Screen>
    <View style={styles.question}>
      { question && <Text style={styles.questionText}>{ question.text }</Text> }
    </View>
    <Players />
  </Screen>
);

const mapStateToProps = state => ({
  question: state.round.default.question,
});

export default connect(mapStateToProps)(QuestionScreen);
