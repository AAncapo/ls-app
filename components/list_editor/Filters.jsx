import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Filters = ({ filter, setFilter }) => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        onPress={() => {
          setFilter("BOLA");
        }}>
        <Text
          style={[
            {
              borderBottomWidth: filter === "BOLA" ? 6 : 0,
            },
            styles.filterText,
          ]}>
          BOLA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilter("PARLE");
        }}>
        <Text
          style={[
            {
              borderBottomWidth: filter === "PARLE" ? 6 : 0,
            },
            styles.filterText,
          ]}>
          PARLE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilter("CENT");
        }}>
        <Text
          style={[
            {
              borderBottomWidth: filter === "CENT" ? 6 : 0,
            },
            styles.filterText,
          ]}>
          CENT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filters: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#015953",
  },
  filterText: {
    backgroundColor: "#015953",
    borderBottomColor: "white",
    color: "white",
    minHeight: 50,
    fontSize: 15,
    fontWeight: "bold",
    minWidth: 100,
    textAlign: "center",
    textAlignVertical: "center",
  },
  filterButton: {
    backgroundColor: "#015953",
    // color: "white",
    minHeight: 50,
    fontSize: 15,
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
  },
});
