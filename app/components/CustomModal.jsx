import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";

const CustomModal = ({ visible, title, confirm, close }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={close}>
                <Text style={[styles.textStyle, styles.textClose]}>CANCELAR</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  confirm();
                  close();
                }}>
                <Text style={styles.textStyle}>CONFIRMAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textClose: {
    color: "gray",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    minWidth: 110,
    backgroundColor: "white",
  },
});
