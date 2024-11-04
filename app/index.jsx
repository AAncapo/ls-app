/* eslint-disable react-hooks/exhaustive-deps */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Alert, Button, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useContext } from "react";

import { getFromStorage } from "../libs/asyncstorage-handler";
import { getUser } from "../libs/jsonblob-api";
import { DatabaseContext } from "../context/DatabaseContext";
import useDatabase from "../hooks/useDatabase";

// !!! El id se guarda en local y se carga de ahi pero al exportar listas siempre revisa el jsonBlob para comprobar que sigue siendo valido
let inputPwd = "";

export default function App() {
  const { setDatabase } = useContext(DatabaseContext);
  const { database, updateDatabase } = useDatabase();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (database.session.user) return; // para verificar si la db esta iniciada

    getFromStorage("data").then((res) => {
      if (res !== null) setDatabase({ ...res });
      // console.log(res);
      console.log("loading data from storage");
    });
  }, []);

  useEffect(() => {
    if (database.session.active) router.replace("/selector");
  }, [database]);

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    // Fetch data from jsonBlob -> ver si el pin existe
    const res = await getUser(inputPwd);
    if (res !== undefined) {
      // User found -> OK
      setIsLoading(false);
      updateDatabase("session", { user: inputPwd, active: true });
      router.replace("./selector");
    } else {
      setIsLoading(false);
      Alert.alert("Pin incorrecto!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Pin de usuario"
          style={styles.inputText}
          onChangeText={(text) => {
            inputPwd = text;
          }}
          onSubmitEditing={handleSubmit}>
          {inputPwd}
        </TextInput>
      </View>
      <Button title="Entrar" onPress={handleSubmit}></Button>
      {isLoading && (
        <ActivityIndicator size={"large"} style={{ paddingVertical: 20 }}></ActivityIndicator>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lavender",
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
