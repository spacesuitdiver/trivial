import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { connect } from 'react-redux';

class WebSocketStatusBar extends Component {

  animations = {
    barHeight: new Animated.Value(20),
  };

  componentDidUpdate() {
    const { status } = this.props;

    // switch (status) {
    //   case 'connected':
    //     return Animated.spring(this.animations.barHeight, { toValue: 0 }).start();
    //   case 'connecting':
    //     return Animated.spring(this.animations.barHeight, { toValue: 20 }).start();
    //   case 'disconnected':
    //     return Animated.spring(this.animations.barHeight, { toValue: 20 }).start();
    // }
  }

  renderStatusMessage() {
    const { status } = this.props;

    switch (status) {
      case 'connected':
        return 'Connected to server';
      case 'connecting':
        return 'Attempting to connect to server';
      case 'disconnected':
      default:
        return 'Disconnected from server';
    }
  }

  render() {
    const { status } = this.props;

    return (
      <Animated.View style={{ backgroundColor: status === 'connected' ? 'green' : 'red', height: this.animations.barHeight }}>
        <Text style={{ fontSize: 12, textAlign: 'center', paddingVertical: 2, color: 'white' }}>{this.renderStatusMessage()}</Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  status: state.websocket.default.status,
});

export default connect(mapStateToProps)(WebSocketStatusBar);
