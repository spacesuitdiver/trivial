import React from 'react';
import {
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import Video from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: deviceWidth } = Dimensions.get('window');

const HEADER_IMAGE_HEIGHT = (deviceWidth - 40 - 8) * 0.5625; // 16:9 aspect

const handleIconPress = (item) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Share', 'Preview', 'Cancel'],
      cancelButtonIndex: 2,
      title: item.title,
    },
    (selectedOption) => {
      console.log(selectedOption);
    },
  );
};

class Channel extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { channel } = nextProps;

    // this.player.seek(channel.nowPlayItemPosition);
  }

  componentDidMount() {
    const { channel } = this.props;

    this.player.seek(channel.nowPlayItemPosition);
  }

  render() {
    const { channel, index } = this.props;

    return (
      <FlatList
        keyExtractor={(item, index) => index}
        style={{
          width: deviceWidth - 40 - 8,
          marginTop: 24,
          marginBottom: 32,
          marginHorizontal: 4,
          backgroundColor: '#181819',
          borderRadius: 16,
        }}
        data={channel.playlist}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#0C0C0C',
                top: -99,
              }}
            />
            <Text
              style={{
                paddingTop: 16,
                paddingBottom: 12,
                paddingLeft: 24,
                fontSize: 30,
                fontWeight: '800',
                letterSpacing: 0.9,
                color: '#FAFAFA',
                backgroundColor: 'transparent',
              }}
            >
              {channel.name}
            </Text>
            <View
              style={{
                height: HEADER_IMAGE_HEIGHT,
                backgroundColor: '#4F4F51',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: 'hidden',
              }}
            >
              <Video
                ref={(ref) => {
                  this.player = ref;
                }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                }}
                source={{ uri: channel.playlist[channel.nowPlayingIndex].mp4 }}
                muted
                onEnd={() => this.props.actions.channel.fetch()}
                repeat
              />
            </View>
          </View>
        }
        renderItem={({ item: video, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: index === 0 ? 24 : 0,
              marginBottom: 24,
              marginLeft: 16,
              alignItems: 'center',
            }}
            onPress={() => this.props.actions.play({ channel, video })}
          >
            <View style={{ marginRight: 16 }}>
              <Image
                source={{ uri: video.thumbnail }}
                style={{
                  width: 112,
                  height: 63,
                  backgroundColor: '#4F4F51',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}
              >
                <Text style={{ fontSize: 11, color: 'white' }}>
                  {video.duration}
                </Text>
              </View>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{ color: index === channel.nowPlayingIndex ? 'red' : 'white' }}>{video.title}</Text>
              <Text style={{ color: index === channel.nowPlayingIndex ? 'red' : 'white' }}>{video.subTitle}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleIconPress(video)}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 24,
              }}
            >
              <Image
                style={{ tintColor: '#99999F' }}
                source={require('./ellipses.png')}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    );
  }
}


const mapDispatchToProps = dispatch => ({
  actions: {
    channel: bindActionCreators(channelActions, dispatch),
  },
});

export default connect(null, mapDispatchToProps)(Channel);
