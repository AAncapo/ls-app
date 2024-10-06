/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import NumbersInput from "./NumbersInput";
import { USER_NAME } from "../constants";
import { toCurrency } from "../libs/utils";

const JugadaButton = ({ jugada, update, deleteJugada }) => {
  const [toggleDel, setToggleDel] = useState(false);
  const type = jugada.type;

  const onNumbersUpdated = (updatedNums) => {
    jugada.numeros = updatedNums.filter((n) => !isNaN(parseInt(n)));
    update(jugada);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor={"#DDDDDD"}
      style={styles.parent}
      onLongPress={() => {
        setToggleDel(!toggleDel);
      }}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: jugada.premio > 0 ? "#FBE4CF" : "white",
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: 20,
        }}>
        {/* Numeros */}
        <View style={styles.numbers}>
          <NumbersInput
            numeros={jugada.numeros}
            update={onNumbersUpdated}
            styles={styles.textInput}
          />
        </View>

        <View style={{ flexDirection: "row", flexGrow: 1 }}>
          {/* Parle&Centenas */}
          {type !== "BOLA" && (
            <View
              style={{
                width: 30,
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}>
              <Text>$</Text>
              <TextInput
                style={styles.textInput}
                placeholder="0.00"
                keyboardType="numeric"
                onChangeText={(text) => {
                  const userInput = parseFloat(text);
                  if (!isNaN(userInput)) {
                    jugada.dinero_parlcent = Math.round(userInput);
                    update(jugada);
                  }
                }}>
                {jugada.dinero_parlcent > 0 ? jugada.dinero_parlcent : ""}
              </TextInput>
            </View>
          )}
          {/* Fijos&Corridos */}
          {type === "BOLA" && (
            <View
              style={{
                width: 30,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}>
              <View style={styles.currency}>
                <Text>$</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const userInput = parseFloat(text);
                    if (!isNaN(userInput)) {
                      jugada.dinero_fijo = Math.round(userInput);
                      update(jugada);
                    }
                  }}>
                  {jugada.dinero_fijo > 0 ? jugada.dinero_fijo : ""}
                </TextInput>
              </View>
              <View style={styles.currency}>
                <Text>$</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const userInput = parseFloat(text);
                    if (!isNaN(userInput)) {
                      jugada.dinero_corrido = Math.round(userInput);
                      update(jugada);
                    }
                  }}>
                  {jugada.dinero_corrido > 0 ? jugada.dinero_corrido : ""}
                </TextInput>
              </View>
            </View>
          )}
        </View>
        {/* Premio */}
        <View style={styles.premio}>
          <Text>Premio</Text>
          <Text>{jugada.premio > 0 ? `${toCurrency(jugada.premio)}` : "--"}</Text>
        </View>
        {/* Jugador */}
        <TextInput
          style={styles.textInput}
          placeholder="jugador"
          onChangeText={(text) => {
            const userInput = text;
            jugada.jugador = userInput;
            update(jugada);
          }}>
          {jugada.jugador}
        </TextInput>
        <Text style={{ fontSize: 12 }}>{jugada.creado.split(" ")[1]}</Text>
      </View>
      {/* Borrar */}
      <TouchableOpacity
        onPress={() => {
          setToggleDel(false);
          deleteJugada(jugada.id);
        }}
        style={{
          backgroundColor: "#BA3351",
          position: "absolute",
          opacity: toggleDel ? 100 : 0,
          pointerEvents: toggleDel ? "auto" : "none",
          flexGrow: 1,
          width: 100,
          height: 50,
          justifyContent: "center",
        }}>
        <Text style={styles.delete_text}>BORRAR</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    minHeight: 50,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  textInput: {
    textAlign: "center",
    borderColor: "lightgray",
    borderBottomWidth: 2,
  },
  premio: {
    opacity: USER_NAME === "admin" ? 100 : 0,
    alignItems: "center",
  },
  currency: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  numbers: {
    paddingVertical: 5,
    width: 50,
  },
  delete_text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default JugadaButton;
