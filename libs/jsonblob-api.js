import { IS_DEVELOPMENT } from "../constants";
import { parseDatetimeToInt } from "./datetime-parser";

const PRODUCTION_URL = "https://jsonblob.com/api/jsonBlob/1285329984779313152";
const DEVELOPMENT_URL = "https://jsonblob.com/api/jsonBlob/1290330915019284480";
const url = IS_DEVELOPMENT ? DEVELOPMENT_URL : PRODUCTION_URL;

const setData = async (data, targetUrl = url) => {
  return await fetch(targetUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
    body: JSON.stringify(data),
  });
};

export const getData = async (targetUrl = url) => {
  let data;
  try {
    data = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      },
    }).then((res) => {
      return res.json();
    });
  } catch (error) {
    console.log("Error intentando recuperar jsonBlob. ", error);
  } finally {
    return data;
  }
};

export const shareListado = async (listToShare) => {
  // Add list to the existent data
  try {
    let data;
    const res = await getData();
    if (res === undefined && Array.isArray(res)) return;

    const index = res.findIndex((ls) => ls.id === listToShare.id);
    if (index !== -1) {
      // Cancelar operacion si listToShare no ha sido modificada
      // (!!!) ESTA EXCEPCION NO SE PUEDE HACER EN ADMIN. Cuando el admin actualiza la lista en el blob con premios y draw no se cambia el valor de lastModified
      if (
        parseDatetimeToInt(res[index].lastModified) >= parseDatetimeToInt(listToShare.lastModified)
      )
        return false;

      data = res.toSpliced(index, 1, listToShare);
    } else {
      data = [...res, listToShare];
    }

    // subir nueva data
    if (data !== undefined) {
      // console.log("data a subir-", data);
      const response = await setData(data);
      if (response.ok) {
        console.log("lista subida");
        return true;
      } else {
        console.log("la data no pudo ser resubida, response: ", response);
        return response;
      }
    }
  } catch (error) {
    console.log("Error compartiendo listado: ", error);
  }
};

export const deleteData = async (ids = []) => {
  try {
    let prevData = await getData();
    prevData = prevData.filter((item) => !ids.includes(item.id));

    //subir datos actualizados
    setData(prevData).then(console.log("JsonBlob actualizado!"));
  } catch (error) {
    console.log("Hubo un error intentando borrar datos de JsonBlob: ", error);
  }
};

export const getUser = async (pin) => {
  const url = "https://jsonblob.com/api/jsonBlob/1295702097050591232";
  const data = await getData(url);
  return data?.find((u) => u.pin === pin);
};
