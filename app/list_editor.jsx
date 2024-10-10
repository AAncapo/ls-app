/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { View, Alert, StatusBar } from "react-native";
import { router } from "expo-router";

import ListEditor from "./components/list_editor/ListEditor";
import Share from "./components/Share";
import { DatabaseContext } from "./context/DatabaseContext";
import getDrawIdFromDate from "./libs/datetime-parser";
import { removeFromStorage } from "./libs/asyncstorage-handler";
import { MARGIN_TOP } from "./constants";

const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const list = database;

  useEffect(() => {
    if (database !== null && getDrawIdFromDate() !== database.drawId) {
      console.log("db null");
      setDatabase(null);
      removeFromStorage("list");
      router.replace("./selector");
    }
  }, []);

  const updateDatabase = (ls) => {
    // checkear aqui si esta en horario
    //TODO: add key sended a listado para en caso de no haber sido enviada aun mostrar un modal preguntando si desea enviarla al admin antes de borrar
    if (getDrawIdFromDate().split("-")[0] === "") {
      Alert.alert("No se puede editar el listado");
      router.replace("./selector");
      return;
    }
    // La db del listero por ahora es solo la lista
    setDatabase({ ...ls });
  };

  return (
    <View style={{ marginTop: MARGIN_TOP, flex: 1 }}>
      <StatusBar style="light"></StatusBar>
      <ListEditor lista={list} updated={updateDatabase} />
      <Share {...list} />
    </View>
  );
};

export default ListadoItem;
