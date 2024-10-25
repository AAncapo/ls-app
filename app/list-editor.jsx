/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StatusBar, ActivityIndicator, Text } from "react-native";
// import { router } from "expo-router";

import ListEditor from "../components/list_editor/ListEditor";
import Share from "../components/Share";
import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import { MARGIN_TOP } from "../constants";

const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const [lista, setLista] = useState(database.lista);
  const [loadingShare, setLoadingShare] = useState(false);

  useEffect(() => {
    setLista(database.lista);
  }, [database]);

  const updateDatabase = (ls) => {
    if (getDrawIdFromDate() !== ls.drawId) {
      Alert.alert("No se puede editar el listado");
      return;
    }
    setDatabase({ ...database, lista: { ...ls } });
  };

  return (
    <View style={{ flex: 1, marginTop: MARGIN_TOP, marginBottom: 0 }}>
      <StatusBar barStyle="auto" backgroundColor={"#015953"}></StatusBar>
      {lista && <ListEditor lista={lista} updated={updateDatabase} />}
      {loadingShare && (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}>
          <ActivityIndicator />
          <Text>Enviando listado...</Text>
        </View>
      )}
      <Share list={lista} loading={loadingShare} setLoading={setLoadingShare} />
    </View>
  );
};

export default ListadoItem;
