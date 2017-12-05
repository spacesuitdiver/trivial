import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, Text, ScrollView, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';

import Question from '../Question';

const { width: deviceWidth } = Dimensions.get('window');

class QuestionScreen extends React.Component {
  componentWillMount() {
    this.props.actions.channel.fetch();
  }

  render() {
    const { channels } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#0C0C0C' }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{
            width: deviceWidth - 40,
            marginHorizontal: 20,
            overflow: 'visible',
          }}
        >
          {channels.map((channel, i) => (
            <Channel key={i} index={i} channel={channel} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  question: state.channel.default.question,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    question: bindActionCreators(questionActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
