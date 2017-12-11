import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import Screen from '../Screen';
import Players from '../Players';
import Button from '../Button';

import { send } from '../../../../websocket';

const nextQuestion = () => send({
  resource: 'round',
  action: 'nextQuestion',
});

const QuestionScreen = ({ question, navigation }) => (
  <Screen>
    <View style={styles.upper}>
      <View style={styles.question}>
        { question && <Text style={styles.questionText}>{ question.text }</Text> }
      </View>
      <View style={styles.buttonRow}>
        <Button
          style={{ marginRight: 20 }}
          onPress={nextQuestion}
        >
          <Text style={styles.text}>NEXT</Text>
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate('Winner')}
        >
          <Text style={styles.text}>FINISH</Text>
        </Button>
      </View>
    </View>
    <Players />
  </Screen>
);

const colors = {
  opaque: 'rgba(255,255,255,0.25)',
  white: 'white',
};

const styles = StyleSheet.create({
  upper: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: colors.opaque,
    flexDirection: 'column',
    width: '100%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    width: '80%',
  },
  questionText: {
    fontSize: 72,
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 36,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});

const mapStateToProps = state => ({
  question: state.round.default.question,
});

export default connect(mapStateToProps)(QuestionScreen);
