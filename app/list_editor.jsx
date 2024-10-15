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
  const list = database.lista;

  useEffect(() => {
    if (JSON.stringify(list) !== "{}" && getDrawIdFromDate() !== list.drawId) {
      console.log("not authorized to edit -> back to selector");
      setDatabase({ ...database, lista: { ...{} } });
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
    setDatabase({ ...database, lista: { ...ls } });
  };

  return (
    <View style={{ flex: 1, marginTop: MARGIN_TOP, marginBottom: 0 }}>
      <StatusBar barStyle="auto" backgroundColor={"#015953"}></StatusBar>
      <ListEditor lista={list} updated={updateDatabase} />
      <Share {...list} />
    </View>
  );
};

export default ListadoItem;
