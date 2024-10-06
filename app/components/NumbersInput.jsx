import { TextInput } from "react-native";
import React, { useState } from "react";

const NumbersInput = ({ numeros, update, styles }) => {
  const [inputHeight, setInputHeight] = useState(numeros.length > 0 ? numeros.length * 20 : 20);
  const [val, setVal] = useState(numeros.join("\n")); // array to string

  return (
    <TextInput
      keyboardType="numeric"
      multiline={true}
      onChangeText={(text) => {
        const separated = text.split(/[\s\n.]/);
        setInputHeight(separated.length > 0 ? separated.length * 20 : 20);
        const newVal = separated;
        update(newVal);
        setVal(newVal.join("\n"));
      }}
      style={[
        styles,
        {
          height: inputHeight,
          fontWeight: "bold",
        },
      ]}>
      {val}
    </TextInput>
  );
};

export default NumbersInput;
