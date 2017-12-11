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
  transparent: 'transparent',
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
  cardInner: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
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
  scrollView: {
    flexShrink: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  textWrapper: {
    backgroundColor: colors.transparent,
  },
});

const Players = ({ players }) => (
  <ScrollView>
    <View style={styles.scrollView}>
      {
        players.map(player =>
          (<View key={player.deviceId} style={styles.cardWrapper}>
            <TouchableHighlight
              onPress={console.log}
              underlayColor="transparent"
              tvParallaxProperties={{
                enabled: true,
                magnification: 1.1,
                activeOpacity: 1,
              }}
            >
              <View style={styles.cardInner}>
                <View style={styles.card}>
                  <View style={styles.imageWrapper}>
                    {player.mugshot && <Image style={styles.image} source={{ uri: player.mugshot }} />}
                    <Text>Score: { player.score }</Text>
                  </View>
                </View>
                <View style={styles.textWrapper}>
                  <Text
                    style={styles.cardText}
                    numberOfLines={1}
                  >
                    {player.name} - {player.status}
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
