import genId from "../libs/random-generator";
import getDrawIdFromDate, { getDatetime } from "../libs/datetime-parser";

class Listado {
  id = "";
  drawId = "";
  autor = "Sin autor";
  title = "Sin titulo";
  creado = "";
  lastModified = "";
  jugadas = [];
  resultados = {};
  isReadonly = false;
  premioFijoCorrido = 0.0;
  premioParle = 0.0;
  premioCentena = 0.0;
  premioTotal = 0.0;
  saldo = {
    FijosCorridos: { bruto: 0.0, limpio: 0.0, premios: 0.0 },
    Parles: { bruto: 0.0, limpio: 0.0, premios: 0.0 },
    Centenas: { bruto: 0.0, limpio: 0.0, premios: 0.0 },
    Total: { bruto: 0.0, limpio: 0.0, premios: 0.0 },
  };

  constructor(autor = "", title = "", drawId = "") {
    this.id = genId();
    this.drawId = drawId !== "" ? drawId : getDrawIdFromDate();
    this.creado = getDatetime();
    this.lastModified = this.creado;

    this.autor = autor;
    this.title = title !== "" ? title : `${this.autor}`;
  }
}

export default Listado;
