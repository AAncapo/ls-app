import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { toCurrency } from "../libs/utils";

const ListDraws = ({ lista }) => {
  return (
    <View style={styles.container}>
      <View style={styles.saldoContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Limpio</Text>
          <Text style={styles.saldoText}>{toCurrency(lista.saldo.Total.limpio)}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Premio</Text>
          <Text style={styles.saldoText}>{toCurrency(lista.premioTotal)}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>G/P</Text>
          <Text style={styles.saldoText}>
            {toCurrency(lista.saldo.Total.limpio - lista.premioTotal)}
          </Text>
        </View>
      </View>
      <View style={styles.drawsContainer}>
        {/* Centena */}
        <View style={styles.resultContainer}>
          <Text style={styles.drawTitle}>Centena</Text>
          <Text
            style={[
              styles.resultNumber,
              { width: 30, height: 30, borderRadius: 15, fontSize: 12 },
            ]}>
            {lista.draw.results.Centena}
          </Text>
        </View>
        {/* Fijo */}
        <View style={styles.resultContainer}>
          <Text style={styles.drawTitle}>Fijo</Text>
          <Text style={styles.resultNumber}>{lista.draw.results.Fijo}</Text>
        </View>
        {/* Corrido */}
        <View style={styles.resultContainer}>
          <Text style={styles.drawTitle}>Corrido</Text>
          <View style={{ gap: 2 }}>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Corrido[0]}`}</Text>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Corrido[1]}`}</Text>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Corrido[2]}`}</Text>
          </View>
        </View>
        {/* Parle */}
        <View style={styles.resultContainer}>
          <Text style={styles.drawTitle}>Parle</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[0][0]}`}</Text>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[0][1]}`}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[1][0]}`}</Text>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[1][1]}`}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[2][0]}`}</Text>
            <Text style={styles.resultNumber}>{`${lista.draw.results.Parle[2][1]}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListDraws;

const styles = StyleSheet.create({
  container: { justifyContent: "center", padding: 10, gap: 5 },
  drawsContainer: { flexDirection: "row", justifyContent: "center", gap: 20 },
  drawTitle: { color: "white", fontWeight: "bold", fontSize: 15, letterSpacing: 1 },
  resultContainer: { alignItems: "center", gap: 5 },
  resultNumber: {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 15,
    textAlign: "center",
    textAlignVertical: "center",
  },
  saldoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  saldoText: { fontWeight: "bold", fontSize: 15, color: "white" },
});
