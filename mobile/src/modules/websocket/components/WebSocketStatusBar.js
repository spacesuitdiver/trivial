import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';

const wsStatusBarHeight = Constants.statusBarHeight + 18;

class WebSocketStatusBar extends Component {
  componentDidUpdate() {
    const { status } = this.props;

    switch (status) {
      case 'connected': {
        Animated.spring(this.animations.barPosition, {
          toValue: -wsStatusBarHeight,
          delay: 1000,
          useNativeDriver: true,
        }).start();
        break;
      }
      default: {
        Animated.spring(this.animations.barPosition, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        break;
      }
    }
  }

  animations = {
    barPosition: new Animated.Value(0),
  };

  renderStatusMessage() {
    const { status } = this.props;

    switch (status) {
      case 'connected':
        return 'Connected to server.';
      default:
        return 'Disconnected from server.';
    }
  }

  render() {
    const { status } = this.props;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          justifyContent: 'flex-end',
          height: wsStatusBarHeight,
          backgroundColor: status === 'connected' ? 'green' : 'red',
          transform: [{
            translateY: this.animations.barPosition,
          }],
        }}
      >
        <Text style={{ fontSize: 12, textAlign: 'center', paddingVertical: 4, color: 'white' }}>{this.renderStatusMessage()}</Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  status: state.websocket.default.status,
});

export default connect(mapStateToProps)(WebSocketStatusBar);
