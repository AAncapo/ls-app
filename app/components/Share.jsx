import React, { useContext, useState } from "react";

import StyledButton from "./StyledButton";
import CustomModal from "./CustomModal";
import { getUser, shareListado } from "../libs/jsonblob-api";
import { Alert, View } from "react-native";
import { DatabaseContext } from "../context/DatabaseContext";

const Share = ({ list, loading, setLoading }) => {
  const { database } = useContext(DatabaseContext);
  const [modalVisible, setModalVisible] = useState(false);
  // const [loadingShare, setLoadingShare] = useState(false);

  const modalConfirm = () => {
    if (loading) return;

    setLoading(true);
    // Comprueba primero si el usuario sigue existiendo en el SERVER xd & si el pin es valido
    getUser(database.user).then((res) => {
      // Enviar lista si existe user en server
      if (res === undefined) {
        setLoading(false);
        Alert.alert("El usuario no existe");
      } else {
        shareListado(list).then((res) => console.log(res));
        setLoading(false);
      }
    });
  };

  const modalClose = () => setModalVisible(false);

  const handleSharePress = () => setModalVisible(true);

  return (
    <View style={{ height: 100 }}>
      <CustomModal
        title={"Compartir este listado?"}
        visible={modalVisible}
        confirm={modalConfirm}
        close={modalClose}
      />
      <StyledButton text={"ENVIAR LISTA"} handlePress={handleSharePress} enabled={!loading} />
    </View>
  );
};

export default Share;