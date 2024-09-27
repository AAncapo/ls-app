// DRAWS
// var is_day_draw_time = Global.get_time_hhmmss() in range(134500,140000)
// var is_night_draw_time = Global.get_time_hhmmss() in range(214500,230000)

//CREAR LISTAS
// if int(time) >= 800 and int(time) < 1320: return "d"
// elif int(time) >= 1430 and int(time) < 2130: return "n"

export const getDatetimeObject = () => {
  // const datetime = new Date().toJSON().split('T')
  const datetime = getDateWithTimezoneOffset().split(', ');
  const _date = datetime[0].split('/');
  const _time = datetime[1].split(':');
  return {
    day: _date[1],
    month: _date[0],
    year: _date[2],
    hours: _time[0],
    minutes: _time[1],
    seconds: _time[2],
    fullTime: _time.join(':'),
    fullDate: `${_date[2]}-${_date[0]}-${_date[1]}`,
  };
};

const getDrawIdFromDate = () => {
  // d/n-YYYYMMDD
  const _date = getDatetimeObject().fullDate.split('-').join('');
  const type = getDrawType();

  return `${type}-${_date}`;
};

export const getDrawType = () => {
  const _time = parseInt(getDatetimeObject().fullTime.split(':').join(''));

  const day = inRange(_time, 80000, 132000);
  const night = inRange(_time, 143000, 213000);
  let type = ''; // !!!! SOLO PARA DEBUGGING DRAWS -DEVOLVER A '' EN PRODUCCION !!!!
  if (day) {
    type = 'd';
  } else if (night) {
    type = 'n';
  }
  return type;
};

function inRange(x, min, max) {
  return x >= min && x <= max;
}

function getDateWithTimezoneOffset() {
  let date = new Date();
  let options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Cuba',
  };
  return date.toLocaleString('en-US', options);
}

export default getDrawIdFromDate;
