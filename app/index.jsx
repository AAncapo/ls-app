/* eslint-disable react-hooks/exhaustive-deps */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Alert, Button } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";

import { DATA } from "./constants";
import { getSession, updateSession } from "./libs/asyncstorage-handler";

let inputPwd = "";

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      getSession().then((res) => {
        if (res === true) {
          inputPwd = DATA.PASSWORD;
          submit();
          router.replace("./selector");
        }
      });
    } else {
      router.replace("./selector");
    }
  }, [init]);

  const submit = () => {
    if (inputPwd !== DATA.PASSWORD) Alert.alert("Pin incorrecto!");
    else setInit(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Pin de usuario"
          secureTextEntry
          style={styles.inputText}
          onChange={(e) => {
            inputPwd = e.nativeEvent.text;
            console.log(inputPwd);
          }}
          onSubmitEditing={() => {
            submit();
            updateSession("true");
          }}
          keyboardType="numeric"></TextInput>
      </View>
      <Button
        title="Entrar"
        onPress={() => {
          submit();
          updateSession("true");
        }}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontSize: 20,
    height: 50,
    color: "black",
    textAlign: "center",
  },
});
