/* eslint-disable react-hooks/exhaustive-deps */
import { View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";

import useList from "../../hooks/useList";
import ListEditorHeader from "./ListEditorHeader";
import Filters from "./Filters";
import JugadaButton from "./JugadaButton";
import StyledButton from "../StyledButton";
import getDrawIdFromDate from "../../libs/datetime-parser";
// import Test from "../test";

const ListEditor = () => {
  const { list, addJugada, updateJugada, deleteJugada } = useList();
  const [filter, setFilter] = useState("BOLA");

  const handleAddPress = () => addJugada(filter);

  const jugadas = list.jugadas.filter((j) => j.type === filter);

  // console.log(jugadas.length);
  // console.log("ListEditor");
  return (
    <View style={{ flex: 1 }}>
      <ListEditorHeader saldo={list.saldo} />
      <Filters filter={filter} setFilter={setFilter} />
      <StyledButton
        text={"AÑADIR JUGADA"}
        handlePress={handleAddPress}
        // enabled={true}
        enabled={getDrawIdFromDate() === list.drawId}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={jugadas}
          renderItem={({ item }) => (
            <JugadaButton
              // jugada={item}
              type={item.type}
              numeros={item.numeros}
              dinero_fijo={item.dinero_fijo}
              dinero_corrido={item.dinero_corrido}
              dinero_parlcent={item.dinero_parlcent}
              premio={item.premio}
              jugador={item.jugador}
              update={updateJugada}
              deleteJugada={deleteJugada}
              // isReadonly={false}
              isReadonly={getDrawIdFromDate() !== list.drawId}
              visible={item.type === filter}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </View>
    </View>
  );
};

export default ListEditor;
