import genId from "../libs/random-generator";
import { getDatetime } from "../libs/datetime-parser";

class Jugada {
  id = "";
  type = "BOLA";
  numeros = [];
  jugador = "";
  dinero_fijo = 0.0;
  dinero_corrido = 0.0;
  dinero_parlcent = 0.0;
  premio = 0.0;
  creado = "";

  constructor(
    type,
    id = "",
    numeros = [],
    jugador = "",
    dinero_fijo = 0.0,
    dinero_corrido = 0.0,
    dinero_parlcent = 0.0,
    premio = 0.0,
    creado = "",
  ) {
    this.id = id !== "" ? id : genId();
    this.creado = creado !== "" ? creado : getDatetime();

    this.type = type;
    this.numeros = numeros;
    this.jugador = jugador;
    this.dinero_fijo = dinero_fijo;
    this.dinero_corrido = dinero_corrido;
    this.dinero_parlcent = dinero_parlcent;
    this.premio = premio;
  }
}

export default Jugada;
