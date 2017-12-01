/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';
import { send } from './websocket';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

function logError(error) {
  console.log("logError", error);
}

export default class App extends Component<{}> {
  state = {
    stream: '',
  };

  componentDidMount() {
    const peerConnection = new RTCPeerConnection({
      'iceServers': [
        {'url': 'stun:stun.l.google.com:19302'}
      ],
    });

    peerConnection.onicecandidate = function (event) {
      console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        send({
          resource: 'stream',
          action: 'connect',
          data: {
            data: event.candidate
          },
        });
        // ws.send('exchange', {'to': socketId, 'candidate': event.candidate });
      }
    };

    peerConnection.oniceconnectionstatechange = function(event) {
      console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    };

    let isFront = true;
    MediaStreamTrack
      .getSources()
      .then(sourceInfos => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
            videoSourceId = sourceInfo.id;
          }
        }
        return getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30
            },
            facingMode: (isFront ? "user" : "environment"),
            optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
          }
        });
      })
      .then(stream => {
        this.setState({ stream: stream.toURL() });
        return stream
      })
      .catch(logError);
  }

  render() {
    return (
      <RTCView streamURL={this.state.stream} style={styles.selfView} />
    );
  }
}

const styles = StyleSheet.create({
  selfView: {
    width: deviceWidth,
    height: deviceHeight,
  },
});
