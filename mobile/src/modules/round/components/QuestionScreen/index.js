import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Camera, BlurView } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { iOSColors, iOSUIKit, human } from 'react-native-typography';
import * as roundActions from '../../actions';

import AnswersList from '../AnswersList';


class QuestionScreen extends React.Component {

  static navigationOptions = {
    gesturesEnabled: false,
  };

  state = {
    mugshot: null,
  };

  componentDidUpdate() {
    const { websocketStatus, navigation } = this.props;

    if (websocketStatus === 'disconnected' || websocketStatus === 'error') {
      navigation.goBack();
    }
  }

  answer = ({ answerIndex }) => {
    const { actions } = this.props;

    this.camera.takePictureAsync({ base64: true, quality: 0 })
    .then(({ base64 }) => {
      const mugshot = `data:image/jpg;base64,${base64}`;

      actions.question.answer({ answerIndex, mugshot });
      this.setState({ mugshot });
      setTimeout(() => { this.setState({ mugshot: null }); }, 5000);
    });
  };

  render() {
    const { question } = this.props;
    const { mugshot } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: iOSColors.black }}>
        <Camera
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
          type={Camera.Constants.Type.front}
          ref={(ref) => { this.camera = ref; }}
        />
        <BlurView tint="dark" intensity={85} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
        {question ?
          <ScrollView
            style={{ padding: 20 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Text
              style={[human.title2White, { marginBottom: 16 }]}
            >{question.text}</Text>
            <AnswersList
              onAnswerPress={({ answerIndex }) => this.answer({ answerIndex })}
              answers={question.answers}
            />
          </ScrollView>
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
              mugshot ?
                <View style={{ flex: 1, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: mugshot }} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, resizeMode: 'contain' }} />
                  <View>
                    <Text style={[iOSUIKit.largeTitleEmphasizedWhite, { textAlign: 'center' }]}>Gotcha!</Text>
                  </View>
                </View>
                :
                <Text style={[iOSUIKit.largeTitleEmphasizedWhite, { textAlign: 'center' }]}>Waiting for next question...</Text>

            }
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
