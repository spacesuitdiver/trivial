import React from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  Dimensions,
  TVEventHandler,
} from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const icon = require('./play.png');

class CategoryScreen extends React.Component {

  state = {
    paused: false,
  };

  componentDidMount() {
    alert('category');
    const tvEventHandler = new TVEventHandler();
    tvEventHandler.enable(this, (app, event) => {
      this.onRemoteEvent(event);
    });
  }

  onRemoteEvent({ eventType }) {
    switch (eventType) {
      case 'playPause': {
        this.togglePlayback();
      }
    }
  }

  togglePlayback() {
    this.setState({ paused: !this.state.paused });
  }

  render() {
    const { channel } = this.props;
    const { paused } = this.state;

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: 'black',
        }}
      >
        <Video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          paused={paused}
          source={{ uri: 'http://localhost:5080/WebRTCApp/streams/stream1.m3u8' }}
        />
        {paused &&
          <View
            style={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              width: deviceWidth,
            }}
          >
            <TouchableHighlight
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 100,
                height: 100,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              tvParallaxProperties={{
                enabled: false,
              }}
            >
              <Image
                source={icon}
                style={{ tintColor: 'white' }}
              />
            </TouchableHighlight>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  category: state.category.default[0],
});

export default connect(mapStateToProps)(CategoryScreen);
