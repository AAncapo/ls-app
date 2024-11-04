import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getData } from "../libs/jsonblob-api";
import ListDraws from "./ListDraws";
import useDatabase from "../hooks/useDatabase";
import Share from "./Share";

export default function Footer() {
  const { database, updateDatabase } = useDatabase();
  const [loadingShare, setLoadingShare] = useState(false);
  const [updating, setUpdating] = useState(false);
  return (
    <>
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
          justifyContent: "center",
          paddingHorizontal: 20,
        }}>
        {JSON.stringify(database.lista.draw) === "{}" ? (
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
                    const list = res.find((l) => l.id === database.lista.id);
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
                    updateDatabase("lista", { ...list });
                  }
                  setUpdating(false);
                });
              }}>
              <FontAwesome name="refresh" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <ListDraws lista={database.lista} />
        )}
      </View>
    </>
  );
}
