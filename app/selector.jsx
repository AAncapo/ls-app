/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Alert, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, router } from "expo-router";

import Listado from "../classes/Listado";
import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import { setToStorage, getFromStorage, removeFromStorage } from "../libs/asyncstorage-handler";

const Selector = () => {
  const { database, setDatabase } = useContext(DatabaseContext);

  useEffect(() => {
    if (getDrawIdFromDate().split("-")[0] === "") {
      // ver si puede editar/crear listas
      Alert.alert("No puede crear listas en este momento");
      removeFromStorage("list"); // borra current list en storage porsiacaso
      //TODO: add key sended a listado para en caso de no haber sido enviada aun mostrar un modal preguntando si desea enviarla al admin antes de borrar
    } else {
      // ver si ya hay una lista guardada
      getFromStorage("list").then((res) => {
        console.log(res);
        if (res !== null) {
          setDatabase({ ...database, lista: { ...res } }); // asignar lista en storage a la db si existe
          // trigger useEffect escuchando a la db y enruta al editor ;)
        } // no hacer nada si no existe lista en storage
      });
    }
  }, []);

  useEffect(() => {
    // save to storage
    setToStorage("list", database.lista);
    console.log("database updated and saved");
  }, [database]);

  const handleButtonPress = () => {
    // el boton permanece disabled mientras no puede editar
    if (hasListado()) {
      router.push("/list_editor");
    } else {
      const listado = new Listado(database.user);
      setDatabase({ ...database, lista: { ...listado } }); // esto deberia actualizar el title del boton a 'editar listado'
    }
  };

  const hasListado = () => JSON.stringify(database.lista) !== "{}";

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}>
      <Button
        disabled={getDrawIdFromDate() !== "" || !hasListado() ? false : true}
        title={hasListado() ? "editar listado" : "crear listado"}
        onPress={() => {
          handleButtonPress();
        }}></Button>
      <Link href={"/"} style={{ padding: 20 }}>
        Cambiar pin
      </Link>
    </View>
  );
};

export default Selector;
