/* eslint-disable react-hooks/exhaustive-deps */
import { Button, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";

import Listado from "../classes/Listado";
import getDrawIdFromDate from "../libs/datetime-parser";
import CustomModal from "../components/CustomModal";
import useDatabase from "../hooks/useDatabase";

const Selector = () => {
  const { database, updateDatabase } = useDatabase();
  const [allowView, setAllowView] = useState();
  const [allowCreate, setAllowCreate] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setAllowView(database.lista !== null);
    setAllowCreate(getDrawIdFromDate() !== database.lista?.drawId);
  }, [database]);

  const openEditor = () => router.push("/list-editor");

  const createList = () => {
    const listado = new Listado(database.session.user);
    updateDatabase("lista", { ...listado });
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
          onPress={() => updateDatabase("session", { ...database.session, active: false })}
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
