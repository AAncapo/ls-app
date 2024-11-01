import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const HEIGHT_STEP = 19;
const MIN_HEIGHT = 50;

const NumbersInput = ({ numeros, update }) => {
  const [inputHeight, setInputHeight] = useState(
    numeros.length > 0 ? numeros.length * HEIGHT_STEP : MIN_HEIGHT,
  );
  const [val, setVal] = useState(numeros.join("\n")); // array to string
  // const numbersInput = createRef();
  return (
    <TextInput
      // ref={numbersInput}
      placeholder="---"
      keyboardType="numeric"
      multiline={true}
      blurOnSubmit={true}
      // autoFocus={true}
      onChangeText={(text) => {
        const separated = text.split(/[\s\n.,\-]/);
        setInputHeight(separated.length > 0 ? separated.length * HEIGHT_STEP : MIN_HEIGHT);
        const newVal = separated;
        setVal(newVal.join("\n"));
      }}
      onBlur={() => {
        update(val.split("\n"));
      }}
      defaultValue={val}
      style={[styles.input, { height: inputHeight }]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: MIN_HEIGHT,
    fontWeight: "bold",
  },
});

export default NumbersInput;
