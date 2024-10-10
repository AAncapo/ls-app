import React, { useState } from "react";

import StyledButton from "./StyledButton";
import CustomModal from "./CustomModal";
import { shareListado } from "../libs/jsonblob-api";

const Share = (list) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const modalConfirm = () => {
    if (loadingShare) return;

    setLoadingShare(true);
    shareListado(list).then((res) => {
      if (res === undefined) {
        //Mostrar error
        // setShareError("No se pudo compartir la lista. Compruebe su conexion a internet.");
      }
      setLoadingShare(false);
    });
  };
  const modalClose = () => {
    setModalVisible(!modalVisible);
  };

  const handleSharePress = () => setModalVisible(true);

  return (
    <>
      <CustomModal
        title={"Compartir este listado?"}
        visible={modalVisible}
        confirm={modalConfirm}
        close={modalClose}
      />
      <StyledButton text={"ENVIAR LISTA"} handlePress={handleSharePress} />
    </>
  );
};

export default Share;
