import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { USER_NAME } from "../../constants";
import NumbersInput from "./NumbersInput";
import { toCurrency } from "../../libs/utils";

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
      onPress={() => {
        setToggleDel(false);
      }}
      onLongPress={() => {
        setToggleDel(!toggleDel);
      }}>
      <View
        style={{
          width: "100%",
          backgroundColor: jugada.premio > 0 ? "#FBE4CF" : "white",
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
        }}>
        {/* Numeros */}
        <View style={styles.numbers}>
          <NumbersInput numeros={jugada.numeros} update={onNumbersUpdated} />
        </View>

        <View style={{ flexDirection: "row", flexGrow: 1 }}>
          {/* Parle&Centenas */}
          {type !== "BOLA" && (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {type === "PARLE" ? "Parle" : "Centena"}
              </Text>
              <View style={styles.currencyContainer}>
                <Text style={styles.currency}>$</Text>
                <TextInput
                  style={styles.currency}
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
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "gray" }}>Fijo</Text>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currency}>$</Text>
                  <TextInput
                    style={styles.currency}
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
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "gray" }}>Corrido</Text>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currency}>$</Text>
                  <TextInput
                    style={styles.currency}
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
          placeholder="Nombre"
          onChangeText={(text) => {
            const userInput = text;
            jugada.jugador = userInput;
            update(jugada);
          }}>
          {jugada.jugador}
        </TextInput>
      </View>
      {/* Borrar */}
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
        <TouchableOpacity
          onPress={() => {
            setToggleDel(false);
            deleteJugada(jugada.id);
          }}
          style={[
            {
              opacity: toggleDel ? 100 : 0,
              pointerEvents: toggleDel ? "auto" : "none",
            },
            styles.deleteButton,
          ]}>
          <Text style={styles.delete_text}>BORRAR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    minHeight: 60,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
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
  premio: {
    opacity: USER_NAME === "admin" ? 100 : 0,
    alignItems: "center",
    width: 80,
  },
  currencyContainer: {
    minWidth: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  currency: {
    fontSize: 15,
  },
  numbers: {
    paddingVertical: 5,
    width: 50,
  },
  deleteButton: {
    backgroundColor: "red",
    alignItems: "center",
    width: 150,
    height: "80%",
    borderRadius: 5,
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  delete_text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default JugadaButton;
