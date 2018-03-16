import React, { Component } from 'react';
import { Text, View, ScrollView, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={25} color={tintColor} />,
      headerRight: (
        <Button
          title="Settings"
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => navigation.navigate('settings')}
        />  
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  renderJobs() {
    return this.props.likes.map(job => {
      const {
        url, jobkey, jobtitle,
        company, formattedRelativeTime,
        longitude, latitude
      } = job;
      
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045
      };
      
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.details}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now"
              backgroundColor="#03a9f4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  details: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

const mapStateToProps = ({ likes }) => {
  return { likes };
};

export default connect(mapStateToProps)(ReviewScreen);
