import { StyleSheet, Text, TextInput, View, Pressable, Button } from "react-native";
import React, { memo, useState } from "react";

import NumbersInput from "./NumbersInput";
import { toCurrency } from "../../libs/utils";
import Jugada from "../../classes/Jugada";

const JugadaButton = memo(
  function JugadaButton({
    type,
    numeros,
    dinero_fijo,
    dinero_corrido,
    dinero_parlcent,
    premio,
    jugador,
    update,
    deleteJugada,
    isReadonly,
    visible,
  }) {
    const [toggleDel, setToggleDel] = useState(false);
    // const type = jugada.type;
    // console.log("jugada");
    const jugada = new Jugada(type);
    jugada.numeros = numeros;
    jugada.dinero_fijo = dinero_fijo;
    jugada.dinero_corrido = dinero_corrido;
    jugada.dinero_parlcent = dinero_parlcent;
    jugada.premio = premio;
    jugada.jugador = jugador;

    const onNumbersUpdated = (updatedNums) => {
      jugada.numeros = updatedNums.filter((n) => !isNaN(parseInt(n)));
      update(jugada);
    };

    return (
      <Pressable
        activeOpacity={0.6}
        underlayColor={"#DDDDDD"}
        style={[
          styles.parent,
          {
            // display: filter === type ? "flex" : "none",
            backgroundColor: jugada.premio > 0 ? "#FBE4CF" : "white",
          },
        ]}
        onPress={() => {
          if (toggleDel) setToggleDel(false);
        }}
        onLongPress={() => {
          setToggleDel(true);
        }}>
        <View
          style={[
            styles.container,
            {
              pointerEvents: isReadonly ? "none" : "auto",
            },
          ]}>
          {/* Numeros */}
          <View style={styles.numbers}>
            <NumbersInput numeros={jugada.numeros} update={onNumbersUpdated} />
          </View>

          <View style={styles.dineroContainer}>
            {/* Parle&Centenas */}
            {type !== "BOLA" && (
              <View style={styles.parlCentContainer}>
                <Text style={styles.parlCentText}>{type === "PARLE" ? "Parle" : "Centena"}</Text>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currency}>$</Text>
                  <TextInput
                    style={styles.currency}
                    placeholder="0.00"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const userInput = parseFloat(text);
                      jugada.dinero_parlcent = !isNaN(userInput) ? userInput : 0;
                      // update(jugada);
                    }}
                    onBlur={() => update(jugada)}
                    blurOnSubmit={true}>
                    {jugada.dinero_parlcent > 0 ? jugada.dinero_parlcent : ""}
                  </TextInput>
                </View>
              </View>
            )}
            {/* Fijos&Corridos */}
            {type === "BOLA" && (
              <View style={styles.fijoCorrContainer}>
                <View style={styles.fijoContainer}>
                  <Text style={styles.fijoText}>Fijo</Text>
                  <View style={styles.currencyContainer}>
                    <Text style={styles.currency}>$</Text>
                    <TextInput
                      style={styles.currency}
                      placeholder="0.00"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        const userInput = parseFloat(text);
                        jugada.dinero_fijo = !isNaN(userInput) ? userInput : 0;
                        // update(jugada);
                      }}
                      onBlur={() => update(jugada)}
                      blurOnSubmit={true}>
                      {jugada.dinero_fijo > 0 ? jugada.dinero_fijo : ""}
                    </TextInput>
                  </View>
                </View>
                <View style={styles.corrContainer}>
                  <Text style={styles.corrText}>Corrido</Text>
                  <View style={styles.currencyContainer}>
                    <Text style={styles.currency}>$</Text>
                    <TextInput
                      style={styles.currency}
                      placeholder="0.00"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        const userInput = parseFloat(text);
                        jugada.dinero_corrido = !isNaN(userInput) ? userInput : 0;
                        // update(jugada);
                      }}
                      onBlur={() => update(jugada)}
                      blurOnSubmit={true}>
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
              // update(jugada);
            }}
            onBlur={() => update(jugada)}
            blurOnSubmit={true}>
            {jugada.jugador}
          </TextInput>
        </View>
        {/* Borrar */}
        <View
          style={[
            styles.deleteContainer,
            {
              opacity: toggleDel ? 100 : 0,
              pointerEvents: toggleDel ? "auto" : "none",
            },
          ]}>
          <Button
            disabled={isReadonly}
            title="borrar"
            onPress={() => {
              deleteJugada(jugada.id);
              console.log("borra");
              setToggleDel(false);
            }}></Button>
        </View>
      </Pressable>
    );
  },
  (prev, next) => prev.visible === next.visible,
);

const styles = StyleSheet.create({
  parent: {
    minHeight: 60,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    marginBottom: 2,
  },
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  parlCentContainer: { alignItems: "center" },
  fijoCorrContainer: {
    width: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fijoContainer: { alignItems: "center" },
  corrContainer: { alignItems: "center" },
  parlCentText: { fontSize: 12, color: "gray" },
  corrText: { fontSize: 12, color: "gray" },
  fijoText: { fontSize: 12, color: "gray" },
  premio: {
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
  dineroContainer: { flexDirection: "row", flexGrow: 1 },
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
  deleteContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default JugadaButton;
