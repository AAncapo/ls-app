import { IS_DEVELOPMENT } from "../constants";

const PRODUCTION_URL = "https://jsonblob.com/api/jsonBlob/1285329984779313152";
const DEVELOPMENT_URL = "https://jsonblob.com/api/jsonBlob/1290330915019284480";

const setData = async (data) => {
  return await fetch(IS_DEVELOPMENT ? DEVELOPMENT_URL : PRODUCTION_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
    body: JSON.stringify(data),
  });
};

export const getData = async () => {
  let data;
  try {
    data = await fetch(DEVELOPMENT_URL, {
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
  let data;
  await getData().then((res) => {
    if (res === undefined) return;
    data = res;
    console.log(data);
    const index = data.findIndex((ls) => ls.id === listToShare.id);
    if (index !== -1) {
      data = data.toSpliced(index, 1, listToShare);
      console.log("la lista ya existe");
    } else {
      data = [...data, listToShare];
      console.log("la lista no existe");
    }
  });

  // subir nueva data
  const response = await setData(data);
  if (response.ok) {
    console.log("Ok");
    return true;
  } else {
    return;
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
