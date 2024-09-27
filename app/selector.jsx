/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Alert, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'

import DATA from './constants'
import Listado from './classes/Listado'
import { DatabaseContext } from './context/DatabaseContext'
import { getDrawType } from './libs/datetime-parser'
import { setToStorage, getFromStorage, removeFromStorage } from './libs/asyncstorage-handler'


const Selector = () => {
  const {database, setDatabase} = useContext(DatabaseContext)
  // const [list, setList] = useState(null)

  useEffect(() => {
    if (getDrawType() === '') { // ver si puede editar/crear listas
      Alert.alert("No puede crear listas en este momento")
      removeFromStorage('list') // borra current list en storage porsiacaso
      //TODO: add key sended a listado para en caso de no haber sido enviada aun mostrar un modal preguntando si desea enviarla al admin antes de borrar
    } else {
      // ver si ya hay una lista guardada
      getFromStorage('list').then(res => {
        if (res !== null) {
          setDatabase({...res}) // asignar lista en storage a la db si existe
          // trigger useEffect escuchando a la db y enruta al editor ;)
        } // no hacer nada si no existe lista en storage
      })
    }
  }, [])

  useEffect(() => {
    // save to storage
    if (database !== null) {
      setToStorage('list',database)
      console.log("database updated and saved")
    }
  }, [database])

  const handleButtonPress = () => {
    // el boton permanece disabled mientras no puede editar
    if (database !== null) {
      router.push('/list_editor')
    } else {
      const listado = new Listado(DATA.USER_ID)
      setDatabase({...listado}) // esto deberia actualizar el title del boton a 'editar listado'
    }
  }
   
  return (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Button
      disabled={getDrawType()!==''?false:true} 
      title={database !== null?'editar listado':'crear listado'} 
      onPress={() => {
        handleButtonPress()
        // if (getDrawType() !== '') {
        //   if (list === null) {
        //     const newListado = new Listado(DATA.USER_ID)
        //     setList({...newListado})
        //   } else {
        //     router.push('/list_editor')
        //   }
        // } else {
        //   // mostrar alert si esta fuera de horario
        //   Alert.alert("No puede crear listas en este momento")
        // }
      }}></Button>
    </View>
  )
}

export default Selector
