import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const StyledButton = ({
  text,
  handlePress,
  bgColor = "#CB3A60",
  textColor = "white",
  enabled = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor={"#DDDDDD"}
      disabled={!enabled}
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={handlePress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
