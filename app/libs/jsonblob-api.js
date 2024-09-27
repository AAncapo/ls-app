const url = 'https://jsonblob.com/api/jsonBlob/1285329984779313152';

const setData = async (data) => {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getData = async () => {
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        return response;
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const shareListado = async (listToShare) => {
  try {
    // Add list to the existent data
    let prevData = await getData();
    console.log('prev data: ', prevData);
    const index = prevData.findIndex((ls) => ls.id === listToShare.id);

    if (index !== -1) {
      prevData = prevData.toSpliced(index, 1, listToShare);
      console.log('la lista ya existe');
    } else {
      prevData = [...prevData, listToShare];
      console.log('la lista no existe');
    }
    console.log('nueva data en blob: ', prevData);

    // subir nueva data
    setData(prevData).then((res) => {
      console.log('lista compartida!');
    });
  } catch (error) {
    console.log('Error compartiendo lista: ', error);
  }
};
