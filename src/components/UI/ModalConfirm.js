import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';

const ModalConfirm = ({ children, visible, onAccept, onDecline }) => {
  const { cardSection, text, container } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={container}>
        <View style={cardSection}>
          <Text style={text}>{children}</Text>
        </View>

        <View style={cardSection}>
          <Button title="No" onPress={onDecline} />
          <Button title="Yes" onPress={onAccept} />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  cardSection: {
    justifyContent: 'center'
  },

  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },

  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    padding: 16
  }
};

export { ModalConfirm };
