import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFromStorage = async (key) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  } catch (e) {
    console.log("Error cargando lista: ", e);
  }
};

export const setToStorage = async (key, data) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log("Error guardando lista: ", e);
  }
};

export const removeFromStorage = async (key) => {
  try {
    const res = await AsyncStorage.removeItem(key);
    return res;
  } catch (error) {
    console.log("Error intentando borrar list del storage ", error);
  }
};
