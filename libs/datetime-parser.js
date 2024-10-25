// Revisar draws de florida (d) 134500-140000  (n) 214500-230000

// Crear listas (d) 60000-132800 (n) 140000-213500
const DAYTIME_START = 60000;
const DAYTIME_END = 132800;
const NIGHT_START = 140000;
const NIGHT_END = 213500;

export const getDatetimeObject = () => {
  // const datetime = new Date().toJSON().split('T')
  const datetime = getDateWithTimezoneOffset().split(", ");
  const _date = datetime[0].split("/");
  const _time = datetime[1].split(":");
  return {
    day: _date[1],
    month: _date[0],
    year: _date[2],
    hours: _time[0],
    minutes: _time[1],
    seconds: _time[2],
    fullTime: _time.join(":"),
    fullDate: `${_date[2]}-${_date[0]}-${_date[1]}`,
    fullDatetime: `${_date[2]}-${_date[0]}-${_date[1]} ${_time.join(":")}`,
  };
};

// returns dd/mm/yyyy hh:mm:ss
export const getDatetime = () => {
  const datetime = getDateWithTimezoneOffset().split(", ");
  const date = datetime[0].split("/");
  const time = datetime[1];
  return `${date[1]}/${date[0]}/${date[2]} ${time}`;
};

const getDrawIdFromDate = () => {
  // d/n-YYYYMMDD
  const _date = getDatetimeObject().fullDate.split("-").join("");
  const type = getDrawType();
  return `${type}-${_date}`;
};

// Esto solo se usa por los listados - los draws reciben su drawId por su cuenta
const getDrawType = () => {
  const _time = parseInt(getDatetimeObject().fullTime.split(":").join(""));
  const day = inRange(_time, DAYTIME_START, DAYTIME_END);
  const night = inRange(_time, NIGHT_START, NIGHT_END);
  let type = "";
  if (day) type = "d";
  if (night) type = "n";
  return type;
};

function inRange(x, min, max) {
  return x >= min && x <= max;
}

function getDateWithTimezoneOffset() {
  let date = new Date();
  let options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Cuba",
  };
  return date.toLocaleString("en-US", options);
}

export default getDrawIdFromDate;
