import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';

import { fetchJobs } from '../actions';

import { Spinner } from '../components/UI';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={25} color={tintColor} />
  }

  state = {
    error: false,
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onSearchJobs = () => {
    this.props.fetchJobs(this.state.region, (err) => {
      (err) ? this.setState({ error: err }) : this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.mapLoaded) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            onPress={this.onSearchJobs}
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  button: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 }
  }
}

const mapStateToProps = ({ jobs }) => {
  return { jobs };
};

export default connect(mapStateToProps, {
  fetchJobs
})(MapScreen);
