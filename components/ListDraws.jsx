import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ListDraws = ({ draw }) => {
  return !draw ? (
    <View style={{ justifyContent: "center", alignItems: "center", height: 30 }}>
      <Text>Actualizar resultados</Text>
    </View>
  ) : (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}>
      {/* Centena */}
      <View style={styles.resultContainer}>
        <Text>Centena</Text>
        <Text
          style={[styles.resultNumber, { width: 45, height: 45, borderRadius: 25, fontSize: 22 }]}>
          {draw.results.Centena}
        </Text>
      </View>
      {/* Fijo */}
      <View style={styles.resultContainer}>
        <Text>Fijo</Text>
        <Text style={styles.resultNumber}>{draw.results.Fijo}</Text>
      </View>
      {/* Corrido */}
      <View style={styles.resultContainer}>
        <Text>Corrido</Text>
        <View style={{ gap: 2 }}>
          <Text style={styles.resultNumber}>{`${draw.results.Corrido[0]}`}</Text>
          <Text style={styles.resultNumber}>{`${draw.results.Corrido[1]}`}</Text>
          <Text style={styles.resultNumber}>{`${draw.results.Corrido[2]}`}</Text>
        </View>
      </View>
      {/* Parle */}
      <View style={styles.resultContainer}>
        <Text>Parle</Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[0][0]}`}</Text>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[0][1]}`}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[1][0]}`}</Text>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[1][1]}`}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[2][0]}`}</Text>
          <Text style={styles.resultNumber}>{`${draw.results.Parle[2][1]}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListDraws;

const styles = StyleSheet.create({});
