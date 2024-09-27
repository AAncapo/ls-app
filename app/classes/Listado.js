import genId from '../libs/random-generator';
import getDrawIdFromDate, { getDatetimeObject } from '../libs/datetime-parser';
// import Jugada from "./Jugada"

class Listado {
  id = '';
  draw_id = '';
  autor = 'Sin autor';
  title = 'Sin titulo';
  creado = {};
  jugadas = [];
  resultados = [];

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

  constructor(autor = '', title = '', draw_id = '') {
    this.id = genId();
    this.draw_id = draw_id !== '' ? draw_id : getDrawIdFromDate();
    this.creado = getDatetimeObject();

    this.autor = autor;
    this.title = title !== '' ? title : `${this.autor}`;
  }
}

export default Listado;
