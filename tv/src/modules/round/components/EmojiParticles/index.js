import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class EmojiParticles extends React.Component {
  particles = Array(this.props.particleCount).fill();
  particleX = this.particles.map(() => new Animated.Value(0));
  particleY = this.particles.map(() => new Animated.Value(0));
  particleScale = this.particles.map(() => new Animated.Value(0));
  particleOpacity = this.particles.map(() => new Animated.Value(0));

  componentDidMount() {
    this.bigBang();
  }

  bigBang = () => {
    const {
      particleCount,
      particleMaxDistance,
      emoji,
      speed,
      delay,
    } = this.props;
    let iterator = 1;

    this.particles.forEach((particle, i) => {
      Animated.parallel([
        Animated.timing(this.particleX[i], {
          toValue: Math.floor(Math.random() * (120 - -120 + 1)) + -120,
          duration: speed,
          delay: i * delay,
          useNativeDriver: true,
        }),

        Animated.timing(this.particleY[i], {
          toValue: Math.floor(Math.random() * (120 - -120 + 1)) + -120,
          duration: speed,
          delay: i * delay,
          useNativeDriver: true,
        }),

        Animated.timing(this.particleScale[i], {
          toValue: 1,
          duration: speed,
          delay: i * delay,
          useNativeDriver: true,
        }),

        Animated.timing(this.particleOpacity[i], {
          toValue: 1,
          duration: speed,
          delay: i * delay,
          useNativeDriver: true,
        }),
      ]).start(() => {
        iterator++;
        if (iterator === particleCount) {
          this.replayBigBang();
        }
      });
    });
  };

  replayBigBang = () => {
    this.particles.forEach((particle, i) => {
      this.particleX[i].setValue(0);
      this.particleY[i].setValue(0);
      this.particleScale[i].setValue(0);
      this.particleOpacity[i].setValue(0);
    });

    this.bigBang();
  };

  renderAnimation = () => {
    const { particleCount, particleMaxDistance, emoji } = this.props;
    return this.particles.map((particle, i) => (
      <Animated.View
        key={i}
        style={{
          position: 'absolute',
          zIndex: -i,
          transform: [
            {
              translateX: this.particleX[i].interpolate({
                inputRange: [-120, 0, 120],
                outputRange: [
                  -particleMaxDistance / 2,
                  0,
                  particleMaxDistance / 2,
                ],
              }),
            },
            {
              translateY: this.particleY[i].interpolate({
                inputRange: [-120, 0, 120],
                outputRange: [-particleMaxDistance, 0, -particleMaxDistance],
              }),
            },
          ],
        }}
      >
        <Animated.Text
          style={{
            fontSize: 120,
            backgroundColor: 'transparent',
            transform: [
              {
                scale: this.particleScale[i].interpolate({
                  inputRange: [0, 0.1, 1],
                  outputRange: [0, Math.random() * (1 - 0.25) + 0.25, 0],
                }),
              },
            ],
          }}
        >
          {emoji[Math.floor(Math.random() * (emoji.length - 0) + 0)]}
        </Animated.Text>
      </Animated.View>
    ));
  };

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {this.renderAnimation()}
      </View>
    );
  }
}

EmojiParticles.defaultProps = {
  particleCount: 1000,
  particleMaxDistance: 200,
  emoji: ['🎉', '🚀'],
  speed: 750,
  delay: 10,
};
