/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StatusBar, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { DatabaseContext } from "../context/DatabaseContext";
import getDrawIdFromDate from "../libs/datetime-parser";
import { getData } from "../libs/jsonblob-api";
import { MARGIN_TOP } from "../constants";
import ListEditor from "../components/list_editor/ListEditor";
import Share from "../components/Share";
import ListDraws from "../components/ListDraws";
import { setToStorage } from "../libs/asyncstorage-handler";

const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const [lista, setLista] = useState(database.lista);
  const [loadingShare, setLoadingShare] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (database.lista && JSON.stringify(database.lista) !== "{}") {
      setToStorage("list", database.lista);
      setLista({ ...database.lista });
    }
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
      <ListEditor lista={lista} updated={updateDatabase} />
      {/* TODO: Convertir loadings en modal */}
      {(loadingShare || updating) && (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}>
          <ActivityIndicator />
          <Text style={{ fontWeight: "medium", fontSize: 18 }}>
            {loadingShare ? "Enviando listado..." : "Actualizando premios"}
          </Text>
        </View>
      )}
      <View
        style={{
          backgroundColor: "#CB3A60",
          minHeight: 50,
          // height: 50,
          // alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}>
        {JSON.stringify(lista.draw) === "{}" ? (
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <View style={{ width: 25 }}></View>
            <Share list={database.lista} loading={loadingShare} setLoading={setLoadingShare} />
            <TouchableOpacity
              onPress={() => {
                if (updating) return;
                setUpdating(true);
                getData().then((res) => {
                  if (Array.isArray(res)) {
                    const list = res.find((l) => l.id === lista.id);
                    // En caso de que la lista actual haya sido modificada despues de la version en el blob, sera sobreescrita al actualizar
                    // Por eso añado una condicion para que solo sobreescriba si la version blob tiene el valor draw asignado
                    if (list === undefined || JSON.stringify(list) === "{}") {
                      setUpdating(false);
                      Alert.alert("No se encontro esta lista en el servidor");
                      return;
                    }
                    if (JSON.stringify(list.draw) === "{}") {
                      setUpdating(false);
                      Alert.alert("Las tiradas no han sido actualizadas");
                      return;
                    }
                    setDatabase({ ...database, lista: { ...list } });
                  }
                  setUpdating(false);
                });
              }}>
              <FontAwesome name="refresh" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <ListDraws lista={lista} />
        )}
      </View>
    </View>
  );
};

export default ListadoItem;
