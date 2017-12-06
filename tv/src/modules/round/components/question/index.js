import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

const QuestionScreen = ({ question }) => (
  <View>
    { question && <Text>{ question.text }</Text>}
    { question && question.answers.map((answer, index) =>
      <TouchableHighlight
        key={index}
        onPress={console.log}
      >
        <Text>{answer}</Text>
      </TouchableHighlight>) }
  </View>
);

const mapStateToProps = state => ({
  question: state.round.default.question,
});

export default connect(mapStateToProps)(QuestionScreen);
