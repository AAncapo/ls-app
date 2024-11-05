/* eslint-disable react-hooks/exhaustive-deps */
import { getDatetime } from "../libs/datetime-parser";
import { ParseFloat } from "../libs/utils";
import Jugada from "../classes/Jugada";
import useDatabase from "./useDatabase";

export default function useList() {
  const { database, updateList } = useDatabase();

  const addJugada = (filter) => {
    const newJugada = new Jugada(filter);
    const lCopy = database.lista;
    lCopy.jugadas = [newJugada, ...lCopy.jugadas];
    updateList(lCopy);
  };

  const updateJugada = (jugada) => {
    const { lista } = database;
    const index = lista.jugadas.findIndex((item) => item.id === jugada.id);
    if (index !== -1) {
      const updatedJugadas = lista.jugadas.toSpliced(index, 1, jugada);

      let lCopy = lista;
      lCopy.jugadas = [...updatedJugadas];
      // Update saldo
      lCopy.saldo = { ...updateSaldo(lCopy) };
      lCopy.lastModified = getDatetime();
      // setList({ ...lCopy });
      updateList(lCopy);
    }
  };

  const deleteJugada = (jugadaId) => {
    const { lista } = database;
    const index = lista.jugadas.findIndex((item) => item.id === jugadaId);
    if (index !== -1) {
      const updatedJugadas = lista.jugadas.toSpliced(index, 1);
      const lCopy = lista;
      lCopy.jugadas = [...updatedJugadas];
      // Update saldo
      lCopy.saldo = { ...updateSaldo(lCopy) };

      lCopy.lastModified = getDatetime();
      // setList({ ...lCopy });
      updateList(lCopy);
    }
  };

  return {
    list: database.lista,
    addJugada,
    updateJugada,
    deleteJugada,
  };
}

const updateSaldo = (list) => {
  let fijoCorridoBruto = 0.0;
  let fijoCorridoLimpio = 0.0;
  let parlBruto = 0.0;
  let parlLimpio = 0.0;
  let centBruto = 0.0;
  let centLimpio = 0.0;
  let totalBruto = 0.0;
  let totalLimpio = 0.0;

  list.jugadas.forEach((jgd) => {
    const { dinero_fijo, dinero_corrido, dinero_parlcent } = jgd;

    if (jgd.type === "BOLA") {
      fijoCorridoBruto += dinero_fijo + dinero_corrido;
      fijoCorridoLimpio = fijoCorridoBruto * 0.8;
    }
    if (jgd.type === "PARLE") {
      parlBruto += dinero_parlcent;
      parlLimpio = parlBruto * 0.7;
    }
    if (jgd.type === "CENT") {
      centBruto += dinero_parlcent;
      centLimpio = centBruto * 0.7;
    }
  });

  totalBruto = fijoCorridoBruto + parlBruto + centBruto;
  totalLimpio = fijoCorridoLimpio + parlLimpio + centLimpio;

  return {
    FijosCorridos: {
      bruto: ParseFloat(fijoCorridoBruto),
      limpio: ParseFloat(fijoCorridoLimpio),
    },
    Parles: {
      bruto: ParseFloat(parlBruto),
      limpio: ParseFloat(parlLimpio),
    },
    Centenas: {
      bruto: ParseFloat(centBruto),
      limpio: ParseFloat(centLimpio),
    },
    Total: {
      bruto: ParseFloat(totalBruto),
      limpio: ParseFloat(totalLimpio),
    },
  };
};
