import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

const colors = {
  white: 'white',
  black: 'black',
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'column',
    flex: 0,
    flexGrow: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 360,
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 10,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    marginBottom: 10,
  },
  cardText: {
    fontSize: 36,
    color: colors.white,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 180,
    width: 360,
  },
  image: {
    height: 180,
    width: 360,
  },
});

const Players = ({ players }) => (
  <ScrollView>
    <View style={{ flexShrink: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', paddingTop: 30 }}>
      {
        players.map((player, index) =>
          (<View key={player.deviceId} style={styles.cardWrapper}>
            <TouchableHighlight
              onPress={() => console.log(index)}
              underlayColor="transparent"
              tvParallaxProperties={{
                enabled: true,
                magnification: 1.1,
                activeOpacity: 1,
              }}
            >
              <View style={{ flex: 0, flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                <View style={styles.card}>
                  <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: player.mugshot }} />
                  </View>
                </View>
                <View style={{ backgroundColor: 'transparent' }}>
                  <Text
                    style={styles.cardText}
                    numberOfLines={1}
                  >
                    {player.name}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>))
        }
    </View>
  </ScrollView>
);

const mapStateToProps = state => ({
  players: state.round.default.players,
});

export default connect(mapStateToProps)(Players);
