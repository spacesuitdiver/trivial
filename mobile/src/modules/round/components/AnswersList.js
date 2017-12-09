import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { iOSColors, human } from 'react-native-typography';

class AnswersList extends React.Component {

  render() {
    const { answers, onAnswerPress, style } = this.props;

    return (
      <View style={style}>
        {answers.map((answer, answerIndex) =>
          <TouchableOpacity
            key={answerIndex}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
              padding: 16,
              borderRadius: 8,
              borderColor: iOSColors.black,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => onAnswerPress({ answerIndex })}
          >
            <View style={{ flex: 1 }}>
              <Text style={[human.bodyWhite, { textAlign: 'center', fontWeight: 'bold' }]}>
                {answer}
              </Text>
            </View>
          </TouchableOpacity>,
        )}
      </View>
    );
  }
}

export default AnswersList;
