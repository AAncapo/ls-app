import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { toCurrency } from "../../libs/utils";

const ListEditorHeader = (saldo) => {
  return (
    <View
      style={{
        // flex: 1,
        height: 80,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-around",
        backgroundColor: "#015953",
      }}>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.saldoTextTitle}>Fijo + Corrido</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.FijosCorridos.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.FijosCorridos.limpio)}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.saldoTextTitle}>Parles</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Parles.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Parles.limpio)}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.saldoTextTitle}>Centenas</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Centenas.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Centenas.limpio)}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.saldoTextTitle}>Total</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Total.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Total.limpio)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  saldoTextTitle: {
    fontWeight: "bold",
    color: "white",
  },
  saldoTextNumber: {
    color: "white",
  },
});

export default ListEditorHeader;
