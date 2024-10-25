/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StatusBar, ActivityIndicator, Text } from "react-native";
// import { router } from "expo-router";

import ListEditor from "../components/list_editor/ListEditor";
import Share from "../components/Share";
import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import { removeFromStorage } from "../libs/asyncstorage-handler";
import { MARGIN_TOP } from "../constants";

const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const [lista, setLista] = useState(database.lista);
  const [loadingShare, setLoadingShare] = useState(false);

  useEffect(() => {
    setLista(database.lista);
  }, [database]);

  //Verificar si debe eliminar lista existente y crear una nueva
  useEffect(() => {
    if (JSON.stringify(database.lista) !== "{}") {
      const currentDrawId = getDrawIdFromDate();
      if (currentDrawId.split("-")[0] !== "" && currentDrawId !== database.lista.drawId) {
        //Si el drawId == '' esta fuera de cualquier horario, normalmente despues del horario de escritura del dia y antes de la tarde. A esa hora todavia no debe borrarse, solo cuando inicia el siguiente horario
        // tambien significa que la lista (noche) va a seguir visible hasta que inicie el horario del dia siguiente
        removeFromStorage("list").then(() => {
          alert("Listado anterior eliminado");
          setDatabase({ ...database, lista: { ...{} } });
        });
      }
    }
  }, []);

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
      <ListEditor lista={lista} updated={updateDatabase} />
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
