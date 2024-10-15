import { TextInput } from "react-native";
import React, { useState } from "react";

const HEIGHT_STEP = 19;
const MIN_HEIGHT = 50;

const NumbersInput = ({ numeros, update }) => {
  const [inputHeight, setInputHeight] = useState(
    numeros.length > 0 ? numeros.length * HEIGHT_STEP : MIN_HEIGHT,
  );
  const [val, setVal] = useState(numeros.join("\n")); // array to string

  return (
    <TextInput
      placeholder="---"
      keyboardType="numeric"
      multiline={true}
      blurOnSubmit={false}
      onChangeText={(text) => {
        const separated = text.split(/[\s\n.,\-]/);
        setInputHeight(separated.length > 0 ? separated.length * HEIGHT_STEP : MIN_HEIGHT);
        const newVal = separated;
        update(newVal);
        setVal(newVal.join("\n"));
      }}
      style={{
        minHeight: MIN_HEIGHT,
        height: inputHeight,
        fontWeight: "bold",
      }}>
      {val}
    </TextInput>
  );
};

export default NumbersInput;
