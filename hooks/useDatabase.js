import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import { setToStorage } from "../libs/asyncstorage-handler";
import getDrawIdFromDate from "../libs/datetime-parser";
import { Alert } from "react-native";

export default function useDatabase() {
  const { database, setDatabase } = useContext(DatabaseContext);

  const updateDatabase = (key, value) => {
    setDatabase({ ...database, [key]: value });
    setToStorage("data", database);
  };

  const updateList = (list) => {
    // if (false) {
    if (getDrawIdFromDate() !== list.drawId) {
      Alert.alert("No se puede editar el listado");
      return;
    }
    updateDatabase("lista", { ...list });
  };

  return { database, updateDatabase, updateList };
}
