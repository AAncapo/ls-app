/* eslint-disable react-hooks/exhaustive-deps */
import { Button, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router } from "expo-router";

import Listado from "../classes/Listado";
import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import { getFromStorage, removeFromStorage, updateSession } from "../libs/asyncstorage-handler";
import CustomModal from "../components/CustomModal";

const Selector = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const [allowView, setAllowView] = useState();
  const [allowCreate, setAllowCreate] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getFromStorage("list").then((res) => {
      setDatabase({ ...database, lista: res !== null ? { ...res } : null });
    });
  }, []);

  useEffect(() => {
    setAllowView(database.lista);
    setAllowCreate(getDrawIdFromDate() !== database.lista?.drawId);
  }, [database]);

  const openEditor = () => router.push("/list-editor");

  const createList = () => {
    removeFromStorage("list");
    const listado = new Listado(database.user);
    setDatabase({ ...database, lista: { ...listado } });
  };

  const modalConfirm = () => createList();

  const modalClose = () => setModalVisible(false);

  return (
    <>
      <CustomModal
        title={"Eliminar listado actual y crear uno nuevo?"}
        visible={modalVisible}
        confirm={modalConfirm}
        close={modalClose}
      />
      <View style={styles.container}>
        <Button disabled={!allowView} title={"ver listado"} onPress={openEditor} />
        <Button
          disabled={!allowCreate}
          title="crear listado"
          onPress={() => setModalVisible(true)}
        />
        <Link
          href={"/"}
          onPress={() => {
            updateSession(database.user, "false");
          }}
          style={{ padding: 20 }}>
          Cambiar pin
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
});

export default Selector;
