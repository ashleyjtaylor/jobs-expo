import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const slidesData = [
  { text: 'Welcome to Job Finder App', color: '#03a9f4' },
  { text: 'Job Finder will help you get a local job', color: '#009688' },
  { text: 'Set your location and swipe away', color: '#03a9f4' }
];

class WelcomeScreen extends Component {
  state = {
    token: null
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  onComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides data={slidesData} onComplete={this.onComplete} />
    );
  }
}

export default WelcomeScreen;
