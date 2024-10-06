/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Alert,
  Modal,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import Constants from "expo-constants";

import { DatabaseContext } from "./context/DatabaseContext";
import getDrawIdFromDate from "./libs/datetime-parser";
import { shareListado } from "./libs/jsonblob-api";
import Jugada from "./classes/Jugada";
import ListEditorHeader from "./components/ListEditorHeader";
import Filters from "./components/Filters";
import JugadaButton from "./components/JugadaButton";
import { getDatetime } from "./libs/datetime-parser";
import { StatusBar } from "expo-status-bar";

const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const list = database;

  const [filter, setFilter] = useState("BOLA");
  const [saldo, setSaldo] = useState(list.saldo);
  const [jugadas, setJugadas] = useState(list.jugadas.filter((jgd) => jgd.type === filter));
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);
  const [shareError, setShareError] = useState("");

  useEffect(() => {
    if (!modalVisible) {
      setShareError("");
    }
  }, [modalVisible]);

  //Actualizar y filtrar jugadas
  useEffect(() => {
    setJugadas(list.jugadas.filter((jgd) => jgd.type === filter));
  }, [database, filter]);

  const updateJugada = (jugada) => {
    // checkear aqui si esta en horario
    if (getDrawIdFromDate().split("-")[0] === "") {
      Alert.alert("No se puede editar el listado");
      //TODO: add key sended a listado para en caso de no haber sido enviada aun mostrar un modal preguntando si desea enviarla al admin antes de borrar
      router.replace("./selector");
      return;
    }

    const index = list.jugadas.findIndex((item) => item.id === jugada.id);
    if (index !== -1) {
      const updatedJugadas = list.jugadas.toSpliced(index, 1, jugada);
      list.jugadas = [...updatedJugadas];

      // Update saldo
      let fijoCorridoBruto = 0.0;
      let fijoCorridoLimpio = 0.0;
      let parlBruto = 0.0;
      let parlLimpio = 0.0;
      let centBruto = 0.0;
      let centLimpio = 0.0;
      let totalBruto = 0.0;
      let totalLimpio = 0.0;

      list.jugadas.forEach((jgd) => {
        const { dinero_fijo, dinero_corrido, dinero_parlcent } = jgd;

        fijoCorridoBruto += dinero_fijo + dinero_corrido;
        fijoCorridoLimpio = fijoCorridoBruto * 0.8;
        if (jgd.type === "PARLE") {
          parlBruto += dinero_parlcent;
          parlLimpio = parlBruto * 0.7;
        } else {
          centBruto += dinero_parlcent;
          centLimpio = centBruto * 0.7;
        }
      });

      totalBruto = fijoCorridoBruto + parlBruto + centBruto;
      totalLimpio = fijoCorridoLimpio + parlLimpio + centLimpio;
      const newSaldo = {
        FijosCorridos: {
          bruto: Math.round(fijoCorridoBruto),
          limpio: Math.round(fijoCorridoLimpio),
        },
        Parles: {
          bruto: Math.round(parlBruto),
          limpio: Math.round(parlLimpio),
        },
        Centenas: {
          bruto: Math.round(centBruto),
          limpio: Math.round(centLimpio),
        },
        Total: {
          bruto: Math.round(totalBruto),
          limpio: Math.round(totalLimpio),
        },
      };
      list.saldo = { ...newSaldo };
      setSaldo({ ...list.saldo });

      // Update Database
      list.lastModified = getDatetime();
      setDatabase({ ...list });
    }
  };

  // TODO: codigo de update jugada duplicado
  const onDeleteJugada = (jugadaId) => {
    const index = list.jugadas.findIndex((item) => item.id === jugadaId);
    if (index !== -1) {
      const updatedJugadas = list.jugadas.toSpliced(index, 1);

      //Actualizar DB
      list.jugadas = [...updatedJugadas];
      list.lastModified = getDatetime();
      setDatabase({ ...list });
    }
  };

  return (
    <View style={{ flexGrow: 1, marginTop: Constants.statusBarHeight }}>
      {/* <StatusBar barStyle='dark-content'/> */}
      <ListEditorHeader {...saldo} />
      <Filters filter={filter} setFilter={setFilter} />
      <View style={{ flexGrow: 1 }}>
        <Button
          title="Añadir jugada"
          onPress={() => {
            const nJugada = new Jugada(filter);
            const updatedJugadas = [nJugada, ...list.jugadas];
            list.jugadas = [...updatedJugadas];
            setDatabase({ ...list });
          }}></Button>
        <FlatList
          data={jugadas}
          renderItem={({ item }) => (
            <JugadaButton jugada={item} update={updateJugada} deleteJugada={onDeleteJugada} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Compartir este listado?</Text>

              {loadingShare && <ActivityIndicator />}
              {shareError !== "" && !loadingShare && (
                <Text style={{ color: "red" }}>{shareError}</Text>
              )}
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    if (!loadingShare) setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>CANCELAR</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    if (loadingShare) return;

                    setLoadingShare(true);
                    shareListado(list).then((res) => {
                      if (res === undefined) {
                        //Mostrar error
                        setShareError(
                          "No se pudo compartir la lista. Compruebe su conexion a internet.",
                        );
                      } else {
                        setModalVisible(!modalVisible);
                      }
                      setLoadingShare(false);
                    });
                  }}>
                  <Text style={styles.textStyle}>CONFIRMAR</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Button
        title="Enviar Lista"
        onPress={() => {
          // TODO: show confirm modal
          // shareListado(list);
          setModalVisible(true);
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#015953",
  },
  filterText: {
    color: "white",
    minHeight: 30,
    fontSize: 15,
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
  },
  filterButton: {
    backgroundColor: "#015953",
    color: "white",
    minHeight: 30,
    fontSize: 15,
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    minWidth: 110,
    backgroundColor: "#2196F3",
  },
});

export default ListadoItem;
