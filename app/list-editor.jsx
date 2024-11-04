/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { View, StatusBar, Alert } from "react-native";

import { MARGIN_TOP } from "../constants";
import ListEditor from "../components/list_editor/ListEditor";
import Footer from "../components/footer";
import useDatabase from "../hooks/useDatabase";
import getDrawIdFromDate from "../libs/datetime-parser";

const ListadoItem = () => {
  // const onUpdated = useCallback(
  //   (list) => {
  //     if (getDrawIdFromDate() !== list.drawId) Alert.alert("No se puede editar el listado");
  //     // if (false) Alert.alert("No se puede editar el listado");
  //     else updateDatabase("lista", { ...list });
  //     console.log("update db");
  //   },
  //   [database.lista],
  // );
  return (
    <View style={{ flex: 1, marginTop: MARGIN_TOP, marginBottom: 0 }}>
      <StatusBar barStyle="auto" backgroundColor={"#015953"}></StatusBar>
      <ListEditor />
      <Footer />
    </View>
  );
};

export default ListadoItem;
