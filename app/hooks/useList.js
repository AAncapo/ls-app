/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { getDatetime } from "../libs/datetime-parser";
import { ParseFloat } from "../libs/utils";
import Jugada from "../classes/Jugada";

export default function useList(ls) {
  const [list, setList] = useState(ls);
  const [saldo, setSaldo] = useState(ls.saldo);

  const addJugada = (filter) => {
    const newJugada = new Jugada(filter);
    const lCopy = list;
    lCopy.jugadas = [newJugada, ...lCopy.jugadas];
    setList({ ...lCopy });
  };

  const updateJugada = (jugada) => {
    const index = list.jugadas.findIndex((item) => item.id === jugada.id);
    if (index !== -1) {
      const updatedJugadas = list.jugadas.toSpliced(index, 1, jugada);

      let lCopy = list;
      lCopy.jugadas = [...updatedJugadas];
      // Update saldo
      lCopy.saldo = { ...updateSaldo(lCopy) };
      setSaldo({ ...lCopy.saldo });
      lCopy.lastModified = getDatetime();
      setList({ ...lCopy });
    }
  };

  const deleteJugada = (jugadaId) => {
    const index = list.jugadas.findIndex((item) => item.id === jugadaId);
    if (index !== -1) {
      const updatedJugadas = list.jugadas.toSpliced(index, 1);
      const lCopy = list;
      lCopy.jugadas = [...updatedJugadas];
      // Update saldo
      lCopy.saldo = { ...updateSaldo(lCopy) };
      setSaldo({ ...lCopy.saldo });

      lCopy.lastModified = getDatetime();
      setList({ ...lCopy });
    }
  };

  return {
    list,
    saldo,
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