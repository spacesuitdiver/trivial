import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { connect } from 'react-redux';

import Screen from '../Screen';

const colors = {
  transparent: 'transparent',
};

const styles = StyleSheet.create({
  image: {
    width: 800,
    height: 600,
  },
  title: {
    fontSize: 144,
    marginBottom: 60,
  },
  winnerText: {
    fontSize: 72,
  },
  view: {
    backgroundColor: colors.transparent,
  },
});

const Winner = ({ winner }) => (
  <Screen>
    <View style={styles.view}><Text style={styles.title}>Winner!</Text></View>
    <View>
      <Image style={styles.image} source={{ uri: winner.mugshot }} />
    </View>
    <View style={styles.view}><Text style={styles.winnerText}>{ winner.name }</Text></View>
  </Screen>
);

const mapStateToProps = state => ({
  winner: state.round.default.players[0],
});

export default connect(mapStateToProps)(Winner);
