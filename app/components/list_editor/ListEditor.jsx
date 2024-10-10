import { View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import useList from "../../hooks/useList";
import ListEditorHeader from "./ListEditorHeader";
import Filters from "./Filters";
import JugadaButton from "./JugadaButton";
import StyledButton from "../StyledButton";

const ListEditor = ({ lista, updated }) => {
  const { list, saldo, addJugada, updateJugada, deleteJugada } = useList(lista);
  const [filter, setFilter] = useState("BOLA");
  const [jugadas, setJugadas] = useState(list.jugadas.filter((jgd) => jgd.type === filter));

  useEffect(() => {
    //TODO: evitar q actualice al montar componente
    updated(list);
  }, [list]);

  //Actualizar y filtrar jugadas
  useEffect(() => {
    setJugadas(list.jugadas.filter((jgd) => jgd.type === filter));
  }, [list, filter]);

  const handleAddPress = () => addJugada(filter);

  return (
    <View style={{ flexGrow: 1 }}>
      <ListEditorHeader {...saldo} />
      <Filters filter={filter} setFilter={setFilter} />
      <View style={{ flexGrow: 1 }}>
        <StyledButton text={"AÑADIR JUGADA"} handlePress={handleAddPress} />
        <FlatList
          data={jugadas}
          renderItem={({ item }) => (
            <JugadaButton jugada={item} update={updateJugada} deleteJugada={deleteJugada} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ListEditor;
