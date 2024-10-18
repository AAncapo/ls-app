import { StyleSheet, Text, TextInput, View, Pressable, Button } from "react-native";
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
    <Pressable
      activeOpacity={0.6}
      underlayColor={"#DDDDDD"}
      style={[styles.parent, { backgroundColor: jugada.premio > 0 ? "#FBE4CF" : "white" }]}
      onPress={() => {
        if (toggleDel) setToggleDel(false);
      }}
      onLongPress={() => {
        setToggleDel(true);
      }}>
      <View
        style={{
          // flex: 1,
          width: "100%",
          height: "100%",
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
                    jugada.dinero_parlcent = !isNaN(userInput) ? userInput : 0;
                    update(jugada);
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
                      jugada.dinero_fijo = !isNaN(userInput) ? userInput : 0;
                      update(jugada);
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
                      jugada.dinero_corrido = !isNaN(userInput) ? userInput : 0;
                      update(jugada);
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
          opacity: toggleDel ? 100 : 0,
          pointerEvents: toggleDel ? "auto" : "none",
        }}>
        <Button
          title="borrar"
          onPress={() => {
            deleteJugada(jugada.id);
            console.log("borra");
            setToggleDel(false);
          }}
          // style={[
          //   {
          //     opacity: toggleDel ? 100 : 0,
          //     pointerEvents: toggleDel ? "auto" : "none",
          //   },
          //   styles.deleteButton,
          // ]}
        ></Button>
        {/* <Text style={styles.delete_text}>BORRAR</Text> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  parent: {
    minHeight: 60,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    marginBottom: 2,
  },
  premio: {
    opacity: 100,
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
