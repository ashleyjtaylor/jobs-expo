import React, { Component } from 'react';
import {
  View,
  Animated,
  Platform,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ROTATION_BOUNDARY = SCREEN_WIDTH * 1.5;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    keyProp: 'id',
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  state = {
    index: 0
  }

  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },

      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.onSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.onSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    // android
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  onSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { data, onSwipeLeft, onSwipeRight } = this.props;

    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    this.position.setValue({ x: 0, y: 0 }); // reset position object for next card

    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    // amout of distance dragged - amount of rotation it should do
    const rotate = this.position.x.interpolate({
      inputRange: [-ROTATION_BOUNDARY, 0, ROTATION_BOUNDARY], // pixel range
      outputRange: ['-120deg', '0deg', '120deg'] // unit to map input range
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
      if (i < this.state.index) return null;

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.card]}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.card, { top: 10 * (i - this.state.index), zIndex: -i }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Swipe;
