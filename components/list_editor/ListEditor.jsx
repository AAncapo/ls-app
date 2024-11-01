/* eslint-disable react-hooks/exhaustive-deps */
import { View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import useList from "../../hooks/useList";
import ListEditorHeader from "./ListEditorHeader";
import Filters from "./Filters";
import JugadaButton from "./JugadaButton";
import StyledButton from "../StyledButton";
import getDrawIdFromDate from "../../libs/datetime-parser";

const ListEditor = ({ lista, updated }) => {
  const { list, saldo, addJugada, updateJugada, deleteJugada } = useList(lista);
  const [filter, setFilter] = useState("BOLA");

  useEffect(() => {
    updated(list);
  }, [list]);

  const handleAddPress = () => addJugada(filter);

  return (
    <View style={{ flex: 1 }}>
      <ListEditorHeader {...saldo} />
      <Filters filter={filter} setFilter={setFilter} />
      <StyledButton
        text={"AÑADIR JUGADA"}
        handlePress={handleAddPress}
        enabled={getDrawIdFromDate() === list.drawId}
      />
      <View style={{ paddingBottom: 0, flex: 1 }}>
        <FlatList
          data={list.jugadas}
          renderItem={({ item }) => (
            <JugadaButton
              jugada={item}
              update={updateJugada}
              deleteJugada={deleteJugada}
              isReadonly={getDrawIdFromDate() !== list.drawId}
              visible={item.type === filter}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </View>
  );
};

export default ListEditor;
