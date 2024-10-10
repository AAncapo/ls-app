import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const StyledButton = ({ text, handlePress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor={"#DDDDDD"}
      style={styles.container}
      onPress={handlePress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "#CB3A60",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
