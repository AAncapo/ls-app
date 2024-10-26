/* eslint-disable react-hooks/exhaustive-deps */
import { Button, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, router } from "expo-router";

import Listado from "../classes/Listado";
import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import {
  setToStorage,
  getFromStorage,
  removeFromStorage,
  updateSession,
} from "../libs/asyncstorage-handler";

const Selector = () => {
  const { database, setDatabase } = useContext(DatabaseContext);

  //Verificar si debe eliminar lista existente y crear una nueva
  useEffect(() => {
    const currentDrawId = getDrawIdFromDate();
    if (
      database.lista !== null &&
      currentDrawId.split("-")[0] !== "" &&
      currentDrawId !== database.lista.drawId
    ) {
      //Si el drawId == '' esta fuera de cualquier horario, normalmente despues del horario de escritura del dia y antes de la tarde. A esa hora todavia no debe borrarse, solo cuando inicia el siguiente horario
      // tambien significa que la lista (noche) va a seguir visible hasta que inicie el horario del dia siguiente
      setDatabase({ ...database, lista: null });
      alert("Listado anterior eliminado");
    } else {
      // Permitir crear listado si es null y esta en horario de escritura
      getFromStorage("list").then((res) => {
        if (res !== null) {
          console.log("Cargado listado de local storage");
          setDatabase({ ...database, lista: { ...res } });
        }
      });
    }
  }, []);

  useEffect(() => {
    // Guardar en local al cambiar / eliminar de local si fue borrada (useEffect anterior))
    if (database.lista !== null) setToStorage("list", database.lista);
    else removeFromStorage("list");
  }, [database]);

  const handleButtonPress = () => {
    if (database.lista) {
      router.push("/list-editor");
    } else {
      const listado = new Listado(database.user);
      setDatabase({ ...database, lista: { ...listado } });
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}>
      <Button
        title={database.lista !== null ? "ver listado" : "crear listado"}
        onPress={() => {
          handleButtonPress();
        }}></Button>
      <Link
        href={"/"}
        onPress={() => {
          updateSession(database.user, "false");
        }}
        style={{ padding: 20 }}>
        Cambiar pin
      </Link>
    </View>
  );
};

export default Selector;
