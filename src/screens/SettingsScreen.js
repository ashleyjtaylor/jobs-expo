import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';

import { clearLikes, logout } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  onLogout = () => {
    this.props.logout();
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <View style={{ marginTop: 16 }}>
        <Button
          large
          title="Clear Saved Jobs"
          icon={{ name: 'delete-forever' }}
          backgroundColor="#f44336"
          onPress={this.props.clearLikes}
        />
        <Button
          large
          title="Logout"
          icon={{ name: 'delete-forever' }}
          backgroundColor="#000"
          onPress={this.onLogout}
        />
      </View>
    );
  }
}

export default connect(null, {
  clearLikes,
  logout
})(SettingsScreen);
