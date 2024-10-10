import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

const PopupModal = ({ visible, message, close }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
