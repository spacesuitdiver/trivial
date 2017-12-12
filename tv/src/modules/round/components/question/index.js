import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import Screen from '../Screen';
import Players from '../Players';

import { send } from '../../../../websocket';

const TVEventHandler = require('TVEventHandler'); // eslint-disable-line

class QuestionScreen extends React.Component {

  componentDidMount() {
    this._enableTVEventHandler();
  }

  componentDidUpdate() {
    const { websocketStatus, navigation } = this.props;

    if (websocketStatus === 'disconnected' || websocketStatus === 'error') {
      navigation.goBack();
    }
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
  }

  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, (cmp, evt) => {
      console.log(evt);
      if (evt.eventType === 'left') {
        this.nextQuestion();
      }
      if (evt.eventType === 'longSelect') {
        this.props.navigation.navigate('Winner');
        this._disableTVEventHandler();
      }
    });
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  nextQuestion = () => send({
    resource: 'round',
    action: 'nextQuestion',
  });

  render() {
    const {
      props: { question },
    } = this;

    return (
      <Screen>
        <View style={styles.upper}>
          <View style={styles.question}>
            {question &&
              <TouchableHighlight
                hasTVPreferredFocus
                onPress={console.log}
                underlayColor="transparent"
                activeOpacity={1}
                tvParallaxProperties={{
                  enabled: false,
                }}
              >
                <Text style={styles.questionText}>{question.text}</Text>
              </TouchableHighlight>
            }
          </View>
        </View>
        <Players />
      </Screen>
    );
  }
}

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
  websocketStatus: state.websocket.connection.status,
});

export default connect(mapStateToProps)(QuestionScreen);
