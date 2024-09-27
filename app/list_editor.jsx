/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { View, Button, FlatList, Alert } from 'react-native';

import Jugada from './classes/Jugada';
import { shareListado } from './libs/jsonblob-api';
import ListEditorHeader from './components/ListEditorHeader';
import JugadaButton from './components/JugadaButton';
import Filters from './components/Filters';
// import { getFromStorage } from './libs/asyncstorage-handler';
import { DatabaseContext } from './context/DatabaseContext';
import Constants from 'expo-constants';
import { getDrawType } from './libs/datetime-parser';
import { router } from 'expo-router';


const ListadoItem = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const list = database;

  const [jugadas, setJugadas] = useState(list.jugadas);
  const [filter, setFilter] = useState('BOLA');
  const [filterJugadas, setFilterJugadas] = useState([]);
  const [saldo, setSaldo] = useState(list.saldo);

  const updateJugada = (jugada) => {
    // checkear aqui si esta en horario
    if (getDrawType() === '') {
      Alert.alert("No se puede editar el listado")
      //TODO: add key sended a listado para en caso de no haber sido enviada aun mostrar un modal preguntando si desea enviarla al admin antes de borrar
      router.replace('./selector')
    }

    const index = jugadas.findIndex((item) => item.id === jugada.id);
    if (index !== -1) {
      const updatedJugadas = jugadas.toSpliced(index, 1, jugada);

      //Actualizar DB
      list.jugadas = [...updatedJugadas];
      //   const listIndex = database.findIndex(item => item.id === list.id)
      //   const updatedDB = database.toSpliced(listIndex,1,list)
      setDatabase({...list})
      setJugadas([...updatedJugadas]);
    }
  };

  //Actualizar saldo
  useEffect(() => {
    let fijoCorridoBruto = 0.0;
    let fijoCorridoLimpio = 0.0;
    let parlBruto = 0.0;
    let parlLimpio = 0.0;
    let centBruto = 0.0;
    let centLimpio = 0.0;
    let totalBruto = 0.0;
    let totalLimpio = 0.0;

    jugadas.forEach((jgd) => {
      const { dinero_fijo, dinero_corrido, dinero_parlcent } = jgd;

      fijoCorridoBruto += dinero_fijo + dinero_corrido;
      fijoCorridoLimpio = fijoCorridoBruto * 0.8;
      if (jgd.type === 'PARLE') {
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
      FijosCorridos: { bruto: fijoCorridoBruto, limpio: fijoCorridoLimpio },
      Parles: { bruto: parlBruto, limpio: parlLimpio },
      Centenas: { bruto: centBruto, limpio: centLimpio },
      Total: { bruto: totalBruto, limpio: totalLimpio },
    };
    list.saldo = { ...newSaldo };
    setSaldo({ ...newSaldo });
  }, [jugadas]);

  // Filtrar jugadas
  useEffect(() => {
    const filtered = jugadas.filter((jgd) => jgd.type === filter);
    setFilterJugadas([...filtered]);
  }, [jugadas, filter]);

  // TODO: codigo de update jugada duplicado
  const onDeleteJugada = (jugadaId) => {
    const index = jugadas.findIndex((item) => item.id === jugadaId);
    if (index !== -1) {
      const updatedJugadas = jugadas.toSpliced(index, 1);

      //Actualizar DB
      list.jugadas = [...updatedJugadas]
      //   const listIndex = database.findIndex(item => item.id === list.id)
      //   const updatedDB = database.toSpliced(listIndex,1,list)
      setDatabase({...list})
      setJugadas([...updatedJugadas]);
    }
  };

  return (
    <View style={{ flexGrow: 1, marginTop:Constants.statusBarHeight }}>
      <ListEditorHeader {...saldo} />
      <Filters filter={filter} setFilter={setFilter} />
      <View style={{ flexGrow: 1 }}>
        <Button
          title="Añadir jugada"
          onPress={() => {
            const nJugada = new Jugada(filter);
            setJugadas([nJugada, ...jugadas]);
          }}></Button>
        <FlatList
          data={filterJugadas}
          renderItem={({ item }) => (
            <JugadaButton jugada={item} update={updateJugada} deleteJugada={onDeleteJugada} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Button
        title="Enviar"
        onPress={() => {
          // TODO: show confirm modal
          shareListado(list);
        }}></Button>
    </View>
  );
};

export default ListadoItem;
