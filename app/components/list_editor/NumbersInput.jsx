import { TextInput } from "react-native";
import React, { useState } from "react";

const HEIGHT_STEP = 20;

const NumbersInput = ({ numeros, update }) => {
  const [inputHeight, setInputHeight] = useState(
    numeros.length > 0 ? numeros.length * HEIGHT_STEP : HEIGHT_STEP,
  );
  const [val, setVal] = useState(numeros.join("\n")); // array to string

  return (
    <TextInput
      placeholder="--"
      keyboardType="numeric"
      multiline={true}
      blurOnSubmit={false}
      onChangeText={(text) => {
        const separated = text.split(/[\s\n.,\-]/);
        setInputHeight(
          separated.length > 0 ? separated.length * HEIGHT_STEP : HEIGHT_STEP,
        );
        const newVal = separated;
        update(newVal);
        setVal(newVal.join("\n"));
      }}
      style={{
        height: inputHeight,
        fontWeight: "bold",
      }}
    >
      {val}
    </TextInput>
  );
};

export default NumbersInput;
