import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <TouchableOpacity
          onPress={this.props.onComplete}
          style={styles.button}>
          <Text style={styles.buttonText}>Onwards</Text>
        </TouchableOpacity>
      )
    }

    return null;
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color}]}
        >
          <Text style={styles.text}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} pagingEnabled horizontal>
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    padding: 16
  },
  text: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#0288d1',
    marginTop: 32
  },
  buttonText: {
    color: '#fff',
    padding: 16
  }
};

export default Slides;
