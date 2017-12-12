import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import EmojiParticles from '../EmojiParticles';

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

const Winner = class extends React.Component {

  componentDidUpdate() {
    const { websocketStatus, navigation } = this.props;

    if (websocketStatus === 'disconnected' || websocketStatus === 'error') {
      navigation.goBack();
    }
  }

  render() {
    const {
      props: { winner },
    } = this;

    return (
      <Screen>
        <View style={styles.view}><Text style={styles.title}>Winner!</Text></View>
        <View>
          { winner && winner.mugshot && <Image style={styles.image} source={{ uri: winner.mugshot }} /> }
        </View>
        { winner && winner.name && <View style={styles.view}><Text style={styles.winnerText}>{ winner.name }</Text></View> }
        <EmojiParticles speed={3000} particleMaxDistance={Dimensions.get('window').height} />
      </Screen>
    );
  }
};

const mapStateToProps = state => ({
  winner: state.round.default.players[0],
  websocketStatus: state.websocket.connection.status,
});

export default connect(mapStateToProps)(Winner);
