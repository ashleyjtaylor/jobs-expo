import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onFacebookLogin = () => {
    this.props.facebookLogin();
  }

  onAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate('map');
    } 
  }

  render() {
    return (
      <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          large
          title="Login with Facebook"
          backgroundColor="#03a9f4"
          onPress={this.onFacebookLogin}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, {
  facebookLogin
})(AuthScreen);
