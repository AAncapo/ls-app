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

  constructor(type) {
    this.id = genId();
    this.creado = getDatetime();
    this.type = type;
  }
}

export default Jugada;
