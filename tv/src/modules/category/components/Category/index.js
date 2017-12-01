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

const { width: deviceWidth } = Dimensions.get('window');

const HEADER_IMAGE_HEIGHT = 200;

const handleIconPress = item => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Share', 'Preview', 'Cancel'],
      cancelButtonIndex: 2,
      title: item.title,
    },
    selectedOption => {
      console.log(selectedOption);
    },
  );
};

export const Category = ({ channel }) => (
  <FlatList
    keyExtractor={(item, index) => index}
    style={{ width: deviceWidth }}
    data={channel.playlist}
    stickyHeaderIndices={[0]}
    ListHeaderComponent={
      <View
        style={{
          height: HEADER_IMAGE_HEIGHT,
          marginBottom: 24,
          backgroundColor: '#4F4F51',
        }}
      >
        <Image
          style={{ ...StyleSheet.absoluteFillObject }}
          source={{ uri: channel.playlist[0].video.thumbnail }}
        />
      </View>
    }
    renderItem={({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginBottom: 24,
          marginLeft: 16,
          alignItems: 'center',
        }}
      >
        <View style={{ marginRight: 16 }}>
          <Image
            source={{ uri: item.video.thumbnail }}
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
              {item.video.duration}
            </Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ color: 'white' }}>{item.title}</Text>
          <Text style={{ color: 'white' }}>{item.subTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleIconPress(item)}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 24,
          }}
        >
          <Image
            style={{ tintColor: 'white' }}
            source={require('./ellipses.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )}
  />
);

export default Channel;
