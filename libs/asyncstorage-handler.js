import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSession = async () => {
  try {
    const session = await AsyncStorage.getItem("session");
    if (session !== null) {
      //check if data exists

      if (JSON.parse(session).active === "true") {
        // Entrar directamente
        console.log("Sesion recuperada");
        return JSON.parse(session);
      }
    } else {
      // set item session
      console.log("Session not found");
      const SessionData = JSON.stringify({ user: "", active: "false" });
      AsyncStorage.setItem("session", SessionData).then(() => {
        console.log("Creado nuevo archivo session");
      });
    }
    return session;
  } catch (error) {
    console.log("Error en getSession: ", error);
  }
};

export const updateSession = async (username, val) => {
  try {
    const SessionData = JSON.stringify({ user: username, active: val });
    AsyncStorage.setItem("session", SessionData);
    console.log(val === "true" ? "Nueva sesion iniciada" : "sesion cerrada");
  } catch (error) {
    console.log("ERROR intentando cambiar el valor de session a 'true'/'false' :", error);
  }
};

export const saveListados = async (listados) => {
  try {
    const data = JSON.stringify(listados);
    await AsyncStorage.setItem("listados", data).then(() => {
      console.log("Listas guardadas");
    });
  } catch (error) {
    console.log("Error al intentar cargar listados :", error);
  }
};

export const loadListados = async () => {
  try {
    const data = await AsyncStorage.getItem("listados");
    if (data !== null) {
      const listados = JSON.parse(data);
      console.log("Listados importados: ", listados.length);
      return listados;
    }

    console.log("Listados not found. Returned []");
    return [];
  } catch (e) {
    console.log("Listados no pudieron cargar. ", e);
  }
};

export const saveDraws = async (draws) => {
  try {
    const data = JSON.stringify(draws);
    await AsyncStorage.setItem("resultados", data).then(console.log("Resultados guardados!"));
  } catch (e) {
    console.log("ERROR: Draws no pudieron guardarse!", e);
  }
};

export const loadDraws = async () => {
  try {
    let draws = [];
    const data = await AsyncStorage.getItem("resultados");
    if (data !== null) draws = JSON.parse(data);
    return draws;
  } catch (e) {
    console.log("Resultados no pudieron cargar correctamente. ", e);
  }
};

export const getFromStorage = async (key) => {
  // returns a JSON
  let data = null;
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw !== null) data = JSON.parse(raw);
  } catch (e) {
    console.log("Error cargando lista: ", e);
  } finally {
    return data;
  }
};

export const setToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
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