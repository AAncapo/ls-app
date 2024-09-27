/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const toCurrency = (val) => {
  // eslint-disable-next-line no-undef
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

const JugadaButton = ({ jugada, update, deleteJugada }) => {
  const [toggleDel, setToggleDel] = useState(false);
  const [_nums, setNums] = useState(jugada.numeros);
  const [dineroFijo, setDineroFijo] = useState(jugada.dinero_fijo);
  const [dineroCorrido, setDineroCorrido] = useState(jugada.dinero_corrido);
  const [dineroParlcent, setDineroParlcent] = useState(jugada.dinero_parlcent);
  const [jugador, setJugador] = useState(jugada.jugador);

  useEffect(() => {
    jugada.dinero_fijo = dineroFijo;
    jugada.dinero_corrido = dineroCorrido;
    jugada.dinero_parlcent = dineroParlcent;
    jugada.numeros = [..._nums];
    jugada.jugador = jugador;
    update(jugada);
  }, [_nums, dineroFijo, dineroCorrido, dineroParlcent, jugador]);

  const type = jugada.type;

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
          <TextInput
            keyboardType="numeric"
            onEndEditing={(e) => {
              const numsInput = e.nativeEvent.text.split(/[\s,._\\-\\;]/);
              let nums = [];
              numsInput.forEach((n) => {
                if (!isNaN(parseInt(n))) nums.push(parseInt(n));
              });
              setNums([...nums]);
            }}>
            {_nums.join(" ")}
          </TextInput>
        </View>

        <View style={{ flexDirection: "row", flexGrow: 1 }}>
          {/* Parle&Centenas */}
          <View
            style={{
              opacity: type !== "BOLA" ? 100 : 0,
              pointerEvents: type !== "BOLA" ? "auto" : "none",
              width: type !== "BOLA" ? 30 : 0,
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}>
            <Text>$</Text>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              onEndEditing={(e) => {
                const userInput = parseFloat(e.nativeEvent.text);
                if (!isNaN(userInput)) setDineroParlcent(userInput);
              }}>
              {dineroParlcent > 0 ? dineroParlcent : ""}
            </TextInput>
          </View>
          {/* Fijos&Coridos */}
          <View
            style={{
              opacity: type === "BOLA" ? 100 : 0,
              pointerEvents: type === "BOLA" ? "auto" : "none",
              width: type === "BOLA" ? 30 : 0,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}>
            <View style={styles.currency}>
              <Text>$</Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                onEndEditing={(e) => {
                  const userInput = parseFloat(e.nativeEvent.text);
                  if (!isNaN(userInput)) setDineroFijo(userInput);
                }}>
                {dineroFijo > 0 ? dineroFijo : ""}
              </TextInput>
            </View>
            <View style={styles.currency}>
              <Text>$</Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                onEndEditing={(e) => {
                  const userInput = parseFloat(e.nativeEvent.text);
                  if (!isNaN(userInput)) setDineroCorrido(userInput);
                }}>
                {dineroCorrido > 0 ? dineroCorrido : ""}
              </TextInput>
            </View>
          </View>
        </View>
        {/* Premio */}
        <View>
          <Text>Premio</Text>
          <Text>{jugada.premio > 0 ? `${toCurrency(jugada.premio)}` : "--"}</Text>
        </View>
        {/* Jugador */}
        <TextInput
          placeholder="jugador"
          onEndEditing={(e) => {
            const userInput = e.nativeEvent.text;
            setJugador(userInput);
          }}>
          {jugador}
        </TextInput>
      </View>
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
  currency: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  numbers: {
    flexGrow: 1,
  },
  delete_text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default JugadaButton;
